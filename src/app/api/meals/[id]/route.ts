import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single meal by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const meal = await prisma.meal.findUnique({
      where: { id: parseInt(id) },
      include: {
        person: true,
      },
    });

    if (!meal) {
      return NextResponse.json(
        { error: 'Meal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(meal);
  } catch (error) {
    console.error('Error fetching meal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meal' },
      { status: 500 }
    );
  }
}

// PUT update meal
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, calories, protein, fat, carbs, eatenAt, notes, personId } = body;

    const meal = await prisma.meal.update({
      where: { id: parseInt(id) },
      data: {
        title,
        calories: parseInt(calories) || 0,
        protein: parseFloat(protein) || 0,
        fat: parseFloat(fat) || 0,
        carbs: parseFloat(carbs) || 0,
        eatenAt: eatenAt ? new Date(eatenAt) : undefined,
        notes,
        personId: personId ? parseInt(personId) : undefined,
      },
      include: {
        person: true,
      },
    });

    return NextResponse.json(meal);
  } catch (error) {
    console.error('Error updating meal:', error);
    return NextResponse.json(
      { error: 'Failed to update meal' },
      { status: 500 }
    );
  }
}

// DELETE meal
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.meal.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    console.error('Error deleting meal:', error);
    return NextResponse.json(
      { error: 'Failed to delete meal' },
      { status: 500 }
    );
  }
}
