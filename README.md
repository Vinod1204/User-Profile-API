# User Profile API

## Technologies Used
- Express
- TypeScript
- Supabase (PostgreSQL)
- Next.js
- Axios
- Tailwind CSS

## Setup Instructions

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd user-management-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your Supabase credentials:
   ```env
   SUPABASE_URL=https://xyzcompany.supabase.co
   SUPABASE_KEY=public-anon-key
   ```
4. Start the Express server:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd user-management-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your Supabase credentials:
   ```env
   SUPABASE_URL=https://xyzcompany.supabase.co
   SUPABASE_KEY=public-anon-key
   API_URL=http://localhost:5000/users
   ```
4. Start the Next.js application:
   ```bash
   npm run dev
   ```

## Running the Application
1. Start the backend server.
2. Start the frontend application.
3. Open your browser and navigate to `http://localhost:3000` to access the user dashboard.
