import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for demo (use Redis or database in production)
let events: Array<{
  id: string;
  type: string;
  data: any;
  timestamp: number;
}> = [];

// GET /api/events - Server-Sent Events for real-time updates
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lastEventId = searchParams.get('lastEventId');
  
  // Filter events newer than lastEventId
  const since = lastEventId ? parseInt(lastEventId) : 0;
  const newEvents = events.filter(event => event.timestamp > since);

  return NextResponse.json({ 
    events: newEvents,
    lastEventId: events.length > 0 ? events[events.length - 1].timestamp.toString() : '0'
  });
}

// POST /api/events - Add new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    const event = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: Date.now(),
    };

    events.push(event);

    // Keep only last 100 events to prevent memory issues
    if (events.length > 100) {
      events = events.slice(-100);
    }

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}