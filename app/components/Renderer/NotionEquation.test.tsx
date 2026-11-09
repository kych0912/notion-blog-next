import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';

import NotionEquation from './NotionEquation';

it('renders inline math as readable MathML without requiring a Notion block', () => {
  const html = renderToStaticMarkup(<NotionEquation math="x^2" inline />);

  expect(html).toContain('notion-equation-inline');
  expect(html).toContain('<annotation encoding="application/x-tex">x^2</annotation>');
  expect(html).not.toContain('katex-display');
});

it('keeps untrusted formula content from creating executable HTML or links', () => {
  const html = renderToStaticMarkup(<NotionEquation math={'\\href{javascript:alert(1)}{<script>alert(1)</script>}'} />);

  expect(html).not.toMatch(/href="javascript:/i);
  expect(html).not.toMatch(/<script\b/i);
});
