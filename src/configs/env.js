import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const env = {
  PORT: process.env.SR_PORT || 8000,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_DB_URL: process.env.SUPABASE_DB_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};
