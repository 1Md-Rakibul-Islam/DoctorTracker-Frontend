import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });

          const user = await res.json();
          if (user && user.success) {
            return {
              id: user.data.user._id,
              name: user.data.user.name,
              email: user.data.user.email,
              role: user.data.user.role,
              accessToken: user.data.accessToken
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
        (session as any).accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-super-secret-nextauth-key-12345",
  pages: {
    signIn: '/login',
  }
})

export { handler as GET, handler as POST }
