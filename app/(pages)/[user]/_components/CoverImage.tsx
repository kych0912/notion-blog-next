'use client';
import Image from 'next/image';

export default function CoverImage({ src }: { src: string }) {
  return (
    <div className="relative h-[30vh] w-full max-w-[1200px] rounded-none xl:rounded-[24px]">
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  );
}
