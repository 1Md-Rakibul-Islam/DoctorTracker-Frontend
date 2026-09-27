import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Users,
  FileText,
  Shield,
  PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-zinc-950 overflow-hidden">
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-zinc-200/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              Doctor Tracker
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-medium">
                Sign in
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="font-medium shadow-sm">
                Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-32 pb-16">
        <div className="relative">
          {/* Background Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-blue-100/50 rounded-full blur-[100px]" />
            <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] bg-sky-100/50 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-600 mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Secure Administrative Portal
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-zinc-900 leading-tight">
              Manage your medical practice with{" "}
              <span className="text-primary bg-clip-text">precision</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-zinc-500 max-w-2xl leading-relaxed">
              Doctor Tracker provides administrators with a seamless, highly
              optimized platform to manage doctors, organize patient records,
              and visualize hospital analytics in real-time.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base shadow-lg shadow-primary/20"
                >
                  Access Portal <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base bg-white/50 backdrop-blur-sm"
                >
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-6 mt-32 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col p-8 rounded-2xl bg-zinc-50/50 border border-zinc-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/40">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-900">
                Doctor Management
              </h3>
              <p className="text-zinc-500 leading-relaxed">
                Easily onboard new medical professionals, track specializations,
                and manage assigned hospital departments from a centralized
                directory.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col p-8 rounded-2xl bg-zinc-50/50 border border-zinc-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/40">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-900">
                Patient Records
              </h3>
              <p className="text-zinc-500 leading-relaxed">
                Maintain accurate patient information and seamlessly assign or
                re-assign patients to their respective consulting doctors.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col p-8 rounded-2xl bg-zinc-50/50 border border-zinc-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/40">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-900">
                Real-time Analytics
              </h3>
              <p className="text-zinc-500 leading-relaxed">
                Visualize hospital capacity and department loads instantly with
                beautiful, high-performance charting and data aggregation tools.
              </p>
            </div>
          </div>
        </div>

        {/* Security Banner */}
        <div className="container mx-auto px-6 mb-20">
          <div className="rounded-3xl bg-zinc-950 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-medium text-sm tracking-wide uppercase">
                  Enterprise Security
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Secured by NextAuth</h2>
              <p className="text-zinc-400 text-lg">
                Your administrative portal is protected by industry-standard JWT
                authentication, rigorous route guarding, and strictly authorized
                endpoints.
              </p>
            </div>
            <div className="relative z-10 mt-8 md:mt-0">
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 px-8 font-semibold text-zinc-900"
                >
                  Register Admin Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Activity className="w-4 h-4 text-primary" />
            <span className="font-semibold text-zinc-900">Doctor Tracker</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6">
            <Link
              href="/login"
              className="hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/doctors"
              className="hover:text-primary transition-colors"
            >
              Doctors
            </Link>
            <Link
              href="/patients"
              className="hover:text-primary transition-colors"
            >
              Patients
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
