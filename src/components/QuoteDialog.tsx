import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Car, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
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

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preSelectedService?: string;
}

const QuoteDialog = ({ open, onOpenChange, preSelectedService }: QuoteDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicleModel: "",
    serviceType: preSelectedService || "",
    notes: ""
  });
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.vehicleModel || !formData.serviceType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate quote submission
    toast({
      title: "Quote Request Submitted",
      description: "We'll send you a detailed quote within 24 hours",
    });

    // Reset form and close dialog
    setFormData({
      name: "",
      phone: "",
      vehicleModel: "",
      serviceType: preSelectedService || "",
      notes: ""
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto border border-white/20 bg-[#0A0A0A] text-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gradient">
            Get a Quote
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tell us about your vehicle and we'll provide you with a detailed quote
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
                Full Name <span className="text-red-400">*</span>
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
                Phone Number <span className="text-red-400">*</span>
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
              Vehicle Model <span className="text-red-400">*</span>
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
              Service Type <span className="text-red-400">*</span>
            </Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
              <SelectTrigger className="glass border-white/20 bg-white/5 text-white">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="glass border-white/20 bg-[#0A0A0A] text-white">
                <SelectItem value="basic">{t('pricing.basic.name')} ({t('pricing.basic.price')})</SelectItem>
                <SelectItem value="premium">{t('pricing.premium.name')} ({t('pricing.premium.price')})</SelectItem>
                <SelectItem value="fleet">{t('pricing.fleet.name')} ({t('pricing.fleet.price')})</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Additional Requirements
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Tell us about any specific requirements or questions you have..."
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
              Get Quote
            </Button>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;