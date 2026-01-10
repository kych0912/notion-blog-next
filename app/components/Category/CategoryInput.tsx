import OutsideClickHandler from 'react-outside-click-handler';
import { useState, useEffect, useCallback } from 'react';

import { Input } from '@/app/components/shared/input';
import { isEmptyOrWhitespace } from '@/app/utils/utils';

function CategoryItem({
  onClick,
  children,
}: {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        'inline-flex items-center cursor-pointer select-none',
        'h-6 rounded-xl px-3 text-xs',
        'bg-accent/40 text-primary',
        'mr-2 mb-2',
        'md:h-8 md:rounded-2xl md:px-4 md:text-base',
        'md:mr-3 md:mb-3',
      ].join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CategoryInput({
  onChange,
  categories: initialCategories,
}: {
  onChange: (categories: string[]) => void;
  categories: string[];
}) {
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [value, setValue] = useState('');

  useEffect(() => {
    onChange(categories);
  }, [categories, onChange]);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onOutsideClick = () => {
    if (value === '') return;
    insertTag(value);
  };

  const insertTag = useCallback(
    (category: string) => {
      setValue('');
      console.log(isEmptyOrWhitespace(category));
      if (isEmptyOrWhitespace(category) || categories.includes(category)) return;
      let processed = category.trim().slice(0, 255);
      if (processed.indexOf(' #') > 0) {
        const tempTags: string[] = [];
        const regex = /#(\S+)/g;
        let execArray: RegExpExecArray | null = null;
        while ((execArray = regex.exec(processed))) {
          if (execArray !== null) {
            tempTags.push(execArray[1]);
          }
        }
        setCategories([...categories, ...tempTags]);
        return;
      }
      if (processed.charAt(0) === '#') {
        processed = processed.slice(1, processed.length);
      }
      setCategories([...categories, processed]);
    },
    [categories],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.nativeEvent.isComposing) {
        return;
      }

      if (e.key === 'Backspace' && value === '') {
        setCategories(categories.slice(0, categories.length - 1));
        return;
      }

      const keys = [',', 'Enter'];
      if (keys.includes(e.key)) {
        // 등록
        e.preventDefault();
        console.log(value);
        insertTag(value);
      }
    },
    [insertTag, categories, value],
  );

  const onRemove = (category: string) => {
    const nextCategories = categories.filter((c) => c !== category);
    setCategories(nextCategories);
  };

  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <div className="flex flex-wrap text-foreground">
        {categories.map((category) => (
          <CategoryItem key={category} onClick={() => onRemove(category)}>
            {category}
          </CategoryItem>
        ))}
        <Input
          placeholder="카테고리를 입력하세요"
          tabIndex={2}
          onKeyDown={onKeyDown}
          onChange={onChangeInput}
          value={value}
        />
      </div>
    </OutsideClickHandler>
  );
}
