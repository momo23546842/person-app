# 🥦 Personal Meal Management App

## 📖 Project Purpose
This application allows users to manage individuals’ basic information and record their daily meal habits. 
Designed with my background as a **Registered Dietitian**, it **integrates** technical practice with real-world nutrition counseling.

## 🎯 Application Overview
This project demonstrates **full-stack development mastery** by integrating a responsive frontend with a robust database backend.

### 👤 Person Management
Implements **complete CRUD operations** (Create, Read, Update, Delete) for managing person records, ensuring seamless data handling.

#### ✨ Add a New Person
You can easily add a new person to the system. The intuitive interface allows for quick input of basic profiles.

<p align="center">
  <img src="./images/Screenshot 2025-12-11 154832.png" alt="Add Person Step 1" width="45%" />
  <img src="./images/Screenshot 2025-12-11 154907.png" alt="Add Person Step 2" width="45%" />
</p>

#### ✏️ Edit Person Details
Clicking the "Edit" button opens a form pre-filled with the user's current data, making updates simple and error-free.

<p align="center">
  <img src="./images/Screenshot 2025-12-11 153116.png" alt="Edit Person Screen" width="70%" />
</p>

#### 🗑️ Delete a Person
To remove a person, click the "Delete" button. This action securely removes the record from the database.

<p align="center">
  <img src="./images/Screenshot 2025-12-11 153157.png" alt="Delete Action Screen" width="70%" />
</p>

### 🍽️ Meal Tracking
Extends functionality by allowing individualized meal records. This reflects the workflow of **professional nutrition counseling**.

## 🛠️ Technology Stack
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Deployment:** Vercel

### Phase 1: Core Architecture Foundation (Completed) ✅
**Goal:** Establish a reliable data management system.
* **Focus:** Implemented a robust CRUD (Create, Read, Update, Delete) system for user management ("Person").
* **Outcome:** Built the database schema using Prisma and ensured responsive UI design for seamless interaction on any device.

### Phase 2: AI Assistant Prototyping (Completed) ✅
**Goal:** Verify the potential of Natural Language Processing (NLP) in nutrition.
* **Focus:** Developed a conversational interface using **Groq API**.
* **Outcome:** Created a chatbot that instantly parses food names and returns nutritional data. By using Groq, I achieved near-instantaneous response times, significantly improving User Experience (UX) compared to standard LLM inference.

### Phase 3: System Integration (Current Focus) 🚧
**Goal:** Fully automate the logging process using AI.
* **Focus:** Connecting the AI Chat directly to the Database.
* **Technical Challenge:** Implementing "Function Calling" and structured data output (JSON) to allow the AI to automatically create records in the `MealLog` database table based on chat history.
* **Vision:** A system where users simply say "I had a banana," and the app automatically identifies the user and updates their specific health record.  (See <attachments> above for file contents. You may not need to search or read the file again.)

## 🚀 Future Roadmap
To enhance utility for professional nutrition guidance, I plan to implement:
* **📊 Data Visualization:** Charts to visualize weight trends and dietary improvements over time.
* **🎯 Action Planning:** Goal-setting tools tailored for **sustainable lifestyle improvements**.
* **📨 Automated Follow-up:** Scheduled reminders to prevent dropouts during the support period.
* **🔒 User Authentication:** Secure login (NextAuth) to protect sensitive client data.