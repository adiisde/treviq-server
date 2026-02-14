import express from "express";
import cors from "cors";
import os from "os";
import process from "process";
import { supabaseAdmin } from "./configs/supabase.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health

app.get("/", async (req, res) => {
  const start = Date.now();

  // Database test
  let dbStatus = "unknown";

  try {
    const { error } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1 });

    dbStatus = error ? "down" : "up";
  } catch {
    dbStatus = "down";
  }

  const resTime = Date.now() - start;

  // Return JSON

  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",

    // Server

    server: {
      uptime_seconds: Math.floor(process.uptime()),
      response_time_ms: resTime,
      node_version: process.version,
      platform: process.platform,
    },

    // System information

    system: {
      cpu_cores: os.cpus().length,
      load_average: os.loadavg(),
      memory: {
        total_mb: Math.round(os.totalmem() / 1024 / 1024),
        free_mb: Math.round(os.freemem() / 1024 / 1024),
        used_mb: Math.round((os.totalmem() - os.freemem()) / 1024 / 1024),
      },
    },

    // Database status

    database: {
      supabase: dbStatus,
    },
  });
});

export default app;
