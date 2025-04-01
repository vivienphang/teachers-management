# Teachers Management System 

## Run the project

### 1. Clone the repository

```
git clone https://github.com/vivienphang/teachers-management.git
cd teachers-management-system
```

### 2. Setup the backend
```
cd backend
npm install
```

**Configure PostgreSQL**
   - Create a `.env` file based on snippet below
   - Set your database credentials accordingly
```
# Backend .env file
PG_USER=your_db_username
PG_PASSWORD=your_db_password
PG_DATABASE=teachers_management_db
PG_HOST=localhost
PG_PORT=5432
PORT=8000
FRONTEND_URL=http://localhost:5173
```

**Run Migrations**
```
npx sequelize-cli db:migrate
```
**Start the backend server**
```
npm run dev
```
The backend will run on http://localhost:8000 as per `.env`.

### 3. Setup the frontend
> Assuming you are in `teachers-management/backend` directory:
```
cd ../frontend
npm install
```
Create a `.env` file based on snippet below
```
# Frontend .env file
VITE_BACKEND_URL=http://localhost:8000
```

**Configure CORS**

Ensure that the backend (http://localhost:8000) is configured to allow requests from the frontend via CORS and accessible from the frontend.
> If needed, verify the `cors` middleware setup in the backend (`backend/server.ts`) allows the frontend origin.

**Start the Frontend**
```
npm run dev
```
The frontend will run on http://localhost:5173 

## Tech Stack
**Backend:** Node.js, Express.js, PostgreSQL, Sequelize ORM

**Frontend:** React with Vite, Material UI (MUI)

## Development Process
1. Designed the database schema and defined the relationships between tables.
2. Setup Sequelize models and ran migrations.
3. Built the backend API endpoints and tested using Postman.
4. Developed the frontend architecture: Components, pages, layouts, routes.
5. Setup CORS on the backend to allow access from frontend.
6. Implemented basic error handlings for smoother user flow.
7. Documented setup instructions in `README.md` for reviewers.
