import { createAuthClient } from 'better-auth/react';

const serverURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authClient = createAuthClient({
  baseURL: serverURL,
  fetchOptions: {
    credentials: 'include', // Required for cross-domain cookies (Vercel → Render)
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
