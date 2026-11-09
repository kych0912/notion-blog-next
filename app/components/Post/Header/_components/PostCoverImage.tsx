import Image from 'next/image';

import { normalizeNotionImageUrl } from '@/app/utils/NotionApi';

export default function PostCoverImage({ coverImg }: { coverImg: string }) {
  const imageSrc = coverImg ? normalizeNotionImageUrl(coverImg) : '/Default_Image.jpeg';

  return (
    <div className="relative h-[20rem] w-full">
      <Image
        src={imageSrc}
        alt="coverImg"
        fill
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          borderRadius: '1rem',
        }}
      />
    </div>
  );
}
