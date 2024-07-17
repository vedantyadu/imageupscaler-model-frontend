import { Dispatch, useContext, useEffect, useState } from 'react';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';
import {
  UpscaleContext,
  UpscaleContextType,
  views,
} from '../../app/(navbar)/(protected)/page';
import { FiDownload } from 'react-icons/fi';
import { IoArrowBackOutline } from 'react-icons/io5';
import LeftImage from './LeftImage';
import RightImage from './RightImage';

export default function ResultView() {
  const { inputimage, upscaledimage, setView } = useContext(
    UpscaleContext
  ) as UpscaleContextType;

  const goBack = () => setView(views.UPLOAD);

  const download = () => {
    const link = document.createElement('a');
    link.href = upscaledimage as string;
    link.download = 'image-upscaled.png';
    link.click();
    link.remove();
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <ReactCompareSlider
        className='rounded-xl max-w-full h-[446px]'
        itemOne={<LeftImage inputimage={inputimage as string} />}
        itemTwo={<RightImage inputimage={upscaledimage as string} />}
      />
      <div className='w-full flex justify-center items-center mt-8 space-x-4'>
        <button
          onClick={goBack}
          className='flex min-w-0 max-w-40 flex-1 justify-center items-center border relative border-neutral-800 hover:bg-neutral-800 text-sm font-bold space-x-2 font-montserrat transition-colors px-4 py-2 rounded-md'
        >
          <IoArrowBackOutline />
          <span className='truncate'>Back</span>
        </button>
        <button
          onClick={download}
          className='flex min-w-0 max-w-40 flex-1 justify-center items-center border relative bg-purple-600 border-neutral-800 hover:bg-purple-700 text-sm font-bold space-x-2 font-montserrat transition-colors px-4 py-2 rounded-md'
        >
          <FiDownload />
          <span className='truncate'>Download</span>
        </button>
      </div>
    </div>
  );
}
