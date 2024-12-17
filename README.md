# Task Management App

This is a full-stack task management application built with a **Flask backend** and a **React frontend**. The app allows users to manage tasks with CRUD functionality, providing a seamless user experience.

---

## Features

- **Create, Read, Update, and Delete (CRUD)** tasks.
- Backend deployed on [Render](https://task-management-app-cl1t.onrender.com).
- Frontend deployed using Render's Static Site Hosting on [Render](https://task-management-app-frontend-z7di.onrender.com).
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
- It has a main entry file which is main.py.
- The routes.py has all the HTTP Methods configured and which are then used by main.py.
- Extensions.py and Models.py where exntensions helps in defining the database and models helps in creating the structure.
- Please remove backend from backend.extensions to extensions  , backend.routes to routes. These changes were done for deployment on render.
- Please make use of a persistant database , I have made use of simpler one inbuilt SQlite which is not persistant.




### Frontend
The frontend is structured as follows:
- This has the app.js has the main entry point of the file.
- We have TaskTable here which displays the data to the user and communicates with the backend.
- TaskModal.js is the form whhich appears when the user clicks on the add new task and is further integrated with TaskTable.

### Future Improvements
- Add user authentication.
- Support for multiple users.
- Enhance the UI/UX design.


