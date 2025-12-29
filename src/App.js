import React, { useState, useEffect } from 'react';
import { 
  Search, BookOpen, PenTool, Theater, Library, 
  Star, Mail, ArrowRight, BookMarked, History 
} from 'lucide-react';

/**
 * GYAN LADOO - FINAL STITCH REPLICA
 * Replicates the exact layout, colors, and typography of your Stitch HTML
 * while connecting dynamically to the gyanladoo.com WPGraphQL backend.
 */

const App = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // URL for the WordPress GraphQL endpoint
  const wpUrl = 'https://gyanladoo.com/graphql';

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
          nodes { 
            name 
            slug 
            count 
            description
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
      const result = await response.json();
      if (result.errors) throw new Error(result.errors[0].message);
      
      setPosts(result.data.posts.nodes);
      setCategories(result.data.categories.nodes);
    } catch (err) {
      console.error("Connection Error:", err);
      setError("CORS or Connection Issue");
      // Fallback data to keep the layout visible during setup
      setPosts([
        { id: '1', title: 'Pinjar', excerpt: 'A poignant novel set during the partition of India, capturing the tragic tale of Puro. It stands as a powerful commentary on the condition of women during chaotic times.', author: { node: { name: 'Amrita Pritam' } }, slug: 'pinjar' },
        { id: '2', title: 'Chitta Lahu', excerpt: 'A gripping tale of social reform and the struggles of the downtrodden in Punjabi society.', author: { node: { name: 'Nanak Singh' } }, slug: 'chitta-lahu' },
        { id: '3', title: 'Luna', excerpt: 'A modern retelling of the legend of Puran Bhagat, giving a voice to the stepmother Luna.', author: { node: { name: 'Shiv Kumar Batalvi' } }, slug: 'luna' }
      ]);
      setCategories([
        { name: 'Kahaniya', slug: 'kahaniya', count: 50 },
        { name: 'Kavita', slug: 'kavita', count: 100 },
        { name: 'Ikangi', slug: 'ikangi', count: 20 },
        { name: 'Kitaba', slug: 'kitaba', count: 200 }
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
      {/* INJECTING STYLES DIRECTLY: 
        This ensures that your fonts and colors work even if the Vercel build 
        doesn't pick up the external tailwind.config.js file.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,200..800&family=Noto+Sans:wght@400;500;700&display=swap');
        
        :root {
          --primary: #cf1754;
          --bg-light: #f8f6f6;
          --text-dark: #181113;
          --accent-subtle: #88636f;
        }

        body {
          font-family: 'Noto Sans', sans-serif;
          background-color: var(--bg-light);
          color: var(--text-dark);
        }

        .font-display {
          font-family: 'Newsreader', serif;
        }

        .font-sans {
          font-family: 'Noto Sans', sans-serif;
        }
      `}} />

      <div className="bg-[#f8f6f6] text-[#181113] antialiased overflow-x-hidden min-h-screen flex flex-col font-display">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 w-full border-b border-[#e5dce0] bg-white/95 backdrop-blur-md px-4 sm:px-10 py-3">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
            <div className="flex items-center gap-8">
              <a className="flex items-center gap-3 text-[#181113] group" href="/">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#cf1754]/10 text-[#cf1754] group-hover:bg-[#cf1754] group-hover:text-white transition-colors">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-tight font-sans">Punjabi Lit</h2>
              </a>
              <nav className="hidden md:flex items-center gap-6 font-sans">
                <a className="text-sm font-medium hover:text-[#cf1754] transition-colors" href="/">Home</a>
                <a className="text-sm font-medium hover:text-[#cf1754] transition-colors" href="#kahaniya">Kahaniya</a>
                <a className="text-sm font-medium hover:text-[#cf1754] transition-colors" href="#kavita">Kavita</a>
                <a className="text-sm font-medium hover:text-[#cf1754] transition-colors" href="#ikangi">Ikangi</a>
                <a className="text-sm font-medium hover:text-[#cf1754] transition-colors" href="#kitaba">Kitaba</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex w-64 items-center rounded-lg bg-[#f4f0f2] px-3 py-2">
                <Search size={18} className="text-[#88636f]" />
                <input className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-[#88636f] border-none focus:ring-0 p-0 font-sans" placeholder="Search authors, titles..." type="text"/>
              </div>
              <button className="rounded-lg bg-[#cf1754] px-5 py-2 text-sm font-bold text-white hover:bg-[#cf1754]/90 transition-colors shadow-sm shadow-[#cf1754]/20 font-sans">
                Sign In
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden pt-12 pb-16 lg:pt-24 lg:pb-32 px-4 sm:px-10">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="flex flex-col gap-6 text-left">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#cf1754]/20 bg-[#cf1754]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#cf1754] font-sans">
                    <span className="h-2 w-2 rounded-full bg-[#cf1754]"></span> For Students & Scholars
                  </div>
                  <h1 className="font-display text-5xl font-black leading-[1.1] tracking-tight text-[#181113] sm:text-6xl lg:text-7xl">
                    Explore the Soul <br/><span className="text-[#cf1754] italic">of Punjab</span>
                  </h1>
                  <p className="max-w-xl text-lg text-[#88636f] sm:text-xl leading-relaxed font-sans">
                    Immerse yourself in a curated collection of Punjabi literature. From timeless classic poems to modern short stories, discover the rich heritage of the Five Rivers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <div className="relative flex-1 max-w-md">
                      <input className="w-full h-12 sm:h-14 rounded-lg border-2 border-[#e5dce0] bg-white px-4 pl-12 text-base outline-none focus:border-[#cf1754] transition-all font-sans" placeholder="Search for 'Amrita Pritam'..." type="text"/>
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#88636f]" size={20} />
                      <button className="absolute right-2 top-2 bottom-2 bg-[#cf1754] hover:bg-[#cf1754]/90 text-white px-4 rounded-md font-medium text-sm font-sans transition-colors">Search</button>
                    </div>
                  </div>
                  <div className="flex gap-8 pt-4">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gray-300 bg-cover bg-center" style={{backgroundImage: `url(https://i.pravatar.cc/150?img=${i+10})`}}></div>
                      ))}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#cf1754] text-xs font-bold text-white font-sans">+2k</div>
                    </div>
                    <div className="flex flex-col justify-center font-sans">
                      <span className="text-sm font-bold text-[#181113]">2,000+ Students</span>
                      <span className="text-xs text-[#88636f]">Learning daily</span>
                    </div>
                  </div>
                </div>
                <div className="relative hidden lg:block h-full min-h-[500px] w-full rounded-2xl bg-[#f4f0f2] p-4 shadow-lg overflow-hidden group">
                  <div className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: `url(${posts[0]?.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'})`}}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f8f6f6]/80 to-transparent"></div>
                  <div className="absolute bottom-10 left-10 right-10 rounded-xl bg-white/90 p-6 backdrop-blur shadow-xl border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#cf1754]/10 text-[#cf1754]">
                        <Star size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-sans">Featured Work</h3>
                        <p className="mt-1 text-sm italic text-[#88636f] font-display">{posts[0]?.title || "Classic Literature"}</p>
                        <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#cf1754] font-sans">— By {posts[0]?.author?.node?.name || "Gyan Ladoo"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Grid (The 4 Pillars) */}
          <section className="py-16 px-4 sm:px-10 bg-white">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight text-[#181113] sm:text-4xl font-sans">Literary Pillars</h2>
                <p className="mt-4 text-lg text-[#88636f] font-sans">Navigate through the foundational forms of Punjabi literature, curated for your learning journey.</p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {categories.slice(0, 4).map((cat, idx) => (
                  <a key={cat.slug} className="group relative overflow-hidden rounded-xl bg-[#f8f6f6] p-1 transition-all hover:shadow-xl hover:-translate-y-1" href={`https://gyanladoo.com/category/${cat.slug}`}>
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-200">
                      <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{backgroundImage: `url(https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=400&q=80&sig=${idx})`}}></div>
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-2 text-[#cf1754] font-sans">
                        {idx === 0 ? <BookOpen size={16}/> : idx === 1 ? <PenTool size={16}/> : idx === 2 ? <Theater size={16}/> : <Library size={16}/>}
                        <span className="text-xs font-bold uppercase tracking-wider">{cat.name}</span>
                      </div>
                      <h3 className="text-xl font-bold font-sans">{cat.name}</h3>
                      <p className="mt-2 text-sm text-[#88636f] font-sans line-clamp-2">{cat.count} curated articles and summaries.</p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-bold text-[#cf1754] font-sans">
                        Browse Collection <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Content Section */}
          <section className="py-16 px-4 sm:px-10 bg-[#f8f6f6]">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-[#181113] font-sans">Work of the Week</h2>
                  <p className="mt-2 text-[#88636f] font-sans">Handpicked selections to start your reading journey.</p>
                </div>
                <a className="inline-flex items-center gap-2 rounded-lg border border-[#e5dce0] bg-white px-4 py-2 text-sm font-medium text-[#181113] hover:bg-gray-50 transition-colors font-sans" href="https://gyanladoo.com">
                  View Archive <ArrowRight size={18} />
                </a>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Big Card */}
                <div className="relative overflow-hidden rounded-2xl bg-[#cf1754] text-white p-8 lg:p-12 flex flex-col justify-center min-h-[400px]">
                  <div className="absolute inset-0 z-0">
                    <div className="h-full w-full bg-cover bg-center opacity-20 mix-blend-overlay" style={{backgroundImage: `url(${posts[0]?.featuredImage?.node?.sourceUrl || ''})`}}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#cf1754] via-[#cf1754]/90 to-transparent"></div>
                  </div>
                  <div className="relative z-10 max-w-lg">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm font-sans">
                      <Star size={14} /> Editor's Choice
                    </div>
                    <h3 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{posts[0]?.title}</h3>
                    <p className="mt-2 text-xl font-medium text-white/90 font-sans">by {posts[0]?.author?.node?.name}</p>
                    <p className="mt-6 text-lg text-white/80 leading-relaxed line-clamp-3 font-display">{cleanExcerpt(posts[0]?.excerpt)}</p>
                    <div className="mt-8">
                      <a href={`https://gyanladoo.com/${posts[0]?.slug}`} className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#cf1754] shadow-lg hover:bg-gray-50 transition-colors inline-block font-sans">Start Reading</a>
                    </div>
                  </div>
                </div>

                {/* Side List */}
                <div className="flex flex-col gap-4">
                  {posts.slice(1, 3).map(post => (
                    <div key={post.id} className="flex flex-col sm:flex-row gap-4 rounded-xl border border-[#e5dce0] bg-white p-4 transition-colors hover:border-[#cf1754]/30 group">
                      <div className="h-48 sm:h-auto sm:w-32 shrink-0 rounded-lg bg-gray-200 bg-cover bg-center transition-transform group-hover:scale-95" style={{backgroundImage: `url(${post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=200'})`}}></div>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold uppercase text-[#cf1754] font-sans">Article</div>
                          <h4 className="mt-2 text-xl font-bold font-sans group-hover:text-[#cf1754] transition-colors">{post.title}</h4>
                          <p className="text-sm font-medium text-[#88636f] font-sans">by {post.author?.node?.name}</p>
                          <p className="mt-2 text-sm text-[#88636f] font-sans line-clamp-2">{cleanExcerpt(post.excerpt)}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                          <a href={`https://gyanladoo.com/${post.slug}`} className="text-sm font-bold text-[#cf1754] hover:underline font-sans">Read Now</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="border-t border-[#e5dce0] bg-white px-4 sm:px-10 py-16">
            <div className="mx-auto max-w-3xl text-center">
              <Mail size={40} className="text-[#cf1754] mx-auto mb-4" />
              <h2 className="text-3xl font-bold tracking-tight text-[#181113] font-sans">Join the Literary Circle</h2>
              <p className="mt-4 text-lg text-[#88636f] font-sans">Get the latest stories, poems, and analysis delivered straight to your inbox. Perfect for students preparing for exams.</p>
              <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input className="flex-1 rounded-lg border border-[#e5dce0] bg-white px-4 py-3 text-sm outline-none focus:border-[#cf1754] font-sans" placeholder="Enter your email address..." type="email"/>
                <button className="rounded-lg bg-[#cf1754] px-6 py-3 text-sm font-bold text-white hover:bg-[#cf1754]/90 font-sans transition-all" type="button">Subscribe</button>
              </form>
              <p className="mt-4 text-xs text-[#88636f] font-sans">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </section>
        </main>

        <footer className="bg-white border-t border-[#e5dce0] py-12 px-4 sm:px-10">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="text-[#cf1754]" />
              <span className="text-lg font-bold text-[#181113] font-sans">Gyan Ladoo</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-[#88636f] font-sans">
              <a className="hover:text-[#cf1754] transition-colors" href="https://gyanladoo.com/about">About Us</a>
              <a className="hover:text-[#cf1754] transition-colors" href="https://gyanladoo.com/contact">Contact</a>
            </div>
            <div className="text-sm text-[#88636f] font-sans">© 2025 Punjabi Lit. Powered by Gyan Ladoo.</div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
