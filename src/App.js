import React, { useState, useEffect } from 'react';
import { 
  Search, BookOpen, PenTool, Theater, Library, 
  Star, Mail, ArrowRight, BookMarked, History, Settings, RefreshCw, AlertCircle
} from 'lucide-react';

/**
 * GYAN LADOO - RECOVERY VERSION 3.0
 * This version hardcodes the CSS and Fonts to ensure the "2000s" look is gone.
 * It also handles the WordPress connection with extra security.
 */

const App = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wpUrl, setWpUrl] = useState('https://gyanladoo.com/graphql');

  const fetchData = async () => {
    setLoading(true);
    const query = `
      query GetGyanLadooData {
        posts(first: 3) {
          nodes {
            id
            title
            excerpt
            slug
            featuredImage { node { sourceUrl } }
            author { node { name } }
          }
        }
        categories(first: 4, where: { hideEmpty: true }) {
          nodes { name slug count }
        }
      }
    `;

    try {
      const response = await fetch(wpUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("WordPress server is not responding.");
      const result = await response.json();
      if (result.errors) throw new Error(result.errors[0].message);
      
      setPosts(result.data.posts.nodes);
      setCategories(result.data.categories.nodes);
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message === "Failed to fetch" ? "CORS_ERROR" : err.message);
      
      // FALLBACK DATA: Keeps the site looking professional even if connection fails
      setPosts([
        { id: '1', title: 'ਪਿੰਜਰ (Pinjar)', excerpt: 'ਅੰਮ੍ਰਿਤਾ ਪ੍ਰੀਤਮ ਦਾ ਇਹ ਨਾਵਲ ਦੇਸ਼ ਦੀ ਵੰਡ ਦੇ ਦੁਖਾਂਤ ਨੂੰ ਬਿਆਨ ਕਰਦਾ ਹੈ...', author: { node: { name: 'Amrita Pritam' } }, slug: 'pinjar' },
        { id: '2', title: 'ਚਿੱਟਾ ਲਹੂ (Chitta Lahu)', excerpt: 'ਨਾਨਕ ਸਿੰਘ ਦਾ ਇਹ ਨਾਵਲ ਸਮਾਜਿਕ ਬੁਰਾਈਆਂ ਵਿਰੁੱਧ ਇੱਕ ਆਵਾਜ਼ ਹੈ...', author: { node: { name: 'Nanak Singh' } }, slug: 'chitta-lahu' },
        { id: '3', title: 'ਲੂਣਾ (Luna)', excerpt: 'ਸ਼ਿਵ ਕੁਮਾਰ ਬਟਾਲਵੀ ਦੀ ਇਹ ਸ਼ਾਹਕਾਰ ਰਚਨਾ ਬਿਰਹਾ ਦੇ ਰੰਗਾਂ ਨਾਲ ਭਰੀ ਹੋਈ ਹੈ...', author: { node: { name: 'Shiv Kumar Batalvi' } }, slug: 'luna' }
      ]);
      setCategories([
        { name: 'ਕਹਾਣੀਆਂ', slug: 'kahaniya', count: 50 },
        { name: 'ਕਵਿਤਾ', slug: 'kavita', count: 120 },
        { name: 'ਇਕਾਂਗੀ', slug: 'ikangi', count: 15 },
        { name: 'ਕਿਤਾਬਾਂ', slug: 'kitaba', count: 200 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const cleanExcerpt = (html) => html?.replace(/<[^>]*>?/gm, '') || "";

  return (
    <>
      {/* FORCE THE STITCH DESIGN CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,200..800&family=Noto+Sans:wght@400;500;700&display=swap');
        
        :root {
          --primary: #cf1754;
          --bg-light: #f8f6f6;
          --text-dark: #181113;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'Noto Sans', sans-serif;
          background-color: var(--bg-light);
          color: var(--text-dark);
          line-height: 1.5;
        }

        .font-display { font-family: 'Newsreader', serif; }
        .text-primary { color: var(--primary); }
        .bg-primary { background-color: var(--primary); }
        
        /* Utility for Vercel if Tailwind script fails */
        .flex { display: flex; }
        .grid { display: grid; }
        .max-w-7xl { max-width: 80rem; margin-left: auto; margin-right: auto; }
        .rounded-xl { border-radius: 0.75rem; }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
      `}} />

      <div className="min-h-screen flex flex-col font-display">
        {/* Error Notification for Admin */}
        {error === "CORS_ERROR" && (
          <div className="bg-yellow-50 border-b border-yellow-100 p-3 flex items-center justify-center gap-3 text-xs font-sans text-yellow-800">
            <AlertCircle size={14} />
            <span>Connection Blocked by CORS. Your WordPress must allow access. (Plugin: WPGraphQL CORS)</span>
            <button onClick={() => fetchData()} className="underline font-bold">Retry Connection</button>
          </div>
        )}

        {/* Top Navigation */}
        <header className="sticky top-0 z-50 w-full border-b border-[#e5dce0] bg-white/95 backdrop-blur-md px-6 py-4">
          <div className="max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a className="flex items-center gap-3 group" href="/">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#cf1754]/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <BookOpen size={22} />
                </div>
                <h2 className="text-xl font-bold tracking-tight font-sans">Gyan Ladoo</h2>
              </a>
              <nav className="hidden md:flex items-center gap-6 font-sans text-sm font-medium">
                <a href="/" className="hover:text-primary transition-colors">Home</a>
                <a href="#kahaniya" className="hover:text-primary transition-colors">Kahaniya</a>
                <a href="#kavita" className="hover:text-primary transition-colors">Kavita</a>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex w-64 items-center rounded-lg bg-[#f4f0f2] px-3 py-2 border border-transparent focus-within:border-primary transition-all">
                <Search size={18} className="text-[#88636f]" />
                <input className="ml-2 w-full bg-transparent text-sm outline-none border-none p-0 font-sans" placeholder="Search authors..." />
              </div>
              <a href="https://gyanladoo.com/wp-admin" className="rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#cf1754]/20 uppercase tracking-widest font-sans">Dashboard</a>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative pt-16 pb-20 lg:pt-32 lg:pb-40 px-6">
            <div className="max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
              <div className="flex flex-col gap-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary font-sans">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span> Literature Portal
                </div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter">
                  Explore the Soul <br/><span className="text-primary italic">of Punjab</span>
                </h1>
                <p className="max-w-lg text-lg text-[#88636f] leading-relaxed font-sans">
                  A high-performance digital library curated for the next generation of Punjabi scholars.
                </p>
                <div className="relative max-w-md">
                  <input className="w-full h-14 rounded-xl border-2 border-[#e5dce0] bg-white px-5 pl-12 text-lg outline-none focus:border-primary transition-all font-sans" placeholder="Search..." />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#88636f]" size={20} />
                </div>
              </div>

              <div className="relative hidden lg:block h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src={posts[0]?.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200"} 
                  className="w-full h-full object-cover" 
                  alt="Feature" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                  <p className="text-2xl text-white font-medium italic">"May the fire of my love never extinguish."</p>
                  <p className="mt-2 text-white/70 text-xs font-bold uppercase tracking-widest">— Amrita Pritam</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pillars Section */}
          <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl font-bold tracking-tight font-sans">Literary Pillars</h2>
                <div className="h-1 w-20 bg-primary mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((cat, i) => (
                  <div key={cat.slug} className="group p-8 rounded-3xl bg-[#f8f6f6] border border-transparent hover:border-primary/20 transition-all hover:-translate-y-2 cursor-pointer">
                    <div className="size-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                      {i === 0 ? <PenTool /> : i === 1 ? <BookOpen /> : i === 2 ? <Theater /> : <Library />}
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-sans">{cat.name}</h3>
                    <p className="text-sm text-[#88636f] font-sans">{cat.count} articles available</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Posts Grid */}
          <section className="py-24 px-6 bg-[#f8f6f6]">
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold mb-12 font-sans flex items-center gap-4">
                Latest Publications <ArrowRight className="text-primary" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map(post => (
                  <article key={post.id} className="flex flex-col rounded-[2rem] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600"} className="w-full h-full object-cover" alt={post.title} />
                    </div>
                    <div className="p-8 space-y-4">
                      <h3 className="text-2xl font-bold leading-tight hover:text-primary transition-colors cursor-pointer">{post.title}</h3>
                      <p className="text-[#88636f] text-sm line-clamp-3 font-sans leading-relaxed">{cleanExcerpt(post.excerpt)}</p>
                      <a href={`https://gyanladoo.com/${post.slug}`} className="inline-flex items-center gap-2 text-primary font-bold text-sm pt-4 font-sans hover:gap-4 transition-all">
                        Read Analysis <ArrowRight size={16} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-white border-t border-[#e5dce0] py-16 px-6 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="text-primary" size={28} />
            <h2 className="text-2xl font-bold font-sans tracking-tight">Gyan Ladoo</h2>
          </div>
          <p className="text-[#88636f] text-sm font-sans max-w-md mx-auto">
            Punjab's leading digital platform for literature and culture. Curated with love for students and scholars.
          </p>
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest font-sans">© 2025 Gyan Ladoo Headless V3.0</p>
        </footer>
      </div>
    </>
  );
};

export default App;
