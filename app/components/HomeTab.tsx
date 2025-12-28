'use client';
import React, { useState } from 'react';

const title = ['Home'];

const HomeTab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="flex w-full py-2">
      <div className="flex">
        {title.map((tab, index) => (
          <button
            key={index}
            type="button"
            className={[
              'tab mr-1 rounded-lg border border-gray-400 transition duration-500',
              selectedTab === index ? 'active' : '',
            ].join(' ')}
            onClick={() => handleTabChange(index)}
          >
            <span
              className={[
                'block px-2 py-1 text-base',
                selectedTab === index ? 'text-white' : 'text-black',
              ].join(' ')}
            >
              {tab}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeTab;
