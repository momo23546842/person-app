// app/about/page.tsx

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-12 text-gray-800">
      
      {/* 1. HEADER & PURPOSE */}
      <section className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          About This Application
        </h1>
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
          <h2 className="text-xl font-bold text-emerald-800 mb-2">
            Project Purpose
          </h2>
          <p className="text-emerald-900 leading-relaxed">
            This application allows users to manage individuals’ basic information and record their daily meal habits. 
            Designed with my background as a <strong>Registered Dietitian</strong>, it <strong>integrates</strong> technical practice with real-world nutrition counseling.
          </p>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* 2. APP OVERVIEW */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🎯</span> Application Overview
        </h2>
        <p className="mb-4 text-gray-600 leading-relaxed">
          This project demonstrates <strong>full-stack development mastery</strong> by integrating a responsive frontend with a robust database backend.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-blue-600">👤 Person Management</h3>
            <p className="text-sm text-gray-600">
              Implements <strong>complete CRUD operations</strong> (Create, Read, Update, Delete) for managing person records, ensuring seamless data handling.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-orange-600">🍽️ Meal Tracking</h3>
            <p className="text-sm text-gray-600">
              Extends functionality by allowing individualized meal records. This reflects the workflow of <strong>professional nutrition counseling</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THREE-PHASE ROADMAP */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">📌</span> Project Roadmap & Phases
        </h2>

        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-400">
            <h3 className="text-lg font-bold text-emerald-800">Phase 1: Core Architecture Foundation (Completed) ✅</h3>
            <p className="text-sm text-emerald-900 mt-2"><strong>Goal:</strong> Establish a reliable data management system.</p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
              <li><strong>Focus:</strong> Implemented a robust CRUD (Create, Read, Update, Delete) system for user management ("Person").</li>
              <li><strong>Outcome:</strong> Built the database schema using Prisma and ensured responsive UI design for seamless interaction on any device.</li>
            </ul>
          </div>

          <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-400">
            <h3 className="text-lg font-bold text-emerald-800">Phase 2: AI Assistant Prototyping (Completed) ✅</h3>
            <p className="text-sm text-emerald-900 mt-2"><strong>Goal:</strong> Verify the potential of Natural Language Processing (NLP) in nutrition.</p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
              <li><strong>Focus:</strong> Developed a conversational interface using <strong>Groq API</strong>.</li>
              <li><strong>Outcome:</strong> Created a chatbot that instantly parses food names and returns nutritional data. By using Groq, near-instantaneous response times were achieved, improving UX compared to standard LLM inference.</li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <h3 className="text-lg font-bold text-yellow-800">Phase 3: System Integration (Current Focus) 🚧</h3>
            <p className="text-sm text-yellow-900 mt-2"><strong>Goal:</strong> Fully automate the logging process using AI.</p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
              <li><strong>Focus:</strong> Connecting the AI Chat directly to the Database.</li>
              <li><strong>Technical Challenge:</strong> Implementing "Function Calling" and structured data output (JSON) to allow the AI to automatically create records in the <strong>MealLog</strong> database table based on chat history.</li>
              <li><strong>Vision:</strong> A system where users simply say "I had a banana," and the app automatically identifies the user and updates their specific health record.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. FUTURE ROADMAP */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🚀</span> Future Roadmap
        </h2>
        <p className="mb-4 text-gray-600">
          To enhance utility for professional nutrition guidance, I plan to implement:
        </p>
        <ul className="grid md:grid-cols-2 gap-4">
          <li className="p-4 bg-gray-50 rounded border border-gray-100">
            <strong className="block text-gray-900 mb-1">📊 Data Visualization</strong>
            <span className="text-sm text-gray-600">Charts to visualize weight trends and dietary improvements over time.</span>
          </li>
          <li className="p-4 bg-gray-50 rounded border border-gray-100">
            <strong className="block text-gray-900 mb-1">🎯 Action Planning</strong>
            <span className="text-sm text-gray-600">Goal-setting tools tailored for <strong>sustainable lifestyle improvements</strong>.</span>
          </li>
          <li className="p-4 bg-gray-50 rounded border border-gray-100">
            <strong className="block text-gray-900 mb-1">📨 Automated Follow-up</strong>
            <span className="text-sm text-gray-600">Scheduled reminders to prevent dropouts during the support period.</span>
          </li>
          <li className="p-4 bg-gray-50 rounded border border-gray-100">
            <strong className="block text-gray-900 mb-1">🔒 User Authentication</strong>
            <span className="text-sm text-gray-600">Secure login (NextAuth) to protect sensitive client data.</span>
          </li>
        </ul>
      </section>

      <hr className="border-gray-200" />

      {/* 4. TECHNICAL DETAILS (Requirement) */}
      <section className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-gray-500 uppercase tracking-wider mb-6">
          Technical Documentation
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tech Stack */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-gray-800">🛠️ Technology Stack</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center"><span className="w-2 h-2 bg-black rounded-full mr-2"></span><strong>Next.js (App Router):</strong> Framework & SSR</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span><strong>TypeScript:</strong> Type safety</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span><strong>Tailwind CSS:</strong> Responsive Styling</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span><strong>Prisma ORM:</strong> Database access</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span><strong>PostgreSQL:</strong> Relational Database</li>
            </ul>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-gray-800">🏗️ Architecture Overview</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li><strong>UI Rendering:</strong> React components render the responsive interface.</li>
              <li><strong>API Requests:</strong> User actions trigger Next.js API routes.</li>
              <li><strong>Data Layer:</strong> API routes communicate securely via Prisma ORM.</li>
              <li><strong>Database:</strong> Prisma executes SQL queries on PostgreSQL.</li>
              <li><strong>Response:</strong> Updated data is returned to the UI instantly.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}