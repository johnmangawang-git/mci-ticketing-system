import { NextRequest, NextResponse } from 'next/server';

// GET /api/tickets - Fetch all tickets
export async function GET() {
  try {
    // TODO: Replace with your actual database query
    // const tickets = await prisma.ticket.findMany();
    
    const mockTickets = [
      {
        id: '1',
        title: 'Sample Ticket',
        description: 'This is a sample ticket',
        status: 'open',
        priority: 'medium',
        createdAt: new Date().toISOString(),
      }
    ];

    return NextResponse.json({ tickets: mockTickets });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

// POST /api/tickets - Create new ticket
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, priority = 'medium' } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with your actual database insert
    // const ticket = await prisma.ticket.create({
    //   data: { title, description, priority, status: 'open' }
    // });

    const mockTicket = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ ticket: mockTicket }, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}