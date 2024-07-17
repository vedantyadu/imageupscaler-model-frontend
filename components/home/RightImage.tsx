import { ReactCompareSliderImage } from 'react-compare-slider';

export default function RightImage({ inputimage }: { inputimage: string }) {
  return (
    <div className='relative'>
      <div className='flex justify-center items-center bg-neutral-100 text-neutral-950 rounded-full absolute top-1 right-1 py-1 px-2 w-24'>
        <span className='font-bold'>Upscaled</span>
      </div>
      <ReactCompareSliderImage
        className='h-auto w-auto max-h-[512px]'
        src={inputimage}
        alt='Upscaled'
      />
    </div>
  );
}
