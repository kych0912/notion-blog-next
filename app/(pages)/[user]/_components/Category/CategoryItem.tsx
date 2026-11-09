import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/app/components/shared/collapsible';
import type { CategoryType } from '@/app/server/db/schema';

import { CategoryPostList } from './CategoryPost';

export function CategoryItem({ category }: { category: CategoryType }) {
  const [isOpen, setIsOpen] = useState(false);
  const { name } = category;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="profile-category-item">
      <CollapsibleTrigger asChild>
        <button type="button" className="profile-category-trigger">
          <span className="profile-category-name">{name}</span>
          <span className="profile-category-icon" aria-hidden="true">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="profile-category-posts">
        <CategoryPostList categoryId={category.id} />
      </CollapsibleContent>
    </Collapsible>
  );
}
