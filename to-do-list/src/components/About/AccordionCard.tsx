import React, { useState, ReactNode } from "react";

interface AccordionCardProps {
  title: string;
  children: ReactNode;
}

const AccordionCard = ({ title, children }: AccordionCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#2F2504] rounded-lg bg-[#F4F7F5] shadow-sm">
      <button
        className="w-full px-4 py-3 text-left text-[#372248] font-semibold hover:bg-[#e3e6e5] rounded-t-lg focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title}
      </button>
      {open && (
        <div className="px-4 py-3 text-[#5B85AA] border-t border-[#2F2504]">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionCard;
