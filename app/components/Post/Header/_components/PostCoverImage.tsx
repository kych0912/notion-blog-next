import Image from 'next/image';

import { normalizeNotionImageUrl } from '@/app/utils/NotionApi';

export default function PostCoverImage({ coverImg }: { coverImg: string }) {
  const imageSrc = coverImg ? normalizeNotionImageUrl(coverImg) : '/Default_Image.jpeg';

  return (
    <div className="post-cover">
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="(max-width: 720px) calc(100vw - 32px), 688px"
        loading="eager"
        fetchPriority="high"
        className="post-cover__image"
      />
    </div>
  );
}
