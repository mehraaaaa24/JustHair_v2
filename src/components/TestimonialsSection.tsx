import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
  id: number;
  name: string;
  city: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rohit S.",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Exceptional care from start to finish. The graft density and hairline design exceeded expectations.",
    rating: 5
  },
  {
    id: 2,
    name: "Priya M.",
    city: "Delhi",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face",
    content: "Dr. Kumar's expertise and the clinic's support made my hair restoration journey smooth and successful.",
    rating: 5
  },
  {
    id: 3,
    name: "Arjun K.",
    city: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Amazing results with PRP therapy. My hair feels thicker and healthier than it has in years.",
    rating: 5
  },
  {
    id: 4,
    name: "Sneha R.",
    city: "Chennai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "The personalized treatment plan and follow-up care were outstanding. Highly recommend JustHair.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section bg-gradient-to-b from-background to-card relative overflow-hidden">
      {/* Decorative background dots */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-primary rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-primary rounded-full"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            What Our Patients Say
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 relative">
            What Our Patients Say
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </h2>
          <p className="text-muted-foreground">
            {t.testimonials.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main testimonial card */}
          <div 
            className={`glass-card p-8 md:p-12 rounded-2xl transform transition-all duration-300 ${
              isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
            }`}
            onMouseEnter={() => clearInterval}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg md:text-xl font-medium mb-4 leading-relaxed">
                  "{testimonials[activeIndex].content}"
                </blockquote>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-semibold text-primary">
                    {testimonials[activeIndex].name}
                  </span>
                  <span className="text-muted-foreground">
                    {testimonials[activeIndex].city}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsAnimating(false), 300);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-primary scale-110'
                    : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}