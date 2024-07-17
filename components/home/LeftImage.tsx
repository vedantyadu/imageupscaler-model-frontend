import { ReactCompareSliderImage } from 'react-compare-slider';

export default function LeftImage({ inputimage }: { inputimage: string }) {
  return (
    <div className='relative h-full w-full'>
      <div className='flex justify-center items-center bg-neutral-100 text-neutral-950 rounded-full absolute top-1 left-1 py-1 px-2 w-24'>
        <span className='font-bold'>Input</span>
      </div>
      <ReactCompareSliderImage
        className='h-auto w-auto max-h-[512px]'
        src={inputimage}
        alt='Original'
      />
    </div>
  );
}
