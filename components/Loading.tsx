import Image from 'next/image';

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center">
      <div className="relative w-48">
        <Image
          src="/puff.svg"
          layout="fill"
          objectFit="contain"
          alt="loading animation"
        />
      </div>
    </div>
  );
};

export default Loading;
