import React from "react";
import WhatsAppIcon from "./WhatsAppIcon";

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phoneNumber = "https://wa.link/ktufqz",
  message = "Hello! I would like more information about your services.",
  className = "",
}) => {
  const handleClick = () => {
    // For WhatsApp Web, we'll use the provided wa.link URL
    window.open(phoneNumber, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className={`
        fixed bottom-6 right-6 z-50
        bg-green-500 hover:bg-green-600
        text-white
        p-4
        rounded-full
        shadow-lg
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:shadow-xl
        focus:outline-none focus:ring-4 focus:ring-green-500/30
        active:scale-95
        ${className}
      `}
      aria-label="Contact us on WhatsApp"
      title="Contact us on WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6" />
    </button>
  );
};

export default FloatingWhatsAppButton;
