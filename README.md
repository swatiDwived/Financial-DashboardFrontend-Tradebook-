## Financial Dashboard (Tradebook-Based) :-
A modern financial dashboard built using the MERN stack that allows users to track, analyze, and manage their trading activity with an intuitive and responsive UI.
This project is adapted from my Tradebook application and extended to meet the assignment requirements, including role-based UI simulation and insights visualization.

## Backend Repo Link :-
[Backend Repo](https://github.com/swatiDwived/Financial-DashboardBackend-Tradebook-.git)

## Demo Video Link :-
[Watch Demo](https://drive.google.com/file/d/15XmIyeOZAEdwM-rg0CSXCnF9H1xU-XDV/view?usp=drivesdk)

## Project Overview :-
This application functions as a financial dashboard where users can:
- Manage their trading transactions
- Analyze profit/loss trends
- View insights and performance metrics
- Experience role-based UI behavior (Admin(Default User) vs Viewer)
The project demonstrates frontend and backend integration, state management, and responsive UI design.

## Assignment Requirements Mapping

1. Transactions Dashboard
- Trade table displaying all transactions
- Add, Edit, Delete functionality
- Clean and structured layout

2. Role-Based UI (RBAC Simulation)
- Role toggle: Admin / Viewer
- Admin(default user):
  - Can add, edit, and delete trades
- Viewer:
  - Read-only access (no modifications allowed)
 Role-Based UI is simulated: Admin (default user) has full access, while Viewer mode provides read-only access.

> Note: Role-based behavior is simulated on the frontend as per assignment requirements.

3. Insights Section
- Total Trades Count in that month
- Net Profit/Loss calculation
- Success rate (win percentage)
- Profit vs Loss visualization (pie chart)

4. Yearly Timeline
-  A visual timeline to track total trades, total profit and total loss across all months, helping users analyze long-term trading performance.

5. State Management
- Managed using React hooks (`useState`, `useEffect`)
- Handles:
  - Trades data
  - UI state
  - Role selection
  
6. UI & UX
- Fully responsive design
- Clean and modern interface
- Dark theme support
- Smooth animations using Framer Motion
  
7. Empty State Handling
- Displays message when no data is available:
  > "No trades yet. Start by adding one!"

## Additional Features :-

- Trade notes and tags
- UI animations
- Data visualization charts

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios

Backend:
- Node.js
- Express.js
- MongoDB

## ⚙️ Local Setup Instructions

### 1. Clone the repository
git clone <your-repo-link>  
cd Financial-DashboardFrontend-Tradebook-

---

### 2. Install frontend dependencies
npm install

---

### 3. API Configuration
The frontend is currently configured to connect to the backend running locally:  
http://localhost:5000  

Make sure the backend server is running before starting the frontend.  
If deploying the project, update API URLs to match the deployed backend.

---

### 4. Start the frontend
npm run dev  

Frontend will run on:  
http://localhost:5173

---

### 5. Setup and start backend (required)
👉 Please refer to the backend repository for setup instructions.

---

### ⚠️ Important Notes
- Ensure backend is running before using the frontend  
- API calls should point to: http://localhost:5000  
