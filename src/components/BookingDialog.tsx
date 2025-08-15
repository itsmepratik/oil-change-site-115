import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Car, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingDialog = ({ open, onOpenChange }: BookingDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicleModel: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    notes: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.vehicleModel || !formData.serviceType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: "Booking Confirmed!",
      description: "We'll contact you shortly to confirm your appointment.",
    });

    // Reset form and close dialog
    setFormData({
      name: "",
      phone: "",
      vehicleModel: "",
      serviceType: "",
      preferredDate: "",
      preferredTime: "",
      notes: ""
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] glass border-white/20 bg-[#0A0A0A]/95 backdrop-blur-xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gradient">
            Book Your Service
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Schedule your professional oil change service in Saham
          </DialogDescription>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-4 mt-4"
        >
          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+968 XX XXX XXX"
                className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-2">
            <Label htmlFor="vehicle" className="text-sm font-medium flex items-center gap-2">
              <Car className="w-4 h-4 text-primary" />
              Vehicle Make & Model *
            </Label>
            <Input
              id="vehicle"
              value={formData.vehicleModel}
              onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
              placeholder="e.g., Toyota Camry 2020"
              className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400"
              required
            />
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Service Type *
            </Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
              <SelectTrigger className="glass border-white/20 bg-white/5 text-white">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent className="glass border-white/20 bg-[#0A0A0A] text-white">
                <SelectItem value="basic">Basic Service (25 OMR)</SelectItem>
                <SelectItem value="premium">Premium Service (45 OMR)</SelectItem>
                <SelectItem value="custom">Custom Service (Contact for quote)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Preferred Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                className="glass border-white/20 bg-white/5 text-white"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Preferred Time
              </Label>
              <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
                <SelectTrigger className="glass border-white/20 bg-white/5 text-white">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="glass border-white/20 bg-[#0A0A0A] text-white">
                  <SelectItem value="8:00">8:00 AM</SelectItem>
                  <SelectItem value="9:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="13:00">1:00 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                  <SelectItem value="17:00">5:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any special requests or additional services needed..."
              className="glass border-white/20 bg-white/5 text-white placeholder:text-gray-400 min-h-[80px]"
            />
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="pt-4"
          >
            <Button
              type="submit"
              className="w-full button-gradient text-white font-medium"
              size="lg"
            >
              Confirm Booking
            </Button>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;