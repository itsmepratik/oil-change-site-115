import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { OIL_BRANDS, OilBrand } from "@/config/oils";

interface OilSelectorProps {
  onOilSelect: (oil: string) => void;
  initialValue?: string;
}

export const OilSelector = ({ onOilSelect, initialValue }: OilSelectorProps) => {
  const [brand, setBrand] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [displayValue, setDisplayValue] = useState<string>(initialValue || "");
  const [step, setStep] = useState<number>(1); // 1: brand, 2: grade

  const selectedBrand = OIL_BRANDS.find(b => b.id === brand);

  const handleBrandSelect = (value: string) => {
    setBrand(value);
    setGrade("");
    setStep(2);
  };

  const handleGradeSelect = (value: string) => {
    setGrade(value);
    const brandName = OIL_BRANDS.find(b => b.id === brand)?.name || "";
    const gradeName = selectedBrand?.grades.find(g => g.id === value)?.name || "";
    const oilString = `${brandName} ${gradeName}`;
    setDisplayValue(oilString);
    onOilSelect(oilString);
    setStep(1); // Reset to brand selection for next use
  };

  const resetSelection = () => {
    setBrand("");
    setGrade("");
    setDisplayValue("");
    onOilSelect("");
    setStep(1);
  };

  return (
    <div className="space-y-3">
      {displayValue ? (
        <div className="flex items-center justify-between glass border border-white/20 bg-white/5 p-3 rounded-md">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-primary" />
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
            <Droplets className="w-4 h-4 text-primary" />
            <span>Preferred Oil</span>
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
                    <SelectValue placeholder="Select oil brand" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/20 bg-[#0A0A0A] text-white max-h-60">
                    {OIL_BRANDS.map((brand) => (
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
                key="grade"
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
                <Select value={grade} onValueChange={handleGradeSelect}>
                  <SelectTrigger className="glass border-white/20 bg-white/5 text-white w-full">
                    <SelectValue placeholder="Select oil grade" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/20 bg-[#0A0A0A] text-white max-h-60">
                    {selectedBrand.grades.map((grade) => (
                      <SelectItem key={grade.id} value={grade.id}>
                        {grade.name} - {grade.description}
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