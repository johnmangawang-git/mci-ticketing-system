'use client';

import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  CheckSquare, 
  Clock, 
  TrendingUp,
  Calendar,
  Ticket,
  AlertCircle,
  Plus
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Active Projects',
      value: '12',
      change: '+2 from last month',
      icon: CheckSquare,
      color: 'text-blue-600'
    },
    {
      title: 'Team Members',
      value: '24',
      change: '+3 new this week',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Open Tickets',
      value: '8',
      change: '-4 from yesterday',
      icon: Ticket,
      color: 'text-orange-600'
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+5% this month',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const recentTasks = [
    { id: 1, title: 'Update user dashboard', status: 'In Progress', priority: 'High', assignee: 'John Doe' },
    { id: 2, title: 'Fix login authentication', status: 'Review', priority: 'Urgent', assignee: 'Jane Smith' },
    { id: 3, title: 'Design new landing page', status: 'To Do', priority: 'Medium', assignee: 'Mike Johnson' },
    { id: 4, title: 'Database optimization', status: 'Completed', priority: 'Low', assignee: 'Sarah Wilson' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Team Standup', time: '9:00 AM', date: 'Today' },
    { id: 2, title: 'Client Meeting', time: '2:00 PM', date: 'Today' },
    { id: 3, title: 'Sprint Planning', time: '10:00 AM', date: 'Tomorrow' },
    { id: 4, title: 'Code Review', time: '3:00 PM', date: 'Tomorrow' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'to do': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout currentPage="dashboard">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your projects.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Tasks</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-500">Assigned to {task.assignee}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Tasks
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Events
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col gap-2" variant="outline">
                <CheckSquare className="h-6 w-6" />
                <span className="text-sm">New Task</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Users className="h-6 w-6" />
                <span className="text-sm">Add Member</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Schedule Meeting</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Ticket className="h-6 w-6" />
                <span className="text-sm">Create Ticket</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}