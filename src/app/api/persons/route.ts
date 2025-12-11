import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all persons
export async function GET() {
  try {
    const persons = await prisma.person.findMany({
      include: {
        meals: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(persons);
  } catch (error) {
    console.error('Error fetching persons:', error);
    // Include error detail in response for local debugging
    return NextResponse.json(
      { error: 'Failed to fetch persons', detail: String(error) },
      { status: 500 }
    );
  }
}

// POST create new person
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, age, bio } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const person = await prisma.person.create({
      data: {
        name,
        email,
        age: age ? parseInt(age) : null,
        bio,
      },
    });

    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    console.error('Error creating person:', error);
    return NextResponse.json(
      { error: 'Failed to create person' },
      { status: 500 }
    );
  }
}
