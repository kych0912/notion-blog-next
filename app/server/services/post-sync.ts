import type { ExtendedRecordMap } from 'notion-types';

import { extractNotionMetadata } from '@/app/lib/notion-metadata';
import type { PostType } from '@/app/server/db/schema';
import { updatePostMetadata } from '@/app/server/queries/post';

export async function syncPostMetadata(post: PostType, recordMap: ExtendedRecordMap) {
  const metadata = extractNotionMetadata(recordMap, post.id, process.env.DEFAULT_IMAGE ?? '');
  const changed =
    metadata.title !== (post.title ?? '') ||
    metadata.image !== (post.image ?? '') ||
    metadata.description !== (post.description ?? '');
  if (!changed) return { changed: false, post };

  const updatedPost = await updatePostMetadata(post.id, post.authorId, metadata);
  if (!updatedPost) throw new Error('Post no longer exists');
  return { changed: true, post: updatedPost };
}
