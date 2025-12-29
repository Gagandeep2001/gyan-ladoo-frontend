import React, { useState, useEffect } from 'react';
import { 
  Search, BookOpen, PenTool, Theater, Library, 
  Star, Mail, ArrowRight, Menu, X, Settings, 
  ExternalLink, AlertCircle, RefreshCw, Info,
  Tag as TagIcon, User
} from 'lucide-react';

/**
 * GYAN LADOO HEADLESS MAIN APP
 * Fetches real categories, tags, and posts from gyanladoo.com
 */

const App = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wpUrl, setWpUrl] = useState('https://gyanladoo.com/graphql');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    const query = `
      query GetGyanLadooData {
        posts(first: 6) {
          nodes {
            id
            title
            excerpt
            date
            slug
            uri
            tags {
              nodes {
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
        categories(first: 4, where: { hideEmpty: true }) {
          nodes {
            name
            slug
            count
          }
        }
      }
    `;

    try {
      const response = await fetch(wpUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const result = await response.json();
      if (result.errors) throw new Error(result.errors[0].message);

      setPosts(result.data.posts.nodes);
      setCategories(result.data.categories.nodes);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message === "Failed to fetch" ? "CORS Blocked" : err.message);
      
      // Fallback data for preview
      setPosts([
        {
          id: "1",
          title: "ਪੰਜਾਬੀ ਸਾਹਿਤ ਦਾ ਇਤਿਹਾਸ (History of Punjabi Literature)",
          excerpt: "ਸਾਹਿਤ ਮਨੁੱਖੀ ਜੀਵਨ ਦਾ ਦਰਪਣ ਹੈ। ਪੰਜਾਬੀ ਸਾਹਿਤ ਦੀਆਂ ਜੜ੍ਹਾਂ ਬਹੁਤ ਡੂੰਘੀਆਂ ਹਨ...",
          author: { node: { name: "Gyan Ladoo" } },
          slug: "punjabi-sahit-da-itihas",
          tags: { nodes: [{ name: "History" }] },
          featuredImage: { node: { sourceUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600" } }
        }
      ]);
      setCategories([{ name: 'ਕਹਾਣੀਆਂ', slug: 'stories', count: 12 }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfbfc] text-[#181113] font-serif">
      <header className="sticky top-0 z-50 w-full border-b border-[#e5dce0] bg-white/90 backdrop-blur-xl px-4 sm:px-10 py-3">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="https://gyanladoo.com" className="flex items-center gap-3 group">
              <div className="relative size-10 flex items-center justify-center overflow-hidden rounded-xl bg-[#cf1754]/5">
                <img 
                  src="https://gyanladoo.com/wp-content/uploads/2023/10/cropped-Gyan-Ladoo-Logo.png" 
                  className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform" 
                  alt="Gyan Ladoo Logo"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                />
                <BookOpen size={24} className="text-[#cf1754] hidden" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black font-sans leading-none tracking-tight">GYAN LADOO</h1>
                <span className="text-[10px] font-bold font-sans text-[#cf1754] tracking-[0.2em] uppercase">Digital Library</span>
              </div>
            </a>
            <nav className="hidden lg:flex items-center gap-8 font-sans">
              {categories.map((cat) => (
                <a key={cat.slug} href={`https://gyanladoo.com/category/${cat.slug}`} className="text-xs font-black uppercase tracking-widest text-[#88636f] hover:text-[#cf1754]">
                  {cat.name}
                </a>
              ))}
            </nav>
          </div>
          <a href="https://gyanladoo.com/wp-admin" className="rounded-xl bg-[#cf1754] px-6 py-2.5 text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-[#cf1754]/20">
            Dashboard
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-40 px-6">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black font-sans leading-[0.95] tracking-tighter">
                Knowledge <br/>is the <span className="text-[#cf1754] italic">Sweetest.</span>
              </h1>
              <p className="text-xl text-[#88636f] max-w-lg">Welcome to Gyan Ladoo. Explore our digital archive of Punjabi literature.</p>
              <div className="relative max-w-md">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#88636f]" size={22} />
                <input className="w-full h-16 rounded-2xl border-2 border-[#e5dce0] px-5 pl-14 text-lg outline-none focus:border-[#cf1754]" placeholder="Search articles..." />
              </div>
            </div>
            <div className="relative hidden lg:block h-[500px] w-full rounded-[50px] overflow-hidden border-[12px] border-white shadow-2xl">
                <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80" className="w-full h-full object-cover" alt="Library" />
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post) => (
                <article key={post.id} className="group flex flex-col rounded-[48px] bg-white border border-[#e5dce0]/30 overflow-hidden hover:shadow-2xl transition-all">
                  <div className="aspect-[1.2] overflow-hidden relative">
                    <img src={post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600'} className="w-full h-full object-cover" alt={post.title} />
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold mb-6 font-sans leading-tight">{post.title}</h3>
                    <div className="text-[#88636f] text-sm leading-relaxed line-clamp-3 mb-10 flex-1" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    <a href={`https://gyanladoo.com/${post.slug}`} className="flex items-center justify-between py-6 border-t border-[#f4f0f2]">
                      <span className="text-xs font-black uppercase tracking-widest font-sans">Read Full Analysis</span>
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-[#e5dce0] py-20 px-6 text-center">
        <p className="text-sm text-[#88636f]">© 2025 Gyan Ladoo. Syncing from Hostinger.</p>
      </footer>
    </div>
  );
};

export default App;
