import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";

// Blog post interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

// Sample blog posts
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Male Pattern Baldness: Causes and Solutions",
    excerpt: "A comprehensive guide to androgenetic alopecia, its causes, progression patterns, and available treatment options.",
    content: "Male pattern baldness affects millions of men worldwide...",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
    category: "treatments",
    author: "Dr. Priya Sharma",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["hair loss", "male pattern baldness", "treatment"]
  },
  {
    id: "2",
    title: "FUE vs FUT: Which Hair Transplant Method is Right for You?",
    excerpt: "Compare the two main hair transplant techniques to make an informed decision about your hair restoration journey.",
    content: "When considering hair transplant surgery...",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    category: "treatments",
    author: "Dr. Vikram Singh",
    date: "2024-01-10",
    readTime: "7 min read",
    tags: ["hair transplant", "FUE", "FUT", "surgery"]
  },
  {
    id: "3",
    title: "The Science Behind PRP Therapy for Hair Growth",
    excerpt: "Explore how platelet-rich plasma therapy works to stimulate natural hair growth and strengthen existing hair follicles.",
    content: "PRP therapy has gained significant attention...",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    category: "treatments",
    author: "Dr. Rajesh Kumar",
    date: "2024-01-08",
    readTime: "6 min read",
    tags: ["PRP", "non-surgical", "hair growth"]
  },
  {
    id: "4",
    title: "10 Daily Habits for Healthy Hair",
    excerpt: "Simple lifestyle changes and daily routines that can significantly improve your hair health and prevent hair loss.",
    content: "Maintaining healthy hair requires consistent care...",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
    category: "care",
    author: "Dr. Anita Patel",
    date: "2024-01-05",
    readTime: "4 min read",
    tags: ["hair care", "lifestyle", "prevention"]
  },
  {
    id: "5",
    title: "Women and Hair Loss: Breaking the Silence",
    excerpt: "Addressing the unique challenges women face with hair loss and the specialized treatments available for female pattern baldness.",
    content: "Hair loss in women is more common than many realize...",
    image: "https://images.unsplash.com/photo-1594824694996-f962c29fdfaf?w=600&h=400&fit=crop",
    category: "lifestyle",
    author: "Dr. Meera Jain",
    date: "2024-01-03",
    readTime: "8 min read",
    tags: ["female hair loss", "women", "treatment"]
  },
  {
    id: "6",
    title: "Nutritional Supplements for Hair Health: What Really Works?",
    excerpt: "Evidence-based analysis of vitamins, minerals, and supplements that can support hair growth and overall hair health.",
    content: "The supplement industry is filled with promises...",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop",
    category: "lifestyle",
    author: "Dr. Arjun Reddy",
    date: "2024-01-01",
    readTime: "6 min read",
    tags: ["nutrition", "supplements", "hair health"]
  },
  {
    id: "7",
    title: "Latest Research in Hair Cloning and Future Treatments",
    excerpt: "Exploring cutting-edge research in hair multiplication, cloning technologies, and what the future holds for hair restoration.",
    content: "The field of hair restoration continues to evolve...",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    category: "research",
    author: "Dr. Vikram Singh",
    date: "2023-12-28",
    readTime: "9 min read",
    tags: ["research", "future", "hair cloning"]
  },
  {
    id: "8",
    title: "Scalp Micropigmentation: The Non-Surgical Hair Solution",
    excerpt: "Complete guide to SMP treatment, who's a good candidate, and what to expect from this innovative hair loss solution.",
    content: "Scalp Micropigmentation has emerged as a popular...",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
    category: "treatments",
    author: "Dr. Meera Jain",
    date: "2023-12-25",
    readTime: "5 min read",
    tags: ["SMP", "non-surgical", "hair tattoo"]
  },
  {
    id: "9",
    title: "Managing Hair Loss During Pregnancy and Postpartum",
    excerpt: "Understanding hormonal hair changes during pregnancy and effective treatments for postpartum hair loss.",
    content: "Pregnancy brings many changes to a woman's body...",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop",
    category: "lifestyle",
    author: "Dr. Anita Patel",
    date: "2023-12-22",
    readTime: "7 min read",
    tags: ["pregnancy", "postpartum", "hormonal hair loss"]
  }
];

export default function Blog() {
  const { t } = useLanguage();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Filter blog posts by category and search term
  useEffect(() => {
    let result = blogPosts;
    
    // Filter by category
    if (activeFilter !== "all") {
      result = result.filter(post => post.category === activeFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredPosts(result);
  }, [activeFilter, searchTerm]);
  
  // Get unique categories
  const categories = ["all", ...new Set(blogPosts.map(post => post.category))];
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "all": return "All";
      case "treatments": return "Treatments";
      case "care": return "Hair Care";
      case "lifestyle": return "Lifestyle";
      case "research": return "Research";
      default: return category;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Hair Care Blog
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Expert insights, treatment guides, and the latest research in hair care and restoration.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Search and Filters */}
        <section className="py-8">
          <div className="container">
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in [animation-delay:200ms]">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={cn(
                    "px-6 py-2 rounded-full transition-all",
                    activeFilter === category
                      ? "bg-primary text-white shadow-lg"
                      : "bg-card hover:bg-muted"
                  )}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
            
            {/* Results Count */}
            <div className="text-center mb-8 animate-fade-in [animation-delay:300ms]">
              <p className="text-muted-foreground">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </section>
        
        {/* Blog Grid */}
        <section className="pb-16">
          <div className="container">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <article 
                    key={post.id} 
                    className="glass-card rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {getCategoryLabel(post.category)}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h2 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        <Link 
                          to={`/blog/${post.id}`}
                          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-4">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs bg-muted px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter("all");
                    setSearchTerm("");
                  }}
                  className="btn-primary"
                >
                  Show All Articles
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}