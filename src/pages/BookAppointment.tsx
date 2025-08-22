import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarIcon, User, CreditCard, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DoctorProps } from "@/components/DoctorCard";

// Sample doctors for booking
const doctorsData: DoctorProps[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialization: "Hair Transplant Surgeon", 
    description: "Leading hair restoration specialist",
    consultationFee: 1500,
    experience: 12,
    rating: 4.8,
    totalReviews: 320,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    location: "Koramangala",
    city: "Bangalore",
    procedures: ["FUE", "FUT", "PRP", "Beard Transplant"]
  }
];

export default function BookAppointment() {
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProps | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    notes: "",
    paymentMethod: "consultation"
  });
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingConfirmed(true);
    setTimeout(() => {
      setCurrentStep(1);
      setIsBookingConfirmed(false);
    }, 5000);
  };
  
  if (isBookingConfirmed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center p-8">
            <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Appointment Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Your appointment has been successfully booked. You'll receive a confirmation email shortly.
            </p>
            <Button asChild>
              <Link to="/">Return to Homepage</Link>
            </Button>
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
        <section className="relative py-16 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Book Appointment
              </h1>
              <p className="text-muted-foreground text-lg">
                Complete your appointment booking in a few simple steps.
              </p>
            </div>
          </div>
        </section>
        
        <section className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  <div className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Preferred Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {appointmentDate ? format(appointmentDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={appointmentDate}
                              onSelect={setAppointmentDate}
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Service</Label>
                        <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consultation">General Consultation</SelectItem>
                            <SelectItem value="hair-transplant">Hair Transplant</SelectItem>
                            <SelectItem value="prp">PRP Therapy</SelectItem>
                            <SelectItem value="smp">Scalp Micropigmentation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea 
                        id="notes" 
                        name="notes" 
                        placeholder="Any specific concerns or symptoms you'd like to discuss"
                        value={formData.notes}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full btn-primary">
                    Confirm Appointment
                  </Button>
                </form>
              </div>
              
              <div className="glass-card p-6 h-fit">
                <h3 className="text-lg font-semibold mb-4">Appointment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span>{formData.service || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{appointmentDate ? format(appointmentDate, "PPP") : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consultation Fee:</span>
                    <span>₹1,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}