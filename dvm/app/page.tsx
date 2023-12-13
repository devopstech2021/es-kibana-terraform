"use client";
import Navbar from "@/components/Navbar";
import Dashboard from "@/modules/dashboard/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Dashboard />
    </main>
  );
}
