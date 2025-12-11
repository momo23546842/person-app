import 'dotenv/config';


// Reuse the app's Prisma client (configured with the Neon adapter)
import prisma from '../src/lib/prisma';


// Sample person data
const personsData = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    age: 32,
    bio: 'Fitness enthusiast focused on a high-protein diet for muscle building.',
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    age: 28,
    bio: 'Nutritionist who believes in balanced meals and mindful eating.',
  },
  {
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    age: 45,
    bio: 'Working professional managing weight through calorie tracking.',
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    age: 35,
    bio: 'Yoga instructor passionate about plant-based nutrition and wellness.',
  },
  {
    name: 'David Kim',
    email: 'david.kim@example.com',
    age: 29,
    bio: 'Marathon runner who tracks macros to optimize endurance performance.',
  },
  {
    name: 'Lisa Thompson',
    email: 'lisa.thompson@example.com',
    age: 42,
    bio: 'Busy mom of three, focused on quick and healthy family meals.',
  },
  {
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    age: 55,
    bio: 'Retired teacher managing diabetes through careful diet monitoring.',
  },
  {
    name: 'Aisha Patel',
    email: 'aisha.patel@example.com',
    age: 24,
    bio: 'Graduate student exploring vegetarian cuisine and nutrition science.',
  },
  {
    name: 'Carlos Martinez',
    email: 'carlos.martinez@example.com',
    age: 38,
    bio: 'Chef and food blogger experimenting with Mediterranean diet principles.',
  },
  {
    name: 'Hannah Lee',
    email: 'hannah.lee@example.com',
    age: 31,
    bio: 'Personal trainer helping clients achieve their fitness goals through nutrition.',
  },
];

