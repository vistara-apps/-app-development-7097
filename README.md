# Contact Sync Pro

A comprehensive customer data management platform for early-stage founders to aggregate, enrich, and automate outreach for their customer data.

## Features

- **Data Aggregation Hub**: Connect various data sources and create a unified customer database
- **Automated Contact Enrichment**: Automatically find and add missing contact details
- **Targeted Outreach Sequences**: Create and automate multi-step email campaigns
- **Smart Contact Segmentation**: Automatically group contacts based on criteria

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Supabase (Auth + Database)
- **AI**: OpenAI for content generation and enrichment
- **Payments**: Stripe (configured for future implementation)

## Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd contact-sync-pro
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables
```bash
cp .env.example .env
```

Fill in your API keys:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_OPENAI_API_KEY`: Your OpenAI API key

4. Set up Supabase database

Create the following tables in your Supabase project:

```sql
-- Users table (handled by Supabase Auth)

-- Contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  linkedin_profile TEXT,
  source TEXT,
  enriched BOOLEAN DEFAULT FALSE,
  custom_fields JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sequences table
CREATE TABLE sequences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  steps JSONB NOT NULL,
  trigger TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own contacts" ON contacts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own contacts" ON contacts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own contacts" ON contacts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own contacts" ON contacts FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own sequences" ON sequences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sequences" ON sequences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sequences" ON sequences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sequences" ON sequences FOR DELETE USING (auth.uid() = user_id);
```

5. Start the development server
```bash
npm run dev
```

## Usage

1. **Sign up/Sign in**: Create an account or sign in to get started
2. **Import Contacts**: Upload a CSV file or manually add contacts
3. **Enrich Data**: Use the enrichment feature to automatically fill missing contact information
4. **Create Sequences**: Set up automated email sequences for different triggers
5. **Monitor Performance**: Track open rates, response rates, and engagement

## CSV Import Format

Your CSV should include these columns:
- `firstName` or `first_name`
- `lastName` or `last_name` 
- `email`
- `phone` (optional)
- `company` (optional)
- `linkedin` or `linkedinProfile` (optional)

## Development

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Business Model

- **Core Plan**: $29/month - Basic features for small teams
- **Pro Plan**: $59/month - Advanced automation and unlimited contacts
- **Enterprise**: Custom pricing for larger organizations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software. All rights reserved.