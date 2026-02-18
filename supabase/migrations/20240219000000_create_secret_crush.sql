-- Create secret_crushes table
CREATE TABLE IF NOT EXISTS secret_crushes (
  user_id TEXT NOT NULL,
  crush_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (user_id, crush_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL, -- 'match', 'activity_invite', etc.
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE secret_crushes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies for secret_crushes
-- user can see who they crushed on
CREATE POLICY "Users can view their own crushes" ON secret_crushes
  FOR SELECT USING (auth.uid()::text = user_id);

-- user can add a crush
CREATE POLICY "Users can add a crush" ON secret_crushes
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- user can remove a crush
CREATE POLICY "Users can remove their own crush" ON secret_crushes
  FOR DELETE USING (auth.uid()::text = user_id);

-- Policies for notifications
-- user can view their own notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid()::text = user_id);

-- System (or other users via server actions/triggers) can insert notifications
-- For now, allow authenticated users to insert notifications if they are 'sender' effectively, 
-- but in this app architecture, it seems we might handle notification creation via protected server action with service role or just let users insert for now carefully.
-- Better to allow inserts for now to enable the "match" logic if run as user, OR relies on Service Role which bypasses RLS.
-- Let's allow insert for authenticated users for now for simplicity in MVP, or rely on Service Role in actions.
-- Since we are using `supabase-js` in nextjs actions, we likely use the authenticated client.
CREATE POLICY "Users can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true); 

-- user can update (mark as read)
CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid()::text = user_id);
