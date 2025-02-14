import { Inter } from "next/font/google";
import PageHead from "@/components/commons/PageHead";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PageHead />
      <Link href="/admin/dashboard">Admin Dashboard</Link>
    </main>
  );
}
