-- Create connections table (Social Graph)
CREATE TABLE IF NOT EXISTS connections (
  follower_id TEXT NOT NULL,
  following_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (follower_id, following_id)
);

-- Enable RLS for connections
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own connections
CREATE POLICY "Users can view their own connections" ON connections
  FOR SELECT USING (auth.uid()::text = follower_id OR auth.uid()::text = following_id);

-- Allow users to follow/unfollow
CREATE POLICY "Users can follow/unfollow" ON connections
  FOR ALL USING (auth.uid()::text = follower_id);


-- Create messages table (Chat)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  receiver_id TEXT, -- Null for group chat/activity chat
  activity_id UUID, -- For activity-specific chat
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow users to read messages they are involved in (receiver or sender) OR if they are part of the activity
-- Note: 'is_participant' check would require a function, simplifying for now
CREATE POLICY "Users can read relevant messages" ON messages
  FOR SELECT USING (
    auth.uid()::text = sender_id 
    OR auth.uid()::text = receiver_id
    -- OR (activity_id IS NOT NULL AND EXISTS (SELECT 1 FROM participants WHERE activity_id = messages.activity_id AND user_id = auth.uid()::text))
  );

-- Allow users to send messages
CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid()::text = sender_id);
