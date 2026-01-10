import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/app/components/shared/collapsible';
import { Button } from '@/app/components/shared/button';
import type { CategoryType } from '@/app/server/db/schema';

import { CategoryPostList } from './CategoryPost';

export function CategoryItem({ category }: { category: CategoryType }) {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = category;

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
        <CategoryPostList categoryId={category.id} />
      </CollapsibleContent>
    </Collapsible>
  );
}
