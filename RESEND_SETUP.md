# Resend API Key Setup - How It Works

## Current Setup ✅

Your Resend API key is working in production because **Lovable's "Cloud" feature** automatically manages Supabase Edge Function secrets.

### How It Works:

1. **Lovable Cloud UI**: When you set `RESEND_API_KEY` in Lovable's Cloud settings, it automatically syncs the secret to your Supabase project.

2. **Supabase Storage**: The secret is stored securely in Supabase (not in your codebase), accessible to Edge Functions via:

   ```typescript
   Deno.env.get("RESEND_API_KEY");
   ```

3. **Production Deployment**: When Lovable deploys to Vercel:
   - Frontend → Deploys to Vercel
   - Edge Function → Already deployed to Supabase with secrets configured
   - Everything works! ✨

## Verify Your Setup

### Check Supabase Dashboard:

1. Go to: https://supabase.com/dashboard/project/hduvfglpguylcjvzhjmx
2. Navigate to: **Settings** → **Edge Functions** → **Secrets**
3. Look for: `RESEND_API_KEY` (should be listed there)

### Check Lovable Cloud:

1. Go to: https://lovable.dev/projects/92dc0c12-c831-4ed8-9ab7-0f875920f45d
2. Check your Cloud/Environment Variables settings
3. Verify `RESEND_API_KEY` is configured there

## Local Development

If you want to test the Edge Function locally, you have two options:

### Option 1: Use Supabase Dashboard (Recommended)

- The secrets are already set in Supabase
- Your local Edge Function will use the production secrets when invoked
- No additional setup needed

### Option 2: Set Up Local Supabase CLI

If you want to run Supabase locally with your own secrets:

1. Install Supabase CLI (see: https://supabase.com/docs/guides/cli)
2. Link to your project:
   ```bash
   supabase link --project-ref hduvfglpguylcjvzhjmx
   ```
3. Set local secret (for local development only):
   ```bash
   supabase secrets set RESEND_API_KEY=your_key_here
   ```

## Why It Works

- ✅ **Lovable manages secrets** automatically when you use their Cloud feature
- ✅ **Supabase stores secrets** securely in their cloud (not in git)
- ✅ **Production works** because secrets are already configured in Supabase
- ✅ **Local codebase doesn't need secrets** - they're managed by Supabase/Lovable

## Important Notes

- **Never commit API keys to git** - Lovable handles this for you
- **Secrets are environment-specific** - Production secrets stay in Supabase cloud
- **Edge Functions read secrets at runtime** - They're injected by Supabase when the function runs

## Current Email Configuration

Your Edge Function is configured to send emails to:

- **To**: `pratikckb@gmail.com`
- **From**: `onboarding@resend.dev` (Resend's default domain)

### To Use a Custom Domain:

1. Verify your domain in Resend dashboard
2. Update the `from` field in `supabase/functions/send-booking-email/index.ts`:
   ```typescript
   from: "Oil Change Bookings <noreply@yourdomain.com>",
   ```

## Troubleshooting

If emails stop working:

1. **Check Supabase Secrets**: Verify `RESEND_API_KEY` is still set in Supabase dashboard
2. **Check Lovable Cloud**: Verify the key is still configured in Lovable
3. **Check Resend Dashboard**: Verify your API key is still active
4. **Check Function Logs**: View logs in Supabase dashboard under Edge Functions → Logs

---

**Summary**: Your setup is correct! Lovable's Cloud feature automatically manages the Resend API key in Supabase, which is why everything works in production without you seeing it in your local codebase.
