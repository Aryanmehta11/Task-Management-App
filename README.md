# Task Management App

This is a full-stack task management application built with a **Flask backend** and a **React frontend**. The app allows users to manage tasks with CRUD functionality, providing a seamless user experience.

---

## Features

- **Create, Read, Update, and Delete (CRUD)** tasks.
- Backend deployed on [Render](https://task-management-app-cl1t.onrender.com).
- Frontend deployed using Render's Static Site Hosting.
- Fully responsive and user-friendly UI.

---

## Tech Stack

### Backend
- **Framework**: Flask
- **Database**: SQLite
- **Extensions**: Flask-Cors, Flask-SQLAlchemy
- **Deployed On**: Render

### Frontend
- **Framework**: React
- **Deployed On**: Render Static Site Hosting

---

## Directory Structure

### Backend
The backend is structured as follows:
backend/ │ ├── extensions/ # Formerly backend.extensions, handles app extensions like CORS, SQLAlchemy, etc. ├── routes/ # Formerly backend.routes, contains all API route definitions. ├── models/ # Defines database models. ├── services/ # Contains business logic and service functions. ├── utils/ # Utility functions for backend tasks. └── main.py # The main entry point for the Flask app.

csharp
Copy code

### Frontend
The frontend is structured as follows:
frontend/ │ ├── src/ │ ├── components/ # Reusable React components. │ ├── pages/ # Page-level components. │ ├── utils/ # Utility functions for frontend tasks. │ └── App.js # Main React App component. └── public/ # Static assets.

yaml
Copy code

---

## Installation

### 1. Clone the Repository
git clone <repository_url>
cd task-management-app
2. Setup Backend
Navigate to the backend directory:
bash
Copy code
cd backend
Install dependencies:
bash
Copy code
pip install -r requirements.txt
Run the backend server:
bash
Copy code
python main.py
The backend will run at http://localhost:5000.
3. Setup Frontend
Navigate to the frontend directory:
bash
Copy code
cd frontend
Install dependencies:
bash
Copy code
npm install
Add an .env file in the frontend directory with:
plaintext
Copy code
REACT_APP_API_BASE_URL=http://localhost:5000
Run the frontend server:
bash
Copy code
npm start
The frontend will run at http://localhost:3000.
Deployment
Backend Deployment (Render)
Deploy the Flask app on Render with your backend/ directory.
Use https://task-management-app-cl1t.onrender.com as your backend URL.
Frontend Deployment (Render)
Build the React app:
bash
Copy code
npm run build
Deploy the frontend/build folder on Render Static Site Hosting.
In Render's environment settings, set:
plaintext
Copy code
REACT_APP_API_BASE_URL=https://task-management-app-cl1t.onrender.com
