import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Scissors, 
  Activity, 
  Zap, 
  Droplets, 
  Heart, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Hair care services data
const servicesData = {
  hairTransplant: {
    title: "Hair Transplant (FUE/FUT)",
    description: "Advanced surgical hair restoration techniques for permanent hair loss solutions.",
    icon: <Scissors className="h-6 w-6" />,
    items: [
      {
        title: "FUE Hair Transplant",
        description: "Follicular Unit Extraction - minimally invasive technique for natural-looking results with minimal scarring."
      },
      {
        title: "FUT Hair Transplant", 
        description: "Follicular Unit Transplantation - traditional strip method for maximum graft yield in single session."
      },
      {
        title: "Beard Transplant",
        description: "Facial hair restoration for patchy beards and complete beard reconstruction."
      },
      {
        title: "Eyebrow Transplant",
        description: "Precision eyebrow reconstruction for natural, fuller eyebrows."
      }
    ]
  },
  prpGfc: {
    title: "PRP / GFC Therapy",
    description: "Platelet-rich plasma treatments to stimulate natural hair growth and strengthen existing hair.",
    icon: <Droplets className="h-6 w-6" />,
    items: [
      {
        title: "PRP Therapy",
        description: "Platelet Rich Plasma injections to stimulate hair follicles and promote natural regrowth."
      },
      {
        title: "GFC Treatment",
        description: "Growth Factor Concentrate therapy for advanced hair restoration and scalp health."
      },
      {
        title: "PRF Therapy",
        description: "Platelet Rich Fibrin treatment for sustained growth factor release."
      },
      {
        title: "Combination Therapy",
        description: "Combined PRP and GFC treatments for maximum effectiveness."
      }
    ]
  },
  smp: {
    title: "Scalp Micropigmentation (SMP)",
    description: "Non-surgical hair tattoo technique to create the appearance of a full head of hair.",
    icon: <Zap className="h-6 w-6" />,
    items: [
      {
        title: "Hair Density SMP",
        description: "Add visual density to thinning hair areas for fuller appearance."
      },
      {
        title: "Complete Scalp SMP",
        description: "Full scalp coverage for completely bald areas with natural hairline design."
      },
      {
        title: "Scar Camouflage",
        description: "Hide hair transplant scars and injury marks with precision pigmentation."
      },
      {
        title: "Hairline Definition",
        description: "Create sharp, natural-looking hairlines and fill in receding areas."
      }
    ]
  },
  mesotherapy: {
    title: "Mesotherapy",
    description: "Micro-injection therapy to deliver nutrients directly to hair follicles.",
    icon: <Activity className="h-6 w-6" />,
    items: [
      {
        title: "Hair Mesotherapy",
        description: "Vitamin and nutrient injections to strengthen hair follicles and promote growth."
      },
      {
        title: "Scalp Mesotherapy",
        description: "Direct scalp treatment to improve circulation and follicle health."
      },
      {
        title: "Anti-Aging Mesotherapy",
        description: "Rejuvenating treatments to maintain healthy scalp and hair quality."
      },
      {
        title: "Customized Cocktails",
        description: "Personalized vitamin and growth factor combinations for individual needs."
      }
    ]
  },
  management: {
    title: "Hairfall & Dandruff Management",
    description: "Comprehensive treatments for common hair and scalp problems.",
    icon: <Heart className="h-6 w-6" />,
    items: [
      {
        title: "Anti-Dandruff Treatment",
        description: "Medical grade treatments to eliminate dandruff and prevent recurrence."
      },
      {
        title: "Hair Fall Control",
        description: "Targeted therapies to reduce excessive hair fall and strengthen roots."
      },
      {
        title: "Scalp Health Programs",
        description: "Comprehensive scalp care routines for optimal hair growth environment."
      },
      {
        title: "Lifestyle Counseling",
        description: "Nutrition and lifestyle guidance for long-term hair health."
      }
    ]
  },
  female: {
    title: "Female Hair Restoration",
    description: "Specialized treatments designed for women's unique hair loss patterns and needs.",
    icon: <Users className="h-6 w-6" />,
    items: [
      {
        title: "Female Pattern Baldness",
        description: "Targeted treatments for androgenetic alopecia in women."
      },
      {
        title: "Postpartum Hair Loss",
        description: "Specialized care for pregnancy and postpartum-related hair loss."
      },
      {
        title: "Hormonal Hair Loss",
        description: "Treatment for hair loss related to hormonal imbalances and PCOS."
      },
      {
        title: "Alopecia Areata",
        description: "Comprehensive treatment for patchy hair loss conditions."
      }
    ]
  }
};

export default function Services() {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background">
          <div className="container relative z-10 pt-20">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                JustHair Services
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                Our Hair Care Services
              </h1>
              <p className="text-muted-foreground">
                Comprehensive hair restoration and care treatments designed to address all types of hair loss and scalp conditions.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Description Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                At JustHair, we offer a complete range of hair restoration and care services. From surgical procedures to non-invasive treatments, our expert doctors provide personalized solutions for every type of hair loss concern.
              </p>
            </div>
          </div>
        </section>
        
        {/* Services Sections */}
        {Object.entries(servicesData).map(([key, category], categoryIndex) => {
          const isEven = categoryIndex % 2 === 0;
          
          return (
            <section key={key} className={`py-16 ${isEven ? 'bg-card' : ''}`}>
              <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    {category.icon}
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {category.items.map((item, index) => (
                    <div 
                      key={index} 
                      className="glass-card p-6 rounded-xl text-center animate-fade-in"
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/services/${key}#${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <Button className="btn-primary" asChild>
                    <Link to={`/book?service=${key}`}>
                      Book Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          );
        })}
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-sea-light/20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Hair Restoration Journey?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a consultation with our expert doctors to discuss the best treatment options for your specific needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="btn-primary" asChild>
                <Link to="/book">Book Appointment</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/doctors">View Doctors</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}