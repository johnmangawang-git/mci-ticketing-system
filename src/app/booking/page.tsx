'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
  Video,
  Coffee,
  Monitor
} from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  type: 'room' | 'equipment' | 'person';
  capacity?: number;
  location?: string;
  available: boolean;
  icon: React.ReactNode;
}

interface Booking {
  id: string;
  resourceId: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  organizer: {
    name: string;
    initials: string;
  };
  attendees: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const resources: Resource[] = [
  {
    id: '1',
    name: 'Conference Room A',
    type: 'room',
    capacity: 12,
    location: 'Floor 2',
    available: true,
    icon: <Users className="h-4 w-4" />
  },
  {
    id: '2',
    name: 'Meeting Room B',
    type: 'room',
    capacity: 6,
    location: 'Floor 1',
    available: false,
    icon: <Users className="h-4 w-4" />
  },
  {
    id: '3',
    name: 'Video Equipment',
    type: 'equipment',
    location: 'Storage',
    available: true,
    icon: <Video className="h-4 w-4" />
  },
  {
    id: '4',
    name: 'Projector #1',
    type: 'equipment',
    location: 'Floor 2',
    available: true,
    icon: <Monitor className="h-4 w-4" />
  },
  {
    id: '5',
    name: 'Break Room',
    type: 'room',
    capacity: 8,
    location: 'Floor 1',
    available: true,
    icon: <Coffee className="h-4 w-4" />
  }
];

const mockBookings: Booking[] = [
  {
    id: '1',
    resourceId: '1',
    title: 'Team Standup',
    startTime: '09:00',
    endTime: '09:30',
    date: '2024-01-15',
    organizer: { name: 'John Doe', initials: 'JD' },
    attendees: 8,
    status: 'confirmed'
  },
  {
    id: '2',
    resourceId: '2',
    title: 'Client Meeting',
    startTime: '14:00',
    endTime: '15:30',
    date: '2024-01-15',
    organizer: { name: 'Jane Smith', initials: 'JS' },
    attendees: 4,
    status: 'confirmed'
  },
  {
    id: '3',
    resourceId: '1',
    title: 'Sprint Planning',
    startTime: '10:00',
    endTime: '12:00',
    date: '2024-01-16',
    organizer: { name: 'Mike Johnson', initials: 'MJ' },
    attendees: 10,
    status: 'pending'
  }
];

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceTypeColor = (type: string) => {
    switch (type) {
      case 'room': return 'bg-blue-100 text-blue-800';
      case 'equipment': return 'bg-purple-100 text-purple-800';
      case 'person': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todaysBookings = bookings.filter(booking => 
    booking.date === selectedDate.toISOString().split('T')[0]
  );

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  return (
    <DashboardLayout currentPage="booking">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resource Booking</h1>
            <p className="text-gray-600 mt-1">Manage meeting rooms and equipment reservations</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Booking
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resources List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Available Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedResource === resource.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedResource(resource.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {resource.icon}
                          <span className="font-medium text-gray-900">{resource.name}</span>
                        </div>
                        <div className={`h-2 w-2 rounded-full ${
                          resource.available ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge className={getResourceTypeColor(resource.type)}>
                          {resource.type}
                        </Badge>
                        {resource.capacity && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {resource.capacity}
                          </span>
                        )}
                        {resource.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {resource.location}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar and Bookings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Navigation */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {formatDate(selectedDate)}
                    </h2>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Today's Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Bookings for {selectedDate.toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todaysBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings today</h3>
                    <p className="text-gray-600 mb-4">This day is completely free for new bookings.</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Booking
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todaysBookings.map((booking) => {
                      const resource = resources.find(r => r.id === booking.resourceId);
                      return (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-gray-900">{booking.title}</h4>
                              <p className="text-sm text-gray-600">
                                {resource?.name} • {resource?.location}
                              </p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {booking.startTime} - {booking.endTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {booking.attendees} attendees
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {booking.organizer.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span>{booking.organizer.name}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {resources.filter(r => r.available).length}
                  </div>
                  <div className="text-sm text-gray-600">Available Now</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {todaysBookings.filter(b => b.status === 'confirmed').length}
                  </div>
                  <div className="text-sm text-gray-600">Confirmed Today</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {todaysBookings.filter(b => b.status === 'pending').length}
                  </div>
                  <div className="text-sm text-gray-600">Pending Approval</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}