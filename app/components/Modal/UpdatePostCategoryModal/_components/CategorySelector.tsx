import { useState, type ChangeEvent } from 'react';
import { Check, Plus, Search } from 'lucide-react';

import { Input } from '@/app/components/shared/input';
import { Button } from '@/app/components/shared/button';
import { Badge } from '@/app/components/shared/badge';
import { ScrollArea } from '@/app/components/shared/scroll-area';
import { Spinner } from '@/app/components/shared/spinner';
import { cn } from '@/app/utils/utils';

import { useCategorySelector, type Category } from '../_hooks/useCategorySelector';

interface CategorySelectorProps {
  id: string;
  categories: Category[];
  selectedCategoryId: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategorySelector({
  id,
  categories,
  selectedCategoryId,
  onCategorySelect,
}: CategorySelectorProps) {
  const [search, setSearch] = useState('');
  const { createMutation, postCategoriesQuery, filteredCategories, showCreateNew } =
    useCategorySelector({
      postId: id,
      categories,
      search,
    });

  const { mutate: createCategory, isPending: isCreatingCategory } = createMutation;
  const { data: currentCategory, isLoading: isLoadingCurrentCategory } = postCategoriesQuery;

  if (isLoadingCurrentCategory) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
        <span className="ml-2 text-sm text-muted-foreground">카테고리 불러오는 중...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Current Category Display */}
      {currentCategory && (
        <div className="rounded-md bg-muted p-3">
          <p className="text-sm font-medium text-muted-foreground mb-1">현재 카테고리</p>
          <Badge variant="default">{currentCategory.category.name}</Badge>
        </div>
      )}

      <div>
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="카테고리 검색 또는 새로 만들기..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Create New Button */}
        {showCreateNew && (
          <Button
            type="button"
            variant="outline"
            className="w-full mt-2"
            disabled={isCreatingCategory}
            onClick={() => {
              createCategory(search.trim());
            }}
          >
            {isCreatingCategory ? (
              <>
                <Spinner className="mr-2" />
                생성 중...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />"{search}" 카테고리 만들기
              </>
            )}
          </Button>
        )}
      </div>

      {/* Category List */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">카테고리 선택</p>
        <ScrollArea className="h-[240px] rounded-md border">
          <div className="p-2 space-y-1">
            {filteredCategories.length === 0 && !showCreateNew ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                검색 결과가 없습니다
              </div>
            ) : (
              filteredCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategorySelect(category.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-md text-left transition-colors',
                    'hover:bg-accent',
                    selectedCategoryId === category.id &&
                      'bg-primary text-primary-foreground hover:bg-primary/90',
                  )}
                >
                  <span className="font-medium">{category.name}</span>
                  {selectedCategoryId === category.id && <Check className="h-4 w-4" />}
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground">
        카테고리를 선택하거나 새로운 카테고리를 만들 수 있습니다.
      </p>
    </div>
  );
}
