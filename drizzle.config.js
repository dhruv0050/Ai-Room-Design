import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://ai-room-design_owner:npg_6PJfGdFVAy8O@ep-red-lab-a5mwoz9h-pooler.us-east-2.aws.neon.tech/ai-room-design?sslmode=require',
  },
});
