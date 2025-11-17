'use client';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import TextComponent from './TextComponent';

export default function TailwindAccordion({ faqItem, isOpen, onToggle }) {
  const panelRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (isOpen && panelRef.current) {
      setMaxHeight(panelRef.current.scrollHeight + 'px');
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen, faqItem.answer]);

  return (
    <div className={`p-4 rounded-lg bg-primary/5 ring-1 ring-primary/20 ${isOpen && 'ring-2 ring-primary/70'}`}>
      <button type="button" onClick={onToggle} className="flex gap-x-4 w-full items-center justify-between text-left">
        <h5 className={`${isOpen ? 'text-primary-900' : ''}`}>{faqItem.question}</h5>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        ref={panelRef}
        style={{ maxHeight, transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)', overflow: 'hidden' }}
        className={`relative`}
      >
        <TextComponent itemObj={faqItem.answer} className="faq pt-2" />
      </div>
    </div>
  );
}
