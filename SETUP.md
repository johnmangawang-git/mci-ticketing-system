# 🚀 Project Management & Ticketing System - Setup Guide

This is a complete Project Management & Internal Ticketing Application built with Next.js 15, TypeScript, and modern web technologies.

## ✨ Features Included

- 📊 **Dashboard** - Overview with stats and recent items
- 🎯 **Kanban Board** - Visual task management with drag-and-drop
- 📋 **Task Management** - Comprehensive CRUD operations with filtering
- 🏢 **Resource Booking** - Meeting rooms, equipment, vehicles management
- 🎫 **Ticket System** - Internal support with lifecycle management
- 📈 **Analytics** - Performance metrics and reporting
- ⚙️ **Settings** - System configuration and team management

## 🛠️ Prerequisites

- Node.js 18+ 
- npm or yarn
- Git (optional)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database
```bash
# Push the schema to database
npm run db:push

# Generate Prisma client
npm run db:generate
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Main application with routing
│   │   ├── layout.tsx         # Root layout
│   │   └── api/               # API routes
│   ├── components/             # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── kanban-board.tsx   # Kanban board component
│   │   ├── task-management.tsx # Task management system
│   │   ├── resource-booking.tsx # Resource booking system
│   │   ├── ticket-system.tsx  # Ticket system
│   │   └── task-form.tsx      # Task creation form
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utilities and configurations
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                    # Static assets
└── package.json              # Dependencies and scripts
```

## 🗄️ Database Schema

The application includes a comprehensive Prisma schema with:

- **Users** - Team members with roles and departments
- **Projects** - Project management with team members
- **Tasks** - Task management with assignments and priorities
- **Tickets** - Support ticket system with lifecycle management
- **Resources** - Bookable resources (rooms, equipment, vehicles)
- **Bookings** - Resource reservation system
- **Comments** - Discussion system for tasks and tickets
- **Notifications** - User notification system

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:reset     # Reset database

# Code Quality
npm run lint         # Run ESLint
```

## 🧩 Navigation

All navigation items are fully functional:

- **Dashboard** - Home screen with overview and statistics
- **Kanban Board** - Drag-and-drop task management
- **Tasks** - Complete task management with filtering
- **Resource Booking** - Book meeting rooms, equipment, vehicles
- **Tickets** - Internal support ticket system
- **Analytics** - Performance metrics and charts
- **Settings** - System configuration

## 🎨 UI Components

Built with modern UI components:

- **shadcn/ui** - High-quality, accessible components
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations
- **DND Kit** - Drag-and-drop functionality

## 🔧 Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Database**: Prisma ORM, SQLite
- **State Management**: React Hooks, Zustand
- **Forms**: React Hook Form, Zod validation
- **Icons**: Lucide React
- **Real-time**: Socket.IO (integrated and ready)

## 🚀 Production Deployment

### Build the Application
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is occupied, you can:
- Kill the process using port 3000
- Or set a different port in your environment variables

### Database Issues
```bash
# Reset database
npm run db:reset

# Regenerate Prisma client
npm run db:generate
```

### Missing Dependencies
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 🌟 Key Features Demonstrated

### 1. **Kanban Board**
- Drag-and-drop between status columns
- Task cards with priorities and assignees
- Visual indicators for comments and attachments

### 2. **Task Management**
- Full CRUD operations
- Advanced filtering (search, status, priority)
- Task creation with project assignment
- Statistics and overdue tracking

### 3. **Resource Booking**
- Visual resource availability
- Different resource types
- Booking form with datetime selection
- Utilization statistics

### 4. **Ticket System**
- Complete ticket lifecycle
- Department-based routing
- Comment system for communication
- Priority and status management

### 5. **Analytics Dashboard**
- Performance metrics
- Chart placeholders for visualization
- Team productivity tracking

## 🎯 Next Steps

The application is ready for:

1. **Backend Integration** - Connect to real database APIs
2. **Authentication** - Add user login and role-based access
3. **Real-time Updates** - Implement WebSocket functionality
4. **File Uploads** - Add attachment support
5. **Email Notifications** - Implement notification system
6. **Calendar Integration** - Connect with Google Calendar/Outlook

---

**Built with ❤️ using modern web technologies and AI-powered development.**