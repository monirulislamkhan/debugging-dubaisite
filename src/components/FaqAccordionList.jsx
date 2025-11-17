'use client';
import { useState } from 'react';
import TailwindAccordion from './tailwind-accordion';

export default function FaqAccordionList({ faqList }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="flex flex-col gap-2">
      {faqList.map((faq, i) => (
        <TailwindAccordion key={faq.id} faqItem={faq} isOpen={openIndex === i} onToggle={() => handleToggle(i)} />
      ))}
    </div>
  );
}
