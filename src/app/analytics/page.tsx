'use client';

import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  CheckSquare,
  Clock,
  Target,
  Calendar,
  Download
} from 'lucide-react';

export default function AnalyticsPage() {
  const metrics = [
    {
      title: 'Project Completion Rate',
      value: '94%',
      change: '+5%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Average Task Duration',
      value: '3.2 days',
      change: '-0.5 days',
      trend: 'up',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Team Productivity',
      value: '87%',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Active Projects',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: CheckSquare,
      color: 'text-orange-600'
    }
  ];

  const projectStats = [
    { name: 'Web App Redesign', progress: 85, status: 'On Track', team: 6, deadline: '2024-02-15' },
    { name: 'Mobile App', progress: 92, status: 'Ahead', team: 4, deadline: '2024-01-30' },
    { name: 'API Integration', progress: 67, status: 'At Risk', team: 3, deadline: '2024-02-01' },
    { name: 'Database Migration', progress: 45, status: 'Behind', team: 2, deadline: '2024-02-10' },
    { name: 'Security Audit', progress: 78, status: 'On Track', team: 5, deadline: '2024-02-20' }
  ];

  const teamPerformance = [
    { name: 'John Doe', tasksCompleted: 24, efficiency: 96, role: 'Frontend Dev' },
    { name: 'Jane Smith', tasksCompleted: 28, efficiency: 94, role: 'Backend Dev' },
    { name: 'Mike Johnson', tasksCompleted: 19, efficiency: 89, role: 'Designer' },
    { name: 'Sarah Wilson', tasksCompleted: 31, efficiency: 98, role: 'DevOps' },
    { name: 'Lisa Chen', tasksCompleted: 22, efficiency: 91, role: 'QA Engineer' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ahead': return 'bg-green-100 text-green-800';
      case 'on track': return 'bg-blue-100 text-blue-800';
      case 'at risk': return 'bg-yellow-100 text-yellow-800';
      case 'behind': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <DashboardLayout currentPage="analytics">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Track performance and insights across your projects</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="flex items-center text-xs mt-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {metric.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Project Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectStats.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="h-3 w-3" />
                          {project.team} members
                          <Calendar className="h-3 w-3 ml-2" />
                          {new Date(project.deadline).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{project.progress}%</div>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{member.tasksCompleted} tasks</div>
                      <div className="flex items-center gap-1 text-sm">
                        <div className={`h-2 w-2 rounded-full ${
                          member.efficiency >= 95 ? 'bg-green-500' :
                          member.efficiency >= 90 ? 'bg-blue-500' :
                          member.efficiency >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        {member.efficiency}% efficiency
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Task Completion Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization would go here</p>
                  <p className="text-sm text-gray-400">Integration with charting library needed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Resource utilization chart</p>
                  <p className="text-sm text-gray-400">Shows team capacity and workload</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
                <div className="text-sm text-gray-600">Total Tasks Completed</div>
                <div className="text-xs text-green-600 mt-1">+23% this month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">2.8</div>
                <div className="text-sm text-gray-600">Avg. Days per Task</div>
                <div className="text-xs text-green-600 mt-1">-0.4 days improved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
                <div className="text-xs text-green-600 mt-1">+2% this quarter</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}