import type { ExtendedRecordMap } from 'notion-types';
import { getBlockValue, getPageTableOfContents, uuidToId } from 'notion-utils';

export interface ArticleHeading {
  id: string;
  title: string;
  level: number;
}

export interface ArticleHeadingGroup {
  heading: ArticleHeading;
  children: ArticleHeading[];
}

export interface ArticleNavigationState {
  activeId: string;
  expandedGroupId?: string | null;
}

export function getHeadingGroupId(groups: ArticleHeadingGroup[], id: string) {
  return (
    groups.find(
      ({ heading, children }) => heading.id === id || children.some((child) => child.id === id),
    )?.heading.id ??
    groups[0]?.heading.id ??
    ''
  );
}

export function updateActiveHeading(
  state: ArticleNavigationState,
  activeId: string,
  groups: ArticleHeadingGroup[],
): ArticleNavigationState {
  if (state.activeId === activeId) return state;
  return {
    activeId,
    expandedGroupId:
      getHeadingGroupId(groups, state.activeId) === getHeadingGroupId(groups, activeId)
        ? state.expandedGroupId
        : undefined,
  };
}

export function groupArticleHeadings(headings: ArticleHeading[]): ArticleHeadingGroup[] {
  const groups: ArticleHeadingGroup[] = [];
  const rootLevel = Math.min(...headings.map(({ level }) => level));
  for (const heading of headings) {
    if (!groups.length || heading.level === rootLevel) groups.push({ heading, children: [] });
    else groups[groups.length - 1].children.push(heading);
  }
  return groups;
}

export function getArticleHeadings(recordMap: ExtendedRecordMap): ArticleHeading[] {
  const page = getBlockValue(recordMap.block[Object.keys(recordMap.block)[0]]);
  if (!page || page.type !== 'page') return [];
  return getPageTableOfContents(page, recordMap)
    .filter((entry) => entry.text.trim())
    .map((entry) => ({ id: uuidToId(entry.id), title: entry.text, level: entry.indentLevel }));
}

export function readingProgress(top: number, height: number, viewport: number, offset = 80) {
  const distance = height - viewport + offset;
  if (distance <= 0) return top + height <= viewport ? 100 : 0;
  return Math.min(100, Math.max(0, ((offset - top) / distance) * 100));
}
