import { useState, useEffect } from "react";
import * as React from "react";
import { motion } from "framer-motion";
import { User, Phone, MapPin } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";

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
    preferredOil: "",
    filterQuality: "",
    serviceType: preSelectedService || "",
    notes: ""
  });

  // Update service type when preSelectedService changes
  React.useEffect(() => {
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, serviceType: preSelectedService }));
    }
  }, [preSelectedService]);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.vehicleModel || !formData.serviceType) {
      toast({
        title: t('booking.missingInfo'),
        description: t('booking.fillFields'),
        variant: "destructive",
      });
      return;
    }

    try {
      // Send email notification
      const { data, error } = await supabase.functions.invoke('send-booking-email', {
        body: {
          type: 'quote',
          name: formData.name,
          phone: formData.phone,
          vehicleModel: formData.vehicleModel,
          preferredOil: formData.preferredOil,
          filterQuality: formData.filterQuality,
          serviceType: formData.serviceType,
          notes: formData.notes
        }
      });

      if (error) {
        console.error('Error sending quote email:', error);
        toast({
          title: "Quote Request Received",
          description: "We'll send you a detailed quote within 24 hours",
        });
      } else {
        toast({
          title: "Quote Request Submitted",
          description: "We'll send you a detailed quote within 24 hours",
        });
      }

      // Reset form and close dialog
      setFormData({
        name: "",
        phone: "",
        vehicleModel: "",
        preferredOil: "",
        filterQuality: "",
        serviceType: preSelectedService || "",
        notes: ""
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Quote Request Received",
        description: "We'll send you a detailed quote within 24 hours",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto border border-white/20 bg-[#0A0A0A] text-white w-[95.5%] rounded-xl p-4 sm:p-6">
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

          {/* Vehicle Information */}
          <div className="space-y-2">
            <VehicleSelector 
              onVehicleSelect={(vehicle) => handleInputChange("vehicleModel", vehicle)}
              initialValue={formData.vehicleModel}
            />
          </div>

          {/* Oil and Filter Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <OilSelector 
                onOilSelect={(oil) => handleInputChange("preferredOil", oil)}
                initialValue={formData.preferredOil}
              />
            </div>
            <div>
              <FilterQualitySelector 
                onFilterSelect={(filter) => handleInputChange("filterQuality", filter)}
                initialValue={formData.filterQuality}
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {t('booking.serviceType')} {t('booking.required')}
            </Label>
            <div className="glass border-white/20 bg-white/5 text-white p-3 rounded-md">
              {preSelectedService === "basic" 
                ? `${t('pricing.basic.name')} (${t('pricing.basic.price')})`
                : preSelectedService === "premium" 
                ? `${t('pricing.premium.name')} (${t('pricing.premium.price')})`
                : preSelectedService}
            </div>
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
              Get Quote
            </Button>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;