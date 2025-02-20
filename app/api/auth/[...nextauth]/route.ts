import NextAuth, { 
  DefaultSession, 
  Account, 
  Profile,
  User,
  Session
} from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'

// Extend the built-in types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      createdAt?: string
    } & DefaultSession['user']
  }

  interface User {
    emailVerified?: Date | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    provider?: string
    iat?: number
    picture?: string
    sub?: string
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'OTP',
      credentials: {
        email: { label: 'Email', type: 'email' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          // Create new user if not found
          return await prisma.user.create({
            data: {
              email: credentials.email,
             
              emailVerified: new Date(),
            },
          })
        }

        return {
          id: user.id,
          email: user.email,
        
          emailVerified: user.emailVerified,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: { 
      token: JWT; 
      user?: User | null; 
      account?: Account | null 
    }): Promise<JWT> {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.provider = account.provider
        token.iat = Date.now() / 1000
      }
      return token
    },
    async session({ session, token }: { 
      session: Session; 
      token: JWT 
    }): Promise<Session> {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.picture as string
        session.user.createdAt = token.iat ? new Date(token.iat * 1000).toISOString() : undefined
      }
      return session
    },
    async signIn({ user, account, profile }: { 
      user: User; 
      account: Account | null; 
      profile?: Profile 
    }): Promise<boolean> {
      if (account?.provider === 'google' || account?.provider === 'github') {
        return true
      }
      if (account?.provider === 'credentials') {
        return true
      }
      return false
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 7 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }