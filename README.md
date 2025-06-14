# 🛡️ Military Asset Management Dashboard

A full-stack web application for managing military assets like weapons, vehicles, and ammunition across various bases. Built with React for the frontend and Node.js, Express.js, and SQLite for the backend.

## 📌 Features

- 🔐 Role-Based Access Control (RBAC)
- 🗃️ Asset tracking (Weapons, Vehicles, Ammunition)
- 🛒 Purchase recording
- 🔄 Asset transfer between bases
- 👥 Assignment of assets to personnel
- 📊 Dashboard with filters and visual metrics
- 🧾 Activity logging for auditing

## 🚀 Tech Stack

| Area        | Tech                                |
|-------------|-------------------------------------|
| Frontend    | React, Tailwind CSS, Axios          |
| Backend     | Node.js, Express.js, SQLite         |
| Tools       | Git, Render (Deployment), Postman   |

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sireesha-siri/Millitary-Asset-Fullstack.git
cd Millitary-Asset-Fullstack
🔙 Backend Setup
bash
Copy
Edit
cd backend
npm install
node server.js
Make sure military.db is correctly located in the db/ folder.

📁 Backend Folder Structure
pgsql
Copy
Edit
backend/
├── db/
│   └── military.db
├── routes/
│   └── users.js
├── controllers/
│   └── usersController.js
├── server.js
🌐 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
The app should now be running on http://localhost:3000.

📁 Frontend Folder Structure
pgsql
Copy
Edit
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
├── public/
│   └── index.html
🔗 API Endpoints
Method	Endpoint	Description
GET	/users	Get list of users
POST	/users	Add new user
PUT	/users/:id	Update user info
DELETE	/users/:id	Remove user from system
...	More Coming Soon	As the app evolves

More routes for assets, purchases, and transfers are to be added.

⚙️ Deployment
Frontend hosted on Render/Vercel

Backend deployed on Render

SQLite used as lightweight embedded DB

🎥 Demo
📹 Screen Recording Drive Link
🌐 Live Project Link (#https://aguru-sireeshas-millitary-asset-ful.vercel.app/login)

🙋‍♀️ Developer
Aguru Sireesha

📧 a.sireesha531@gmail.com

💼 LinkedIn

💻 GitHub

❓ Queries & Issues
If you face deployment issues or backend errors:

Ensure military.db is present.

Delete node_modules, run npm install again.

On Windows, Visual Studio with C++ is required for sqlite3.
