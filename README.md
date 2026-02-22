# 📋 Firestore Task Manager

A realtime task management web application built with React and Firebase Firestore (NoSQL).  
Users can create, update, and delete tasks, with changes synced instantly via Firestore’s realtime database.

---

## 🧩 Features

- **Create tasks** with title and description
- **Update tasks** instantly
- **Delete tasks**
- **Realtime sync** using Firebase Firestore listeners
- Clean and responsive UI

---

## 🛠 Tech Stack

| Frontend | Backend |
|----------|---------|
| React    | Firebase Firestore |
| Vite     | Firebase Authentication *(optional)* |
| JavaScript | Firebase Hosting *(optional)* |
| CSS      | Firebase SDK |

---

## 📁 Project Structure


firestore-task-manager/
├── public/ # Static assets
├── src/ # React source code
│ ├── components/ # UI components
│ ├── firebase/ # Firebase config & utils
│ ├── App.jsx
│ └── main.jsx
├── .gitignore # Files to ignore
├── index.html # App entrypoint
├── package.json # Dependencies
└── vite.config.js # Vite config


---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repo

```bash
git clone https://github.com/amulya6904/firestore-task-manager.git
cd firestore-task-manager
2️⃣ Install dependencies
npm install
3️⃣ Firebase configuration

Create a Firebase project and enable Firestore.

Add a .env file in the root:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

(Use your Firebase credentials here)

4️⃣ Run the project
npm run dev

Then open:

http://localhost:5173
🔌 Firestore Usage

In firebase/config.js (or equivalent file), Firestore is initialized:

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

You can listen for realtime updates using Firestore listeners like:

onSnapshot(collection(db, "tasks"), (snapshot) => {
  // update UI list
});

Key Learnings

Integration of Firebase Firestore as a realtime NoSQL database

Handling async UI updates with React state

Realtime listeners via Firestore snapshot APIs

CRUD operations with Firestore SDK
