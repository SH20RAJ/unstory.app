-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'study', 'social', 'sports', 'event'
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  creator_id TEXT NOT NULL, -- Assuming Stack Auth user ID is text
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public activities are viewable by everyone" ON activities
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to create activities
CREATE POLICY "Authenticated users can create activities" ON activities
  FOR INSERT WITH CHECK (auth.uid() = creator_id::uuid); -- This might need adjustment based on auth integration

-- Create policy to allow creators to update their own activities
CREATE POLICY "Users can update their own activities" ON activities
  FOR UPDATE USING (auth.uid() = creator_id::uuid);
