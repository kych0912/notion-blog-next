'use client';

import { useQuery } from '@tanstack/react-query';

import { getUserPostCategoriesOptions } from '@/app/react-query/options/category';

import { CategoryItem } from './CategoryItem';

export function CollapsibleDemo({ userName }: { userName: string }) {
  const { data: categories } = useQuery(getUserPostCategoriesOptions(userName));

  if (!categories) return null;

  return (
    <div className="flex flex-col h-full justify-start gap-2 max-md:hidden w-[200px] shrink-0 pt-10">
      {categories.map((category) => (
        <CategoryItem key={category.id} name={category.name} />
      ))}
    </div>
  );
}
