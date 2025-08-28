import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Droplets, Settings } from "lucide-react";
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
import { VehicleSelector } from "@/components/VehicleSelector";
import { OilSelector } from "@/components/OilSelector";
import { FilterQualitySelector } from "@/components/FilterQualitySelector";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fixedServiceType?: string | null;
  isFleetService?: boolean;
}

const BookingDialog = ({ open, onOpenChange, fixedServiceType, isFleetService }: BookingDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicleModel: "",
    preferredOil: "",
    filterQuality: "",
    serviceType: fixedServiceType || "",
    notes: ""
  });
  const { toast } = useToast();
  const { t } = useLanguage();

  // Update form data when fixedServiceType changes
  useEffect(() => {
    if (fixedServiceType) {
      setFormData(prev => ({ ...prev, serviceType: fixedServiceType }));
    }
  }, [fixedServiceType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || 
        (!formData.serviceType && !fixedServiceType) ||
        (!isFleetService && (!formData.vehicleModel))) {
      toast({
        title: t('booking.missingInfo'),
        description: t('booking.fillFields'),
        variant: "destructive",
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: t('booking.confirmed'),
      description: t('booking.contactShortly'),
    });

    // Reset form and close dialog
    setFormData({
      name: "",
      phone: "",
      vehicleModel: "",
      preferredOil: "",
      filterQuality: "",
      serviceType: fixedServiceType || "",
      notes: ""
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto border border-white/20 bg-[#0A0A0A] text-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gradient">
            {isFleetService ? t('booking.title') : "Get a Quote"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isFleetService ? t('booking.subtitle') : "Request a quote for our professional services"}
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
                {t('booking.fullName')} {t('booking.required')}
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
                {t('booking.phoneNumber')} {t('booking.required')}
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

          {/* Vehicle Information - Only for non-Fleet services */}
          {!isFleetService && (
            <div className="space-y-2">
              <VehicleSelector 
                onVehicleSelect={(vehicle) => handleInputChange("vehicleModel", vehicle)}
                initialValue={formData.vehicleModel}
              />
            </div>
          )}

          {/* Oil and Filter Selection - Only for non-Fleet services */}
          {!isFleetService && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <OilSelector 
                  onOilSelect={(oil) => handleInputChange("preferredOil", oil)}
                  initialValue={formData.preferredOil}
                />
              </div>
              <div className="space-y-2">
                <FilterQualitySelector 
                  onFilterSelect={(filter) => handleInputChange("filterQuality", filter)}
                  initialValue={formData.filterQuality}
                />
              </div>
            </div>
          )}

          {/* Service Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {t('booking.serviceType')} {fixedServiceType ? "" : t('booking.required')}
            </Label>
            {fixedServiceType ? (
              <div className="glass border-white/20 bg-white/5 text-white p-3 rounded-md">
                {fixedServiceType}
              </div>
            ) : (
              <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                <SelectTrigger className="glass border-white/20 bg-white/5 text-white">
                  <SelectValue placeholder={t('booking.selectService')} />
                </SelectTrigger>
                <SelectContent className="glass border-white/20 bg-[#0A0A0A] text-white">
                  <SelectItem value="basic">{t('pricing.basic.name')} ({t('pricing.basic.price')})</SelectItem>
                  <SelectItem value="premium">{t('pricing.premium.name')} ({t('pricing.premium.price')})</SelectItem>
                  <SelectItem value="custom">{t('pricing.fleet.name')} ({t('pricing.fleet.price')})</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              {t('booking.additionalNotes')}
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder={t('booking.notesPlaceholder')}
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
              {isFleetService ? "Book a Call" : "Get Quote"}
            </Button>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;