import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Order } from '@/lib/models/Order';

// Get orders for a specific user
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('Fetch user orders error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// Create an order
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { userId, customer, device, amount, status, date, type } = await request.json();

    if (!userId || !customer || !device || !amount || !status || !date || !type) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newOrder = await Order.create({
      userId,
      customer,
      device,
      amount,
      status,
      date,
      type,
    });

    return NextResponse.json({ message: 'Order created successfully', order: newOrder });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
