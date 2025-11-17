'use client';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

export default function FloorPlanAccordion({ floorPlanItem, isOpen, onToggle, children }) {
  const panelRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (isOpen && panelRef.current) {
      setMaxHeight(panelRef.current.scrollHeight + 'px');
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen, floorPlanItem.answer]);

  return (
    <div className={`p-4 rounded-lg bg-primary/10 ${isOpen && 'ring-2 ring-primary'}`}>
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between text-left">
        <h5 className={`md:text-lg font-semibold ${isOpen ? 'text-primary' : ''}`}>{floorPlanItem.unitName}</h5>
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
        {children}
        {/* <TextComponent itemObj={floorPlanItem.answer} className="faq pt-2" /> */}
      </div>
    </div>
  );
}
