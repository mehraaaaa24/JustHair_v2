import { useState } from "react";
import { Check, CalendarIcon, MapPin, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BookingForm() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [preferredDate, setPreferredDate] = useState<Date>();
  const [city, setCity] = useState("");
  const [specialization, setSpecialization] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!preferredDate || !city) {
      return; // Required fields validation
    }
    
    const params = new URLSearchParams();
    
    params.append('date', preferredDate.toISOString().split('T')[0]);
    params.append('city', city);
    if (specialization && specialization !== "All Specializations") {
      params.append('specialization', specialization);
    }
    
    navigate(`/doctors?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="glass-card p-6 space-y-6 animate-fade-in [animation-delay:200ms]"
    >
      <h3 className="text-2xl font-bold text-center mb-6">{t.bookingForm.title}</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t.bookingForm.checkIn} *
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-card",
                  !preferredDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {preferredDate ? format(preferredDate, "PPP") : <span>{t.bookingForm.selectDate}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={preferredDate}
                onSelect={setPreferredDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            City *
          </label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Cities">All Cities</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Chennai">Chennai</SelectItem>
              <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              <SelectItem value="Pune">Pune</SelectItem>
              <SelectItem value="Kolkata">Kolkata</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Specialization
          </label>
          <Select value={specialization} onValueChange={setSpecialization}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Select specialization (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Specializations">All Specializations</SelectItem>
              <SelectItem value="Hair Transplant Specialist">Hair Transplant Specialist</SelectItem>
              <SelectItem value="Dermatologist">Dermatologist</SelectItem>
              <SelectItem value="Trichologist">Trichologist</SelectItem>
              <SelectItem value="Cosmetic Surgeon">Cosmetic Surgeon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button type="submit" className="w-full btn-primary relative">
        <Stethoscope className="mr-2 h-4 w-4" />
        {t.bookingForm.checkAvailability}
      </Button>
    </form>
  );
}