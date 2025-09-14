<div align="center">
  <br />
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Alien.png" alt="Vibe" width="100" />
  <br />
  <h1 align="center">Vibe</h1>
  <h2 align="center">Live Demo: http://vibe-production-7204.up.railway.app </h2>
  <p align="center">
    A real-time chat application inspired by Discord, built with modern web technologies.
  </p>
  

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io" />
  </p>
</div>

## 🚀 About Vibe

Vibe is a feature-rich, real-time chat application that enables users to create servers, channels, and engage in conversations through text, audio, and video. It's designed to be a modern and performant platform for communities and teams.

## ✨ Features

-   **Real-time Messaging:** Instant messaging with Socket.io.
-   **Audio/Video Rooms:** High-quality, low-latency audio and video chat with LiveKit.
-   **Server and Channel Management:** Create and manage servers and channels.
-   **User Authentication:** Secure authentication with Clerk.
-   **File Uploads:** Upload and share files with UploadThing.
-   **Dark Mode:** A sleek and modern dark mode.

## 🛠️ Tech Stack

| Category             | Technology                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework**        | [Next.js](https://nextjs.org/)                                                                                                             |
| **Styling**          | [Tailwind CSS](https://tailwindcss.com/)                                                                                                   |
| **UI Components**    | [Shadcn UI](https://ui.shadcn.com/)                                                                                                        |
| **Database**         | [Prisma](https://www.prisma.io/)                                                                                                           |
| **Authentication**   | [Clerk](https://clerk.com/)                                                                                                                |
| **Real-time**        | [Socket.io](https://socket.io/) & [LiveKit](https://livekit.io/)                                                                           |
| **File Uploads**     | [UploadThing](https://uploadthing.com/)                                                                                                    |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/)                                                                                                   |
| **Data Fetching**    | [TanStack Query](https://tanstack.com/query/v5)                                                                                            |

## 🏁 Getting Started

### Prerequisites

-   Node.js (v20 or higher)
-   `pnpm` (or your preferred package manager)
-   A running PostgreSQL database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd vibe
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the necessary environment variables. You'll need to provide credentials for your database, Clerk for authentication, UploadThing for file uploads, and LiveKit for real-time video/audio.

    ```env
    # Prisma
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

    # UploadThing
    UPLOADTHING_SECRET=
    UPLOADTHING_APP_ID=

    # LiveKit
    LIVEKIT_API_URL=
    LIVEKIT_API_KEY=
    LIVEKIT_API_SECRET=
    NEXT_PUBLIC_LIVEKIT_URL=
    ```

4.  **Push the database schema:**
    ```bash
    pnpm prisma db push
    ```

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Folder Structure

-   `app/`: The main application code, following the Next.js App Router structure.
    -   `(auth)/`: Authentication-related routes (sign-in, sign-up).
    -   `(main)/`: The core application routes, including servers, channels, and conversations.
    -   `api/`: API routes for handling backend logic.
-   `components/`: Reusable React components.
-   `hooks/`: Custom React hooks.
-   `lib/`: Utility functions and libraries.
-   `pages/api/socket/`: Socket.io server setup.
-   `prisma/`: Prisma schema and database migrations.
-   `public/`: Static assets.

## 📜 Available Scripts

-   `pnpm dev`: Starts the development server with Turbopack.
-   `pnpm build`: Builds the application for production.
-   `pnpm start`: Starts a production server.
-   `pnpm lint`: Runs the linter to check for code quality.

