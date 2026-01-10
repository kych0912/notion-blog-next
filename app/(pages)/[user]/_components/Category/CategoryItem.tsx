import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/app/components/shared/collapsible';
import { Button } from '@/app/components/shared/button';

import { CategoryPost } from './CategoryPost';

const categoryPosts = [
  {
    id: '1',
    title: 'Post 1',
  },
  {
    id: '2',
    title:
      '너무길게하면어떻게되는지확인용너무길게하면어떻게되는지확인용너무길게하면어떻게되는지확인용너무길게하면어떻게되는지확인용',
  },
  {
    id: '3',
    title: 'Post 3',
  },
];

export function CategoryItem({ name }: { name: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex flex-col gap-2 w-full">
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </h4>
          <Button variant="ghost" size="icon" className="size-8">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2">
        {categoryPosts.map((post) => (
          <CategoryPost key={post.id} title={post.title} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
