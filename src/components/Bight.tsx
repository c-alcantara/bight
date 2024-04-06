import Image from 'next/image';

const Bight = () => {
  return (
      <Image
        src="/bight.svg"
        alt="bight"
        width={390} // Width in pixels
        height={130} // Height in pixels
        className="mt-16 relative w-390 h-130" // Apply shadow using Tailwind CSS 
      />
  );
}  

export default Bight;