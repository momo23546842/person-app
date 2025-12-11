# 🍽️ Meal Habit Tracker

A full-stack web application for managing persons and tracking their meal habits with detailed nutrition information. Built with Next.js 16, React 19, Prisma ORM, and PostgreSQL.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![Prisma](https://img.shields.io/badge/Prisma-7.1-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-teal)

## ✨ Features

### 👥 Person Management
- Create, Read, Update, Delete (CRUD) operations for persons
- Store name, email, age, and bio information
- View detailed person profiles with meal history

### 🍽️ Meal Tracking
- Log meals with full nutrition data
- Track calories, protein, fat, and carbohydrates
- Record meal times and add notes
- View nutrition summaries and totals

### 📱 Responsive Design
- Mobile-first approach
- Works seamlessly on desktop, tablet, and mobile devices
- Professional UI/UX with modern styling

### 📖 Built-in Documentation
- `/about` - App architecture and technology stack
- `/github` - Link to GitHub repository
- `/database` - Prisma schema and database structure

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (local or cloud-hosted)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/meal-habit-tracker.git
   cd meal-habit-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your PostgreSQL database URL:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   ```

4. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Seed the database (optional)**
   ```bash
   npm run db:seed
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
meal-habit-tracker/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data script
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── persons/   # Person CRUD API routes
│   │   │   └── meals/     # Meal CRUD API routes
│   │   ├── about/         # About page
│   │   ├── database/      # Database documentation page
│   │   ├── github/        # GitHub link page
│   │   ├── meals/         # Meals listing page
│   │   ├── persons/[id]/  # Person detail page
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page (Person list)
│   ├── components/
│   │   └── Navbar.tsx     # Navigation component
│   ├── generated/
│   │   └── prisma/        # Generated Prisma client
│   └── lib/
│       └── prisma.ts      # Prisma client singleton
├── package.json
└── README.md
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4 |
| Backend | Next.js API Routes |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Language | TypeScript |
| Deployment | Vercel |

## 📝 API Endpoints

### Persons
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/persons` | Get all persons |
| POST | `/api/persons` | Create a person |
| GET | `/api/persons/[id]` | Get a person by ID |
| PUT | `/api/persons/[id]` | Update a person |
| DELETE | `/api/persons/[id]` | Delete a person |

### Meals
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/meals` | Get all meals |
| POST | `/api/meals` | Create a meal |
| GET | `/api/meals/[id]` | Get a meal by ID |
| PUT | `/api/meals/[id]` | Update a meal |
| DELETE | `/api/meals/[id]` | Delete a meal |

## 🗄️ Database Schema

```prisma
model Person {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  age       Int?
  bio       String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  meals     Meal[]
}

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
  person    Person   @relation(...)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variable `DATABASE_URL` in Vercel project settings
4. Deploy!

### Recommended Database Providers
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Supabase](https://supabase.com) - PostgreSQL with extras
- [Railway](https://railway.app) - Simple PostgreSQL hosting
- [PlanetScale](https://planetscale.com) - MySQL (requires schema changes)

## 📜 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run db:seed    # Seed the database
npm run db:push    # Push schema to database
npm run db:migrate # Run migrations
npm run db:studio  # Open Prisma Studio
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created for Week 3 Deliverable - Full Stack Development Course

---

⭐ If you found this helpful, please give it a star on GitHub!
