-- Seed data for activities
INSERT INTO public.activities (title, type, date, time, location, description)
VALUES
  (
    'Midnight Coding Club',
    'Tech',
    CURRENT_DATE + INTERVAL '1 day',
    '11:00 PM',
    'Library Basement',
    'Join us for a late-night coding session. Pizza and caffeine provided! Bring your laptop and your bugs.'
  ),
  (
    'Weekend Hike: Bear Mountain',
    'Outdoors',
    CURRENT_DATE + INTERVAL '3 days',
    '08:00 AM',
    'Campus Main Gate',
    'A refreshing hike to Bear Mountain. Beginner friendly. Bring water and good shoes. Transportation arranged.'
  ),
  (
    'Jazz Night Jam Session',
    'Music',
    CURRENT_DATE + INTERVAL '2 days',
    '07:30 PM',
    'Student Center Lounge',
    'Open mic for jazz musicians and enthusiasts. Come play or just listen to some smooth tunes.'
  ),
  (
    'Intro to AI Workshop',
    'Education',
    CURRENT_DATE + INTERVAL '5 days',
    '04:00 PM',
    'Tech Hall, Room 304',
    'Learn the basics of Artificial Intelligence and Machine Learning. No prior experience required.'
  ),
  (
    'Campus Photography Walk',
    'Art',
    CURRENT_DATE + INTERVAL '4 days',
    '05:00 PM',
    'Fountain Square',
    'Capture the sunset on campus. All cameras welcome, including phones. Share tips and tricks.'
  ),
  (
    'Board Game Tournament',
    'Social',
    CURRENT_DATE + INTERVAL '1 day',
    '06:00 PM',
    'Dorm B Common Room',
    'Catan, Ticket to Ride, and more! Prizes for winners. Snacks included.'
  );
