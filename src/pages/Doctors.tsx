import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorCard, { DoctorProps } from "@/components/DoctorCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample doctors data
const allDoctors: DoctorProps[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialization: "Hair Transplant Surgeon",
    description: "Leading hair restoration specialist with over 12 years of experience in FUE and FUT procedures.",
    consultationFee: 1500,
    experience: 12,
    rating: 4.8,
    totalReviews: 320,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    location: "Koramangala",
    city: "Bangalore",
    procedures: ["FUE", "FUT", "PRP", "Beard Transplant"],
    languages: ["English", "Hindi", "Kannada"],
    availability: "Mon-Sat 10AM-6PM"
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialization: "Trichologist",
    description: "Expert in non-surgical hair treatments and scalp disorders with advanced training in trichology.",
    consultationFee: 1000,
    experience: 8,
    rating: 4.6,
    totalReviews: 180,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
    location: "Indiranagar",
    city: "Bangalore",
    procedures: ["PRP", "GFC", "Mesotherapy", "Laser Therapy"],
    languages: ["English", "Hindi", "Tamil"],
    availability: "Tue-Sun 9AM-7PM"
  },
  {
    id: "3",
    name: "Dr. Anita Patel",
    specialization: "Dermatologist",
    description: "Board-certified dermatologist specializing in hair and scalp conditions with focus on female pattern baldness.",
    consultationFee: 800,
    experience: 10,
    rating: 4.7,
    totalReviews: 250,
    image: "https://images.unsplash.com/photo-1594824694996-f962c29fdfaf?w=400&h=400&fit=crop",
    location: "HSR Layout",
    city: "Bangalore",
    procedures: ["Female Hair Restoration", "Alopecia Treatment", "Hormonal Hair Loss"],
    languages: ["English", "Hindi", "Gujarati"],
    availability: "Mon-Fri 11AM-5PM"
  },
  {
    id: "4",
    name: "Dr. Vikram Singh",
    specialization: "Hair Transplant Surgeon",
    description: "International trained surgeon specializing in advanced hair restoration techniques and celebrity treatments.",
    consultationFee: 2500,
    experience: 15,
    rating: 4.9,
    totalReviews: 150,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    location: "Bandra",
    city: "Mumbai",
    procedures: ["Advanced FUE", "Robotic Hair Transplant", "Eyebrow Transplant"],
    languages: ["English", "Hindi", "Punjabi"],
    availability: "Mon-Sat 12PM-8PM"
  },
  {
    id: "5",
    name: "Dr. Meera Jain",
    specialization: "Cosmetic Surgeon",
    description: "Experienced cosmetic surgeon offering comprehensive hair restoration and scalp treatments.",
    consultationFee: 1200,
    experience: 9,
    rating: 4.5,
    totalReviews: 95,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    location: "Connaught Place",
    city: "Delhi",
    procedures: ["SMP", "Hair Tattooing", "Scalp Reduction"],
    languages: ["English", "Hindi"],
    availability: "Wed-Mon 10AM-6PM"
  },
  {
    id: "6",
    name: "Dr. Arjun Reddy",
    specialization: "Trichologist",
    description: "Young and dynamic trichologist known for innovative non-surgical treatments and personalized care.",
    consultationFee: 900,
    experience: 6,
    rating: 4.4,
    totalReviews: 120,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
    location: "Jubilee Hills",
    city: "Hyderabad",
    procedures: ["Low Level Laser", "Platelet Rich Fibrin", "Micro-needling"],
    languages: ["English", "Telugu", "Hindi"],
    availability: "Tue-Sat 9AM-6PM"
  }
];

export default function Doctors() {
  const { t } = useLanguage();
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorProps[]>(allDoctors);
  const [specializationFilter, setSpecializationFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [feeRange, setFeeRange] = useState<number[]>([500, 2500]);
  const [experienceFilter, setExperienceFilter] = useState<string>("all");
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = allDoctors;
    
    // Filter by specialization
    if (specializationFilter !== "all") {
      result = result.filter(doctor => doctor.specialization === specializationFilter);
    }
    
    // Filter by city
    if (cityFilter !== "all") {
      result = result.filter(doctor => doctor.city === cityFilter);
    }
    
    // Filter by consultation fee range
    result = result.filter(doctor => 
      doctor.consultationFee >= feeRange[0] && doctor.consultationFee <= feeRange[1]
    );
    
    // Filter by experience
    if (experienceFilter !== "all") {
      const experience = parseInt(experienceFilter);
      result = result.filter(doctor => doctor.experience >= experience);
    }
    
    setFilteredDoctors(result);
  }, [specializationFilter, cityFilter, feeRange, experienceFilter]);
  
  // Get unique values for filters
  const specializations = ["all", ...new Set(allDoctors.map(doctor => doctor.specialization))];
  const cities = ["all", ...new Set(allDoctors.map(doctor => doctor.city))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Our Expert Doctors
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Find and book appointments with trusted hair care specialists across India.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10">
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute top-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {/* Specialization Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Specialization
                </label>
                <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    {specializations.filter(spec => spec !== "all").map(specialization => (
                      <SelectItem key={specialization} value={specialization}>{specialization}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  City
                </label>
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.filter(city => city !== "all").map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Experience
                </label>
                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Experience</SelectItem>
                    <SelectItem value="5">5+ years</SelectItem>
                    <SelectItem value="10">10+ years</SelectItem>
                    <SelectItem value="15">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Fee Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Consultation Fee: ₹{feeRange[0]} - ₹{feeRange[1]}
                </label>
                <Slider
                  defaultValue={[500, 2500]}
                  min={500}
                  max={3000}
                  step={100}
                  value={feeRange}
                  onValueChange={setFeeRange}
                  className="my-4"
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 animate-fade-in [animation-delay:200ms]">
              <p className="text-muted-foreground">
                Showing {filteredDoctors.length} of {allDoctors.length} doctors
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSpecializationFilter("all");
                  setCityFilter("all");
                  setFeeRange([500, 2500]);
                  setExperienceFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </section>
        
        {/* Doctors Grid */}
        <section className="section">
          <div className="container">
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map((doctor, index) => (
                  <div key={doctor.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                    <DoctorCard doctor={doctor} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <h3 className="text-xl font-semibold mb-2">No doctors match your filters</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filter criteria to see more options.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSpecializationFilter("all");
                    setCityFilter("all");
                    setFeeRange([500, 2500]);
                    setExperienceFilter("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}