import { NextRequest, NextResponse } from 'next/server';

// GET /api/tickets/[id] - Fetch single ticket
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: Replace with your actual database query
    // const ticket = await prisma.ticket.findUnique({ where: { id } });

    const mockTicket = {
      id,
      title: `Ticket ${id}`,
      description: `Description for ticket ${id}`,
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ ticket: mockTicket });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ticket' },
      { status: 500 }
    );
  }
}

// PUT /api/tickets/[id] - Update ticket
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // TODO: Replace with your actual database update
    // const ticket = await prisma.ticket.update({
    //   where: { id },
    //   data: body
    // });

    const updatedTicket = {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ ticket: updatedTicket });
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to update ticket' },
      { status: 500 }
    );
  }
}

// DELETE /api/tickets/[id] - Delete ticket
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: Replace with your actual database delete
    // await prisma.ticket.delete({ where: { id } });

    return NextResponse.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json(
      { error: 'Failed to delete ticket' },
      { status: 500 }
    );
  }
}