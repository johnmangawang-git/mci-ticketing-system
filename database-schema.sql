-- Create tickets table (if not exists)
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'pending', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category TEXT DEFAULT 'general',
  assignee TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table (if not exists)
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'completed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assignee_name TEXT,
  assignee_initials TEXT,
  due_date DATE,
  project TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table (if not exists)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id TEXT NOT NULL,
  title TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  date DATE NOT NULL,
  organizer_name TEXT NOT NULL,
  organizer_initials TEXT NOT NULL,
  attendees INTEGER DEFAULT 1,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table (if not exists)
CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('room', 'equipment', 'person')),
  capacity INTEGER,
  location TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample resources (only if table is empty)
INSERT INTO resources (id, name, type, capacity, location, available) 
SELECT '1', 'Conference Room A', 'room', 12, 'Floor 2', true
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE id = '1');

INSERT INTO resources (id, name, type, capacity, location, available) 
SELECT '2', 'Meeting Room B', 'room', 6, 'Floor 1', false
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE id = '2');

INSERT INTO resources (id, name, type, capacity, location, available) 
SELECT '3', 'Video Equipment', 'equipment', null, 'Storage', true
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE id = '3');

INSERT INTO resources (id, name, type, capacity, location, available) 
SELECT '4', 'Projector #1', 'equipment', null, 'Floor 2', true
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE id = '4');

INSERT INTO resources (id, name, type, capacity, location, available) 
SELECT '5', 'Break Room', 'room', 8, 'Floor 1', true
WHERE NOT EXISTS (SELECT 1 FROM resources WHERE id = '5');

-- Insert sample tasks (only if table is empty)
INSERT INTO tasks (title, description, status, priority, assignee_name, assignee_initials, due_date, project, tags) 
SELECT 'Update user dashboard', 'Redesign the main dashboard with new metrics and improved layout', 'in_progress', 'high', 'John Doe', 'JD', '2024-01-15', 'Web App', ARRAY['frontend', 'ui/ux']
WHERE NOT EXISTS (SELECT 1 FROM tasks WHERE title = 'Update user dashboard');

INSERT INTO tasks (title, description, status, priority, assignee_name, assignee_initials, due_date, project, tags) 
SELECT 'Fix login authentication', 'Resolve the authentication issue preventing users from logging in', 'todo', 'urgent', 'Jane Smith', 'JS', '2024-01-12', 'Security', ARRAY['backend', 'security']
WHERE NOT EXISTS (SELECT 1 FROM tasks WHERE title = 'Fix login authentication');

INSERT INTO tasks (title, description, status, priority, assignee_name, assignee_initials, due_date, project, tags) 
SELECT 'Design new landing page', 'Create a modern, responsive landing page for the new product launch', 'review', 'medium', 'Mike Johnson', 'MJ', '2024-01-18', 'Marketing', ARRAY['design', 'frontend']
WHERE NOT EXISTS (SELECT 1 FROM tasks WHERE title = 'Design new landing page');

INSERT INTO tasks (title, description, status, priority, assignee_name, assignee_initials, due_date, project, tags) 
SELECT 'Database optimization', 'Optimize database queries for better performance', 'completed', 'low', 'Sarah Wilson', 'SW', '2024-01-10', 'Backend', ARRAY['database', 'performance']
WHERE NOT EXISTS (SELECT 1 FROM tasks WHERE title = 'Database optimization');

INSERT INTO tasks (title, description, status, priority, assignee_name, assignee_initials, due_date, project, tags) 
SELECT 'Mobile app testing', 'Conduct comprehensive testing on iOS and Android devices', 'in_progress', 'high', 'Lisa Chen', 'LC', '2024-01-14', 'Mobile', ARRAY['testing', 'mobile']
WHERE NOT EXISTS (SELECT 1 FROM tasks WHERE title = 'Mobile app testing');

INSERT INTO tasks (title, description, status, priority, assignee_name, assignee_initials, due_date, project, tags) 
SELECT 'API documentation', 'Write comprehensive API documentation for developers', 'todo', 'medium', 'Tom Brown', 'TB', '2024-01-20', 'Documentation', ARRAY['documentation', 'api']
WHERE NOT EXISTS (SELECT 1 FROM tasks WHERE title = 'API documentation');

-- Insert sample bookings (only if table is empty)
INSERT INTO bookings (resource_id, title, start_time, end_time, date, organizer_name, organizer_initials, attendees, status) 
SELECT '1', 'Team Standup', '09:00', '09:30', '2024-01-15', 'John Doe', 'JD', 8, 'confirmed'
WHERE NOT EXISTS (SELECT 1 FROM bookings WHERE title = 'Team Standup' AND date = '2024-01-15');

INSERT INTO bookings (resource_id, title, start_time, end_time, date, organizer_name, organizer_initials, attendees, status) 
SELECT '2', 'Client Meeting', '14:00', '15:30', '2024-01-15', 'Jane Smith', 'JS', 4, 'confirmed'
WHERE NOT EXISTS (SELECT 1 FROM bookings WHERE title = 'Client Meeting' AND date = '2024-01-15');

INSERT INTO bookings (resource_id, title, start_time, end_time, date, organizer_name, organizer_initials, attendees, status) 
SELECT '1', 'Sprint Planning', '10:00', '12:00', '2024-01-16', 'Mike Johnson', 'MJ', 10, 'pending'
WHERE NOT EXISTS (SELECT 1 FROM bookings WHERE title = 'Sprint Planning' AND date = '2024-01-16');

-- Create indexes for better performance (if not exists)
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee_name ON tasks(assignee_name);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_resource_id ON bookings(resource_id);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - customize based on your needs)
CREATE POLICY "Allow all operations on tickets" ON tickets FOR ALL USING (true);
CREATE POLICY "Allow all operations on tasks" ON tasks FOR ALL USING (true);
CREATE POLICY "Allow all operations on bookings" ON bookings FOR ALL USING (true);
CREATE POLICY "Allow all operations on resources" ON resources FOR ALL USING (true);