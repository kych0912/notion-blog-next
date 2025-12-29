'use client';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

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
            className={cn(
              'mr-1 rounded-sm border transition duration-500',
              selectedTab === index ? 'bg-primary border-primary' : 'bg-transparent border-border',
            )}
            onClick={() => handleTabChange(index)}
          >
            <span
              className={cn(
                'block px-2 py-1 text-base',
                selectedTab === index ? 'text-primary-foreground' : 'text-foreground',
              )}
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
