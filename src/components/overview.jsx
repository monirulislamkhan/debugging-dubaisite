'use client';
import TextComponent from '@/components/TextComponent';
import { faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

export default function Overview({ overviewshortObj = false, overviewDesc }) {
  const [overview, setOverview] = useState(true);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (!overview && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight + 'px');
    } else {
      setMaxHeight('0px');
    }
  }, [overview, overviewDesc]);

  return (
    <>
      <TextComponent itemObj={overviewshortObj} className="relative text-editor" />
      <div
        ref={contentRef}
        style={{ maxHeight, transition: 'max-height .5s cubic-bezier(0.4,0,0.2,1)', overflow: 'hidden' }}
        className="text-editor more"
      >
        <TextComponent itemObj={overviewDesc} />
      </div>
      <button className="link font-semibold mt-2" onClick={() => setOverview(!overview)}>
        <FontAwesomeIcon icon={overview ? faChevronDown : faChevronUp} /> {overview ? 'Show More' : ' Show Less'}
      </button>
    </>
  );
}
