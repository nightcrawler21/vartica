// src/pages/index.tsx
import useSWR from "swr";
import { Article, ArticleCard } from "@/components/ArticleCard";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// generic fetch helper -------------------------------------------------------
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, error } = useSWR<Article[]>(
    `${process.env.NEXT_PUBLIC_API_BASE}/v1/articles/latest?limit=12`,
    fetcher
  );

  // --------------------------------------------------------------------------
  // UI STATES
  // --------------------------------------------------------------------------
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Failed to load.
      </div>
    );
  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading&hellip;
      </div>
    );

  // --------------------------------------------------------------------------
  // PAGE
  // --------------------------------------------------------------------------
  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-bg via-bg/80 to-surface
                  ${geistSans.className} ${geistMono.className}`}
    >
      {/*  ----------  Sticky header  ---------- */}
      <header className="sticky top-0 z-20 bg-bg/80 backdrop-blur border-b border-neutral-warm/10">
        <div className="max-w-6xl mx-auto flex items-center gap-6 px-4 py-3">
          {/* logo placeholder – replace with Vartica mark when ready */}
          <span className="text-2xl font-bold text-primary-blue">V ⬡</span>

          <nav className="space-x-4 text-sm">
            <a className="hover:text-primary-tan" href="#">
              Top
            </a>
            <a className="hover:text-primary-tan" href="#">
              Blindspot
            </a>
          </nav>
        </div>
      </header>

      {/*  ----------  Article grid  ---------- */}
      <section className="max-w-6xl mx-auto grid gap-6 px-4 py-8 md:grid-cols-3">
        {data.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>

      {/*  ----------  Footer (simple placeholder)  ---------- */}
      <footer className="text-center py-6 text-xs text-neutral-cool">
        © {new Date().getFullYear()} Vartica
      </footer>
    </main>
  );
}
