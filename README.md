# Next.js Authentication Application

This is a Next.js authentication application that allows users to log in using email and OTP, or through Google or GitHub accounts. Follow the instructions below to run the application on your local system.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>=18.x.x)
- [npm](https://www.npmjs.com/)

## Getting Started

Follow the steps below to clone and set up the application on your system:

### 1. Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/aganitha/tech-coe.git
```

### 2. Navigate to the project directory:

```bash
cd tech-coe/people/shifath/my-next-auth-app
```

### 3. Install Dependencies
```bash
npm install
# If you encounter issues with dependencies, use:
npm install --legacy-peer-deps
```

### 4. Set Up Environment Variables
Create a `.env.local` file in the root of the project directory:
```env
# NextAuth Config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-min-32-chars

# Database
DATABASE_URL="file:./dev.db"

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Email Config (for OTP)
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-specific-password
```

### 5. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### 6. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Setting up OAuth Providers

### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select existing one
3. Enable Google OAuth API
4. Create credentials (OAuth client ID)
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### GitHub OAuth:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Set Homepage URL: `http://localhost:3000`
4. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### Gmail App Password (for OTP):
1. Go to your Google Account settings
2. Enable 2-Step Verification if not enabled
3. Go to App passwords
4. Generate new app password for email# next-auth
