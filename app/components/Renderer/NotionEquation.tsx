'use client';

import { renderToString } from 'katex';
import type { Block } from 'notion-types';
import { getBlockTitle } from 'notion-utils';
import { useNotionContext } from 'react-notion-x';
import 'katex/dist/katex.min.css';

export default function NotionEquation({
  block,
  math,
  inline = false,
  className = '',
}: {
  block?: Block;
  math?: string;
  inline?: boolean;
  className?: string;
}) {
  const { recordMap } = useNotionContext();
  const expression = math || (block ? getBlockTitle(block, recordMap) : '');
  if (!expression) return null;

  return (
    <span
      className={`notion-equation ${inline ? 'notion-equation-inline' : 'notion-equation-block'} ${className}`}
      dangerouslySetInnerHTML={{
        __html: renderToString(expression, {
          displayMode: !inline,
          output: 'htmlAndMathml',
          throwOnError: false,
          strict: false,
          trust: false,
        }),
      }}
    />
  );
}
