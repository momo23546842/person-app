import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all meals (optionally filtered by personId)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const personId = searchParams.get('personId');

    const meals = await prisma.meal.findMany({
      where: personId ? { personId: parseInt(personId) } : undefined,
      include: {
        person: true,
      },
      orderBy: {
        eatenAt: 'desc',
      },
    });

    return NextResponse.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meals' },
      { status: 500 }
    );
  }
}

// POST create new meal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, calories, protein, fat, carbs, eatenAt, notes, personId } = body;

    if (!title || !personId) {
      return NextResponse.json(
        { error: 'Title and personId are required' },
        { status: 400 }
      );
    }

    const meal = await prisma.meal.create({
      data: {
        title,
        calories: parseInt(calories) || 0,
        protein: parseFloat(protein) || 0,
        fat: parseFloat(fat) || 0,
        carbs: parseFloat(carbs) || 0,
        eatenAt: eatenAt ? new Date(eatenAt) : new Date(),
        notes,
        personId: parseInt(personId),
      },
      include: {
        person: true,
      },
    });

    return NextResponse.json(meal, { status: 201 });
  } catch (error) {
    console.error('Error creating meal:', error);
    return NextResponse.json(
      { error: 'Failed to create meal' },
      { status: 500 }
    );
  }
}
