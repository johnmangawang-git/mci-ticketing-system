# Supabase Setup Instructions

## 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `mondo-cucina-pm-system`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
6. Click "Create new project"

## 2. Get Database URL
1. Go to Settings > Database
2. Copy the "Connection string" under "Connection parameters"
3. Replace `[YOUR-PASSWORD]` with your actual database password
4. The URL should look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

## 3. Update Environment Variables
Add to your production `.env`:
```
DATABASE_URL="your-supabase-connection-string"
```

## 4. Run Database Migration
After updating the DATABASE_URL:
```bash
npm run db:push
```

This will create your tables in Supabase PostgreSQL database.

## 5. Optional: Enable Row Level Security
In Supabase dashboard:
1. Go to Authentication > Settings
2. Enable Row Level Security for better security
3. Set up policies as needed for your app