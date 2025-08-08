# ReelTrack V2

A personal movie watchlist, built using **TypeScript**, **React**, **NestJS**, and **GraphQL**.

---

## Features

- CRUD via **GraphQL** and **Apollo**
- MongoDB connection via **Mongoose**
- Styled with **Tailwind CSS**, **DaisyUI**, and **Lucide**
- Tested locally via **Apollo Playground**

---

## Tech Stack

- **Frontend**: TypeScript, React, React Router, Apollo Client, Tailwind CSS, DaisyUI, Lucide
- **Backend**: TypeScript, NestJS, GraphQL, Apollo Server
- **Database**: MongoDB Atlas, Mongoose
- **Development Tools**: Vite, Apollo Playground

---

## Quick Start

1. Clone the repository
```bash
git clone https://github.com/jerometaruc/ReelTrack-V2.git
cd ReelTrack-V2
```

2. Create a `.env` file inside the `backend/` directory:

```env
# backend/.env
MONGODB_URI=mongodb+srv://<username>:<password>@backenddb.ifbuzax.mongodb.net/ReelTrack-V2?retryWrites=true&w=majority&appName=<dbname>
```

> Replace `<username>`, `<password>`, and `<dbname>` with your actual MongoDB Atlas credentials.

3. From the root directory, install all dependencies:

```bash
npm run build
```

4. From the root directory, start both servers:

```bash
npm run start
```

5. Go to local host:

```bash
http://localhost:5173
```
