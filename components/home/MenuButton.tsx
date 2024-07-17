import { useContext } from 'react';
import { available_model } from './UploadView';
import {
  UpscaleContext,
  UpscaleContextType,
} from '../../app/(navbar)/(protected)/page';

export default function MenuButton({
  model,
  recommended,
  text,
}: {
  model: available_model;
  recommended: boolean;
  text: string;
}) {
  const { curmodel, setCurmodel } = useContext(
    UpscaleContext
  ) as UpscaleContextType;
  const selectModel = () => setCurmodel(model);

  return (
    <div className='flex flex-col flex-1 max-w-36'>
      {recommended && (
        <div className='flex p-1 rounded-t-lg mb-1 items-center justify-center w-full min-w-0 space-x-2 transition-transform origin-bottom bg-purple-600'>
          <span className='truncate text-xs'>Recommended</span>
        </div>
      )}
      <button
        className={`${
          model == curmodel
            ? 'bg-neutral-100 text-neutral-950'
            : 'hover:bg-neutral-800 '
        } border relative border-neutral-800 text-sm font-bold font-montserrat transition-colors px-4 py-2 rounded-md`}
        onClick={selectModel}
      >
        {text}
      </button>
    </div>
  );
}
