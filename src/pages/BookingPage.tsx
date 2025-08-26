import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Star, Clock, User, Calendar, Phone, Mail, Stethoscope, ArrowRight } from "lucide-react";
import { DoctorProps } from "@/components/DoctorCard";

// Sample doctor data - in a real app this would come from an API
const sampleDoctors: DoctorProps[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    specialization: "Hair Transplant Specialist",
    description: "Expert in FUE and FUT procedures with over 15 years of experience.",
    consultationFee: 1500,
    experience: 15,
    rating: 4.8,
    totalReviews: 245,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop",
    location: "Sector 14, Gurgaon",
    city: "Delhi",
    procedures: ["FUE", "FUT", "PRP", "Consultation"],
    languages: ["English", "Hindi"],
    availability: "Mon-Sat"
  },
  {
    id: "2", 
    name: "Dr. Priya Sharma",
    specialization: "Dermatologist",
    description: "Specializing in female hair loss and comprehensive scalp treatments.",
    consultationFee: 1200,
    experience: 12,
    rating: 4.9,
    totalReviews: 189,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    procedures: ["Female Hair Loss", "PRP", "Scalp Treatment", "Trichology"],
    languages: ["English", "Hindi", "Marathi"],
    availability: "Mon-Fri"
  }
];

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [doctor, setDoctor] = useState<DoctorProps | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    notes: "",
    selectedService: "",
    appointmentDate: "",
    appointmentTime: "",
    consultationType: "clinic"
  });

  const doctorId = searchParams.get("doctorId");

  useEffect(() => {
    if (doctorId) {
      // Find doctor by ID
      const foundDoctor = sampleDoctors.find(d => d.id === doctorId);
      setDoctor(foundDoctor || null);
    }
  }, [doctorId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.email || !formData.appointmentDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Appointment Confirmed!",
      description: `Your appointment with ${doctor?.name} has been scheduled for ${formData.appointmentDate}.`
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!doctorId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="container max-w-md text-center">
            <div className="glass-card p-8 rounded-xl">
              <Stethoscope className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Please choose a doctor to continue</h1>
              <p className="text-muted-foreground mb-6">
                You need to select a doctor before booking an appointment.
              </p>
              <Button asChild className="btn-primary">
                <Link to="/doctors">
                  Browse Doctors <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="container max-w-md text-center">
            <div className="glass-card p-8 rounded-xl">
              <h1 className="text-2xl font-bold mb-4">Doctor not found</h1>
              <p className="text-muted-foreground mb-6">
                The doctor you're looking for doesn't exist.
              </p>
              <Button asChild className="btn-primary">
                <Link to="/doctors">Browse Doctors</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Doctor Summary Card */}
              <div className="lg:order-2">
                <Card className="sticky top-24 glass-card">
                  <CardHeader>
                    <CardTitle className="text-center">Appointment Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-primary">{doctor.specialization}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-2" />
                        <span>{doctor.rating} ({doctor.totalReviews} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>{doctor.experience} years experience</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>{doctor.totalReviews} consultations</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>{doctor.city}</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Consultation Fee</span>
                        <span className="text-lg font-bold text-primary">₹{doctor.consultationFee}</span>
                      </div>
                      {formData.selectedService && (
                        <div className="flex justify-between items-center mt-2">
                          <span>Service</span>
                          <span>{formData.selectedService}</span>
                        </div>
                      )}
                      {formData.appointmentDate && (
                        <div className="flex justify-between items-center mt-2">
                          <span>Date</span>
                          <span>{formData.appointmentDate}</span>
                        </div>
                      )}
                      {formData.appointmentTime && (
                        <div className="flex justify-between items-center mt-2">
                          <span>Time</span>
                          <span>{formData.appointmentTime}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Form */}
              <div className="lg:col-span-2 lg:order-1">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Appointment with {doctor.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <Input
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Phone Number *
                          </label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            City
                          </label>
                          <Input
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            placeholder="Your city"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Select Service
                          </label>
                          <Select value={formData.selectedService} onValueChange={(value) => handleInputChange("selectedService", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {doctor.procedures.map((procedure) => (
                                <SelectItem key={procedure} value={procedure}>
                                  {procedure}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Consultation Type
                          </label>
                          <Select value={formData.consultationType} onValueChange={(value) => handleInputChange("consultationType", value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clinic">In-Clinic Visit</SelectItem>
                              <SelectItem value="virtual">Video Consultation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Preferred Date *
                          </label>
                          <Input
                            type="date"
                            value={formData.appointmentDate}
                            onChange={(e) => handleInputChange("appointmentDate", e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Preferred Time
                          </label>
                          <Select value={formData.appointmentTime} onValueChange={(value) => handleInputChange("appointmentTime", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">09:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="14:00">02:00 PM</SelectItem>
                              <SelectItem value="15:00">03:00 PM</SelectItem>
                              <SelectItem value="16:00">04:00 PM</SelectItem>
                              <SelectItem value="17:00">05:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Additional Notes
                        </label>
                        <Textarea
                          value={formData.notes}
                          onChange={(e) => handleInputChange("notes", e.target.value)}
                          placeholder="Any specific concerns or additional information..."
                          rows={4}
                        />
                      </div>

                      <Button type="submit" className="w-full btn-primary" size="lg">
                        <Calendar className="mr-2 h-4 w-4" />
                        Confirm Appointment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}