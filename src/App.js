import React, { useState, useEffect } from 'react';
import { 
  Search, BookOpen, PenTool, Theater, Library, 
  Star, Mail, ArrowRight, Menu, X, Settings, 
  ExternalLink, AlertCircle, RefreshCw, Info,
  Tag as TagIcon, User
} from 'lucide-react';

/**
 * GYAN LADOO HEADLESS PREVIEW - V1.2
 * - Dynamic Categories & Tags integration
 * - Official Logo implementation
 * - Automatic Slug mapping to gyanladoo.com
 */

const App = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wpUrl, setWpUrl] = useState('https://gyanladoo.com/graphql');
  const [showSettings, setShowSettings] = useState(false);

  // Fetch posts and categories from gyanladoo.com
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
      
      // Better mock data reflecting actual site structure for preview
      setPosts(getMockData());
      setCategories([
        { name: 'ਕਹਾਣੀਆਂ (Stories)', slug: 'punjabi-stories', count: 12 },
        { name: 'ਕਵਿਤਾ (Poetry)', slug: 'punjabi-poetry', count: 45 },
        { name: 'ਇਕਾਂਗੀ (Plays)', slug: 'one-act-plays', count: 8 },
        { name: 'ਜੀਵਨੀ (Biographies)', slug: 'biographies', count: 15 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getMockData = () => [
    {
      id: "1",
      title: "ਪੰਜਾਬੀ ਸਾਹਿਤ ਦਾ ਇਤਿਹਾਸ (History of Punjabi Literature)",
      excerpt: "ਸਾਹਿਤ ਮਨੁੱਖੀ ਜੀਵਨ ਦਾ ਦਰਪਣ ਹੈ। ਪੰਜਾਬੀ ਸਾਹਿਤ ਦੀਆਂ ਜੜ੍ਹਾਂ ਬਹੁਤ ਡੂੰਘੀਆਂ ਹਨ...",
      author: { node: { name: "Gyan Ladoo" } },
      slug: "punjabi-sahit-da-itihas",
      tags: { nodes: [{ name: "History" }, { name: "Literature" }] },
      featuredImage: { node: { sourceUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600" } }
    },
    {
      id: "2",
      title: "ਅੰਮ੍ਰਿਤਾ ਪ੍ਰੀਤਮ ਦੀਆਂ ਚੋਣਵੀਆਂ ਕਵਿਤਾਵਾਂ",
      excerpt: "ਅੰਮ੍ਰਿਤਾ ਪ੍ਰੀਤਮ ਪੰਜਾਬੀ ਦੀ ਇੱਕ ਅਜਿਹੀ ਕਵਿੱਤਰੀ ਹੈ ਜਿਸਨੇ ਆਪਣੀਆਂ ਲਿਖਤਾਂ ਰਾਹੀਂ...",
      author: { node: { name: "Admin" } },
      slug: "amrita-pritam-poems",
      tags: { nodes: [{ name: "Poetry" }] },
      featuredImage: { node: { sourceUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600" } }
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfbfc] text-[#181113] font-serif selection:bg-[#cf1754]/20">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-[#e5dce0] bg-white/90 backdrop-blur-xl px-4 sm:px-10 py-3">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
          <div className="flex items-center gap-10">
            {/* LOGO SECTION */}
            <a href="https://gyanladoo.com" className="flex items-center gap-3 group">
              <div className="relative size-10 flex items-center justify-center overflow-hidden rounded-xl bg-[#cf1754]/5">
                {/* Fallback to icon if logo doesn't load, but attempted site logo first */}
                <img 
                  src="https://gyanladoo.com/wp-content/uploads/2023/10/cropped-Gyan-Ladoo-Logo.png" 
                  className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform" 
                  alt="Gyan Ladoo Logo"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                />
                <BookOpen size={24} className="text-[#cf1754] hidden" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black font-sans leading-none tracking-tight text-[#181113]">GYAN LADOO</h1>
                <span className="text-[10px] font-bold font-sans text-[#cf1754] tracking-[0.2em] uppercase">Digital Library</span>
              </div>
            </a>
            
            <nav className="hidden lg:flex items-center gap-8 font-sans">
              {categories.slice(0, 4).map((cat) => (
                <a 
                  key={cat.slug} 
                  href={`https://gyanladoo.com/category/${cat.slug}`} 
                  className="text-xs font-black uppercase tracking-widest text-[#88636f] hover:text-[#cf1754] transition-colors"
                >
                  {cat.name.split(' ')[0]}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-xl transition-all ${showSettings ? 'bg-[#cf1754] text-white' : 'text-[#88636f] hover:bg-gray-100'}`}
            >
              <Settings size={20} />
            </button>
            <a href="https://gyanladoo.com/wp-admin" className="hidden sm:block rounded-xl bg-[#cf1754] px-6 py-2.5 text-xs font-black text-white uppercase tracking-widest hover:bg-[#cf1754]/90 transition-all shadow-lg shadow-[#cf1754]/20">
              Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Settings (Debugging) */}
      {showSettings && (
        <div className="bg-white border-b border-[#e5dce0] animate-in slide-in-from-top duration-300">
          <div className="max-w-4xl mx-auto p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2 font-sans">
                <Settings size={18} className="text-[#cf1754]" /> Auto-Stitch Config
              </h3>
              <p className="text-sm text-[#88636f]">The site is currently fetching data from Hostinger via GraphQL.</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={wpUrl} 
                  onChange={(e) => setWpUrl(e.target.value)}
                  className="flex-1 p-3 border border-[#e5dce0] rounded-xl text-sm outline-none font-sans"
                />
                <button onClick={fetchData} className="bg-[#cf1754] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                  <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Sync
                </button>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
               <h4 className="text-sm font-bold text-red-600 flex items-center gap-2 mb-2 font-sans">
                <AlertCircle size={16} /> Connection Status
               </h4>
               <p className="text-xs text-red-500 leading-relaxed">
                 {error ? `Error: ${error}. Browser is blocking the request. You MUST install a CORS plugin on WordPress to allow headless browsing.` : "System connected and ready."}
               </p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-40 px-6">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-[#cf1754]/5 px-4 py-1.5 border border-[#cf1754]/10">
                <span className="flex size-2 rounded-full bg-[#cf1754] animate-ping"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#cf1754] font-sans">Official Headless Portal</span>
              </div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black font-sans leading-[0.95] tracking-tighter text-[#181113]">
                Knowledge <br/>is the <span className="text-[#cf1754] italic">Sweetest.</span>
              </h1>
              <p className="text-xl text-[#88636f] max-w-lg leading-relaxed">
                Welcome to <strong>Gyan Ladoo</strong>. Explore our digital archive of Punjabi literature, curated specifically for students and scholars.
              </p>
              <div className="relative max-w-md">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#88636f]" size={22} />
                <input 
                  className="w-full h-16 rounded-2xl border-2 border-[#e5dce0] bg-white px-5 pl-14 text-lg outline-none focus:border-[#cf1754] transition-all shadow-xl shadow-gray-100" 
                  placeholder="Search 1,000+ articles..." 
                />
              </div>
            </div>

            <div className="relative hidden lg:block group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#cf1754] to-[#88636f] rounded-[60px] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative h-[600px] w-full rounded-[50px] overflow-hidden border-[12px] border-white shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt="Library"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12 p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20">
                  <p className="text-2xl text-white font-medium italic">"The ink of a scholar is holier than the blood of a martyr."</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-[2px] w-8 bg-[#cf1754]"></div>
                    <span className="text-xs font-black text-white/80 uppercase tracking-widest font-sans">Gyan Ladoo Wisdom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Pillars (Categories) */}
        <section className="py-24 px-6 bg-white border-y border-[#e5dce0]">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((cat, idx) => (
                <a 
                  key={cat.slug} 
                  href={`https://gyanladoo.com/category/${cat.slug}`}
                  className="group p-10 rounded-[40px] bg-[#fcfbfc] border border-[#e5dce0]/50 hover:border-[#cf1754] transition-all hover:-translate-y-2 text-center"
                >
                  <div className="inline-flex size-16 items-center justify-center rounded-3xl bg-white shadow-lg group-hover:bg-[#cf1754] group-hover:text-white transition-all mb-8">
                    {idx === 0 ? <BookOpen size={28}/> : idx === 1 ? <PenTool size={28}/> : idx === 2 ? <Theater size={28}/> : <Library size={28}/>}
                  </div>
                  <h3 className="text-2xl font-bold font-sans mb-2">{cat.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#88636f]">{cat.count || 0} Articles</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-32 px-6 bg-[#fdfbfc]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-black font-sans tracking-tight">Recent Insights</h2>
                <p className="text-lg text-[#88636f]">Our latest research and literary analysis, synced from WordPress.</p>
              </div>
              <a href="https://gyanladoo.com" className="flex items-center gap-3 font-sans font-black text-xs uppercase tracking-[0.2em] text-[#cf1754] group">
                View All Posts <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post) => (
                <article key={post.id} className="group flex flex-col rounded-[48px] bg-white border border-[#e5dce0]/30 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(207,23,84,0.1)] transition-all duration-500">
                  <div className="aspect-[1.2] overflow-hidden relative">
                    <img 
                      src={post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600'} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt={post.title}
                    />
                    <div className="absolute top-8 left-8 flex gap-2">
                      {post.tags?.nodes?.slice(0, 2).map(tag => (
                        <span key={tag.slug} className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[#cf1754]">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[#88636f] mb-6">
                      <div className="size-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={12} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest font-sans">{post.author?.node?.name}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-6 group-hover:text-[#cf1754] transition-colors leading-tight font-sans">
                      {post.title}
                    </h3>
                    <div 
                      className="text-[#88636f] text-sm leading-relaxed line-clamp-3 mb-10 flex-1"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <a 
                      href={`https://gyanladoo.com/${post.slug}`} 
                      className="flex items-center justify-between py-6 border-t border-[#f4f0f2] group/link"
                    >
                      <span className="text-xs font-black uppercase tracking-widest font-sans">Read Full Analysis</span>
                      <div className="size-10 rounded-full border border-[#e5dce0] flex items-center justify-center group-hover/link:bg-[#cf1754] group-hover/link:border-[#cf1754] group-hover/link:text-white transition-all">
                        <ArrowRight size={18} />
                      </div>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Community CTA */}
        <section className="bg-[#181113] text-white py-32 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
          <div className="mx-auto max-w-4xl text-center space-y-10 relative z-10">
            <div className="inline-flex p-5 rounded-[32px] bg-[#cf1754] text-white shadow-2xl shadow-[#cf1754]/40 mb-4">
              <Mail size={40} />
            </div>
            <h2 className="text-5xl sm:text-6xl font-black font-sans leading-tight">Join the Scholar's <br/>Circle</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              We send out a weekly newsletter with the best of Punjabi literature, exam tips, and research analysis.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto pt-6">
              <input 
                className="flex-1 rounded-[24px] bg-white/5 border border-white/10 px-8 py-5 outline-none focus:border-[#cf1754] transition-all font-sans" 
                placeholder="Your email address" 
              />
              <button className="bg-[#cf1754] text-white px-12 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-[#cf1754]/90 transition-all shadow-xl shadow-[#cf1754]/20">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-[#e5dce0] py-20 px-6 font-sans">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
             <a href="https://gyanladoo.com" className="flex items-center gap-3">
              <img 
                src="https://gyanladoo.com/wp-content/uploads/2023/10/cropped-Gyan-Ladoo-Logo.png" 
                className="h-10 object-contain" 
                alt="Footer Logo"
              />
              <span className="text-2xl font-black tracking-tighter">GYAN LADOO</span>
            </a>
            <p className="text-[#88636f] text-sm max-w-sm leading-relaxed">
              ਪੰਜਾਬੀ ਸਾਹਿਤ ਅਤੇ ਸੱਭਿਆਚਾਰ ਨੂੰ ਸਮਰਪਿਤ ਇੱਕ ਡਿਜੀਟਲ ਮੰਚ। ਸਾਡਾ ਮਕਸਦ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਉੱਚ ਪੱਧਰੀ ਸਾਹਿਤਕ ਸਮੱਗਰੀ ਮੁਹੱਈਆ ਕਰਵਾਉਣਾ ਹੈ।
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#cf1754]">Quick Links</h4>
            <ul className="space-y-4 text-xs font-bold text-[#88636f] uppercase tracking-widest">
              <li><a href="https://gyanladoo.com/about" className="hover:text-[#cf1754] transition-colors">About Us</a></li>
              <li><a href="https://gyanladoo.com/contact" className="hover:text-[#cf1754] transition-colors">Contact</a></li>
              <li><a href="https://gyanladoo.com/disclaimer" className="hover:text-[#cf1754] transition-colors">Disclaimer</a></li>
            </ul>
          </div>

          <div className="space-y-6 text-center md:text-right">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#cf1754]">Visit Site</h4>
             <a href="https://gyanladoo.com" className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-6 py-3 rounded-2xl text-[10px] font-black text-[#cf1754] uppercase tracking-widest hover:bg-gray-100 transition-all">
               Main Website <ExternalLink size={14} />
             </a>
             <p className="text-[10px] text-[#88636f] font-bold">© 2025 Gyan Ladoo Headless.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
