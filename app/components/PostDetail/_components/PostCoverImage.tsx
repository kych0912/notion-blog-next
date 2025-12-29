import Image from 'next/image';

export default function PostCoverImage({ coverImg }: { coverImg: string }) {
  const imageSrc = coverImg ? coverImg : '/Default_Image.jpeg';

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
