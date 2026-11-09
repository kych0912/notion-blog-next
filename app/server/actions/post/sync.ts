'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { getPage } from '@/app/lib/notion-api';
import { getPostById } from '@/app/server/queries/post';
import { syncPostMetadata } from '@/app/server/services/post-sync';

export async function syncPostAction(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, message: '로그인이 필요합니다.' };

  const [post] = await getPostById(id);
  if (!post || post.authorId !== session.user.id) {
    return { ok: false, message: '작성자만 글을 동기화할 수 있습니다.' };
  }

  try {
    const result = await syncPostMetadata(post, await getPage(id));
    revalidatePath('/');
    revalidatePath(`/${encodeURIComponent(post.author)}`);
    revalidatePath(`/${encodeURIComponent(post.author)}/${id}`);
    revalidatePath('/search');
    return {
      ok: true,
      message: result.changed ? '글 정보를 업데이트했습니다.' : '이미 최신 글입니다.',
    };
  } catch {
    return { ok: false, message: 'Notion 페이지를 불러오지 못했습니다. 공개 설정을 확인해주세요.' };
  }
}
