import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FILTER_QUALITY_OPTIONS } from "@/config/oils";

interface FilterQualitySelectorProps {
  onFilterSelect: (filter: string) => void;
  initialValue?: string;
}

export const FilterQualitySelector = ({ onFilterSelect, initialValue }: FilterQualitySelectorProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(initialValue || "");
  const [displayValue, setDisplayValue] = useState<string>(initialValue || "");

  const handleFilterSelect = (value: string) => {
    setSelectedFilter(value);
    const filterName = FILTER_QUALITY_OPTIONS.find(f => f.id === value)?.name || "";
    setDisplayValue(filterName);
    onFilterSelect(filterName);
  };

  const resetSelection = () => {
    setSelectedFilter("");
    setDisplayValue("");
    onFilterSelect("");
  };

  return (
    <div className="space-y-3">
      {displayValue ? (
        <div className="flex items-center justify-between glass border border-white/20 bg-white/5 p-3 rounded-md">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
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
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Settings className="w-4 h-4 text-primary" />
            <span>Preferred Filter Quality</span>
          </div>
          <Select value={selectedFilter} onValueChange={handleFilterSelect}>
            <SelectTrigger className="glass border-white/20 bg-white/5 text-white w-full">
              <SelectValue placeholder="Select filter quality" />
            </SelectTrigger>
            <SelectContent className="glass border-white/20 bg-[#0A0A0A] text-white">
              {FILTER_QUALITY_OPTIONS.map((filter) => (
                <SelectItem key={filter.id} value={filter.id}>
                  {filter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};