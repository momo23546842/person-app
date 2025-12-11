// app/database/page.tsx

export default function DatabasePage() {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-12 text-gray-800">
      
      {/* 1. Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          🗄️ Database Structure
        </h1>
        <p className="text-xl text-gray-600">
          Documentation of the Prisma schema and database design
        </p>
      </section>

      <hr className="border-gray-200" />

      {/* 2. Overview & Relationships (図の代わりに文章で説明) */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
          <span className="mr-2">📊</span> Database Overview
        </h2>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
          <p className="mb-4 text-blue-900 leading-relaxed">
            This application uses <strong>PostgreSQL</strong> managed through <strong>Prisma ORM</strong>. 
            The system is built around two core entities:
          </p>
          <ul className="list-disc list-inside space-y-2 text-blue-900 mb-4 ml-2">
            <li><strong>Person Table:</strong> Stores individual user profiles.</li>
            <li><strong>Meal Table:</strong> Stores food and nutritional records.</li>
          </ul>
          <div className="p-4 bg-white rounded border border-blue-200 text-sm">
            <strong className="block text-blue-800 mb-1">🔗 Relationship Structure:</strong>
            The database implements a <strong>One-to-Many (1:N)</strong> relationship. One <code>Person</code> can be associated with multiple <code>Meal</code> records. If a person is deleted, all their meal records are automatically removed (Cascade Delete).
          </div>
        </div>
      </section>

      {/* 3. Prisma Schema Code */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
          <span className="mr-2">📝</span> Prisma Schema
        </h2>
        <div className="bg-gray-800 text-green-400 p-6 rounded-lg overflow-x-auto font-mono text-sm shadow-lg">
          <pre>{`// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Person Model
model Person {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  age       Int?
  bio       String?
  meals     Meal[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Meal Model
model Meal {
  id        Int      @id @default(autoincrement())
  title     String
  calories  Int
  protein   Float
  fat       Float
  carbs     Float
  eatenAt   DateTime @default(now())
  notes     String?
  personId  Int
  person    Person   @relation(fields: [personId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([personId])
}`}</pre>
        </div>
      </section>

      {/* 4. Table Details */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Person Table */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
            <span className="mr-2">👤</span> Person Table
          </h3>
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-2">Field</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-2 font-mono text-blue-600">id</td><td className="px-4 py-2">Int</td><td className="px-4 py-2 text-gray-500">PK</td></tr>
                <tr><td className="px-4 py-2 font-mono text-blue-600">name</td><td className="px-4 py-2">String</td><td className="px-4 py-2 text-gray-500">required</td></tr>
                <tr><td className="px-4 py-2 font-mono text-blue-600">email</td><td className="px-4 py-2">String</td><td className="px-4 py-2 text-gray-500">unique</td></tr>
                <tr><td className="px-4 py-2 font-mono text-blue-600">age</td><td className="px-4 py-2">Int?</td><td className="px-4 py-2 text-gray-500">optional</td></tr>
                <tr><td className="px-4 py-2 font-mono text-blue-600">createdAt</td><td className="px-4 py-2">DateTime</td><td className="px-4 py-2 text-gray-500">auto</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Meal Table */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800">
            <span className="mr-2">🍽️</span> Meal Table
          </h3>
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-2">Field</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr><td className="px-4 py-2 font-mono text-blue-600">id</td><td className="px-4 py-2">Int</td><td className="px-4 py-2 text-gray-500">PK</td></tr>
                <tr><td className="px-4 py-2 font-mono text-blue-600">title</td><td className="px-4 py-2">String</td><td className="px-4 py-2 text-gray-500">required</td></tr>
                <tr><td className="px-4 py-2 font-mono text-blue-600">personId</td><td className="px-4 py-2">Int</td><td className="px-4 py-2 text-gray-500">FK</td></tr>
                <tr><td className="px-4 py-2 font-mono text-blue-600">calories</td><td className="px-4 py-2">Int</td><td className="px-4 py-2 text-gray-500">kcal</td></tr>
                <tr><td className="px-4 py-2 font-mono text-blue-600">eatenAt</td><td className="px-4 py-2">DateTime</td><td className="px-4 py-2 text-gray-500">date</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Common Prisma Commands */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
          <span className="mr-2">⚙️</span> Common Prisma Commands
        </h2>
        <div className="bg-gray-800 text-gray-300 p-6 rounded-lg font-mono text-sm shadow-lg">
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 mb-1"># Generate Prisma client</p>
              <p className="text-white">$ npx prisma generate</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1"># Push schema changes to database</p>
              <p className="text-white">$ npx prisma db push</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1"># Open Prisma Studio</p>
              <p className="text-white">$ npx prisma studio</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