// Sample meals data per person (indexed by person order)
const mealsData: Array<Array<{
  title: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  eatenAt: Date;
  notes: string;
}>> = [
  // Person 1: John Smith (muscle building - high protein)
  [
    { title: 'breakfast', calories: 450, protein: 35, fat: 15, carbs: 45, eatenAt: new Date('2024-12-08T07:30:00'), notes: 'Eggs, whole wheat toast, and avocado' },
    { title: 'lunch', calories: 650, protein: 45, fat: 20, carbs: 55, eatenAt: new Date('2024-12-08T12:30:00'), notes: 'Grilled chicken breast with quinoa and vegetables' },
    { title: 'dinner', calories: 700, protein: 50, fat: 25, carbs: 45, eatenAt: new Date('2024-12-08T19:00:00'), notes: 'Salmon with sweet potato and broccoli' },
  ],
  // Person 2: Sarah Johnson (balanced nutrition)
  [
    { title: 'breakfast', calories: 380, protein: 12, fat: 14, carbs: 52, eatenAt: new Date('2024-12-08T08:00:00'), notes: 'Overnight oats with berries and chia seeds' },
    { title: 'lunch', calories: 520, protein: 28, fat: 18, carbs: 48, eatenAt: new Date('2024-12-08T12:00:00'), notes: 'Quinoa bowl with roasted vegetables and tahini' },
    { title: 'dinner', calories: 550, protein: 28, fat: 18, carbs: 60, eatenAt: new Date('2024-12-08T18:30:00'), notes: 'Mediterranean salad with grilled halloumi' },
  ],
  // Person 3: Mike Chen (calorie tracking, moderate portions)
  [
    { title: 'breakfast', calories: 300, protein: 15, fat: 10, carbs: 35, eatenAt: new Date('2024-12-08T07:00:00'), notes: 'Protein smoothie with banana' },
    { title: 'lunch', calories: 480, protein: 32, fat: 15, carbs: 50, eatenAt: new Date('2024-12-08T12:00:00'), notes: 'Turkey sandwich on whole grain bread' },
  ],
  // Person 4: Emily Rodriguez (plant-based)
  [
    { title: 'breakfast', calories: 320, protein: 10, fat: 12, carbs: 45, eatenAt: new Date('2024-12-09T07:00:00'), notes: 'Smoothie bowl with granola and fresh fruit' },
    { title: 'lunch', calories: 450, protein: 18, fat: 20, carbs: 52, eatenAt: new Date('2024-12-09T12:30:00'), notes: 'Buddha bowl with chickpeas and avocado' },
    { title: 'dinner', calories: 520, protein: 22, fat: 18, carbs: 65, eatenAt: new Date('2024-12-09T19:00:00'), notes: 'Lentil curry with brown rice and naan' },
  ],
  // Person 5: David Kim (marathon runner - high carb)
  [
    { title: 'breakfast', calories: 550, protein: 20, fat: 12, carbs: 85, eatenAt: new Date('2024-12-09T06:00:00'), notes: 'Oatmeal with banana, honey, and peanut butter' },
    { title: 'lunch', calories: 720, protein: 35, fat: 18, carbs: 95, eatenAt: new Date('2024-12-09T12:00:00'), notes: 'Pasta with grilled chicken and vegetables' },
    { title: 'snack', calories: 280, protein: 8, fat: 6, carbs: 48, eatenAt: new Date('2024-12-09T16:00:00'), notes: 'Energy bars and fruit' },
  ],
  // Person 6: Lisa Thompson (family meals)
  [
    { title: 'breakfast', calories: 350, protein: 15, fat: 12, carbs: 42, eatenAt: new Date('2024-12-09T07:30:00'), notes: 'Scrambled eggs with whole wheat toast and orange juice' },
    { title: 'dinner', calories: 580, protein: 32, fat: 22, carbs: 55, eatenAt: new Date('2024-12-09T18:00:00'), notes: 'Baked chicken with roasted potatoes and green beans' },
  ],
  // Person 7: James Wilson (diabetic-friendly, low carb)
  [
    { title: 'breakfast', calories: 280, protein: 18, fat: 16, carbs: 18, eatenAt: new Date('2024-12-09T08:00:00'), notes: 'Greek yogurt with walnuts and blueberries' },
    { title: 'lunch', calories: 420, protein: 35, fat: 22, carbs: 20, eatenAt: new Date('2024-12-09T12:30:00'), notes: 'Grilled fish with cauliflower rice and asparagus' },
    { title: 'dinner', calories: 480, protein: 38, fat: 28, carbs: 22, eatenAt: new Date('2024-12-09T18:00:00'), notes: 'Beef steak with salad and olive oil dressing' },
  ],
  // Person 8: Aisha Patel (vegetarian student)
  [
    { title: 'breakfast', calories: 290, protein: 12, fat: 8, carbs: 45, eatenAt: new Date('2024-12-10T09:00:00'), notes: 'Masala dosa with coconut chutney' },
    { title: 'lunch', calories: 480, protein: 16, fat: 14, carbs: 68, eatenAt: new Date('2024-12-10T13:00:00'), notes: 'Vegetable biryani with raita' },
  ],
  // Person 9: Carlos Martinez (Mediterranean diet)
  [
    { title: 'breakfast', calories: 340, protein: 10, fat: 18, carbs: 35, eatenAt: new Date('2024-12-10T08:00:00'), notes: 'Spanish tortilla with tomato bread' },
    { title: 'lunch', calories: 580, protein: 28, fat: 32, carbs: 42, eatenAt: new Date('2024-12-10T14:00:00'), notes: 'Grilled sea bass with olive oil roasted vegetables' },
    { title: 'dinner', calories: 620, protein: 25, fat: 35, carbs: 50, eatenAt: new Date('2024-12-10T20:00:00'), notes: 'Paella with seafood and saffron rice' },
  ],
  // Person 10: Hannah Lee (personal trainer - balanced macros)
  [
    { title: 'breakfast', calories: 420, protein: 30, fat: 14, carbs: 42, eatenAt: new Date('2024-12-10T06:30:00'), notes: 'Egg white omelet with spinach and whole grain toast' },
    { title: 'lunch', calories: 550, protein: 40, fat: 18, carbs: 48, eatenAt: new Date('2024-12-10T12:00:00'), notes: 'Grilled turkey with sweet potato and steamed broccoli' },
    { title: 'snack', calories: 180, protein: 15, fat: 8, carbs: 12, eatenAt: new Date('2024-12-10T15:30:00'), notes: 'Cottage cheese with almonds' },
  ],
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.meal.deleteMany();
  await prisma.person.deleteMany();

  console.log('📝 Creating 10 sample persons with meals...');

  let totalMeals = 0;

  // Create each person and their meals
  for (let i = 0; i < personsData.length; i++) {
    const personData = personsData[i];
    const personMeals = mealsData[i];

    // Create person
    const person = await prisma.person.create({
      data: personData,
    });

    console.log(`   ✓ Created ${person.name}`);

    // Create meals for this person
    for (const mealData of personMeals) {
      await prisma.meal.create({
        data: {
          ...mealData,
          personId: person.id,
        },
      });
      totalMeals++;
    }
  }

  console.log('');
  console.log('✅ Database seeded successfully!');
  console.log(`   - Created ${personsData.length} persons`);
  console.log(`   - Created ${totalMeals} meals`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
