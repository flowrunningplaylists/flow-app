import 'dotenv/config'

export default {
  expo: {
    name: 'FlowApp',
    slug: 'flow-app',
    version: '1.0.0',
    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      BASE_URL: process.env.BASE_URL,
    },
  },
}
