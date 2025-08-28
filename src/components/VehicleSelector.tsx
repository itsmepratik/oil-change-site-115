import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { VEHICLE_BRANDS, VEHICLE_YEARS, VehicleBrand } from "@/config/vehicles";

interface VehicleSelectorProps {
  onVehicleSelect: (vehicle: string) => void;
  initialValue?: string;
}

export const VehicleSelector = ({ onVehicleSelect, initialValue }: VehicleSelectorProps) => {
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [displayValue, setDisplayValue] = useState<string>(initialValue || "");
  const [step, setStep] = useState<number>(1); // 1: brand, 2: model, 3: year

  const selectedBrand = VEHICLE_BRANDS.find(b => b.id === brand);

  const handleBrandSelect = (value: string) => {
    setBrand(value);
    setModel("");
    setYear("");
    setStep(2);
  };

  const handleModelSelect = (value: string) => {
    setModel(value);
    setYear("");
    setStep(3);
  };

  const handleYearSelect = (value: string) => {
    setYear(value);
    const brandName = VEHICLE_BRANDS.find(b => b.id === brand)?.name || "";
    const modelName = selectedBrand?.models.find(m => m.id === model)?.name || "";
    const vehicleString = `${brandName} ${modelName} ${value}`;
    setDisplayValue(vehicleString);
    onVehicleSelect(vehicleString);
    setStep(1); // Reset to brand selection for next use
  };

  const resetSelection = () => {
    setBrand("");
    setModel("");
    setYear("");
    setDisplayValue("");
    onVehicleSelect("");
    setStep(1);
  };

  return (
    <div className="space-y-3">
      {displayValue ? (
        <div className="flex items-center justify-between glass border border-white/20 bg-white/5 p-3 rounded-md">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-primary" />
            <span>{displayValue}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetSelection}
            className="text-xs h-6 px-2"
          >
            Change
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Car className="w-4 h-4 text-primary" />
            <span>Vehicle Information</span>
          </div>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="brand"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Select value={brand} onValueChange={handleBrandSelect}>
                  <SelectTrigger className="glass border-white/20 bg-white/5 text-white w-full">
                    <SelectValue placeholder="Select vehicle brand" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/20 bg-[#0A0A0A] text-white max-h-60">
                    {VEHICLE_BRANDS.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {step === 2 && selectedBrand && (
              <motion.div
                key="model"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Selected brand: {selectedBrand.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setStep(1)}
                    className="text-xs h-6 px-2"
                  >
                    Back
                  </Button>
                </div>
                <Select value={model} onValueChange={handleModelSelect}>
                  <SelectTrigger className="glass border-white/20 bg-white/5 text-white w-full">
                    <SelectValue placeholder="Select vehicle model" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/20 bg-[#0A0A0A] text-white max-h-60">
                    {selectedBrand.models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {step === 3 && selectedBrand && (
              <motion.div
                key="year"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {selectedBrand.name} {selectedBrand.models.find(m => m.id === model)?.name}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setStep(2)}
                    className="text-xs h-6 px-2"
                  >
                    Back
                  </Button>
                </div>
                <Select value={year} onValueChange={handleYearSelect}>
                  <SelectTrigger className="glass border-white/20 bg-white/5 text-white w-full">
                    <SelectValue placeholder="Select vehicle year" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/20 bg-[#0A0A0A] text-white max-h-60">
                    {VEHICLE_YEARS.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};