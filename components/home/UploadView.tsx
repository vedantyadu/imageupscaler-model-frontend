import { axiosbackend } from '@/app/utils/axios';
import { Dispatch, DragEvent, useContext, useState } from 'react';
import MenuButton from './MenuButton';
import {
  UpscaleContext,
  UpscaleContextType,
  views,
} from '../../app/(navbar)/(protected)/page';
import { AxiosError } from 'axios';
import { MdErrorOutline } from 'react-icons/md';
import FileDropArea from './FileDropArea';
import Loader from '@/app/utils/Loader';

export enum available_model {
  SRGAN = 'SRGAN',
  SRCNN = 'SRCNN',
}

export default function UploadView() {
  const { setInputimage, setUpscaledimage, setView, curmodel } = useContext(
    UpscaleContext
  ) as UpscaleContextType;

  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async (file: File | null) => {
    if (file) {
      const formData = new FormData();
      setInputimage(URL.createObjectURL(file));
      formData.append('file', file);

      try {
        setLoading(true);
        const res = await axiosbackend.post(
          `/api/upscale/${curmodel}`,
          formData,
          { responseType: 'blob' }
        );
        setUpscaledimage(URL.createObjectURL(res.data));
        setView(views.RESULT);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data.message);
        }
      }
      setLoading(false);
    }
  };

  if (!loading) {
    return (
      <>
        <div className='flex w-full space-x-2 justify-center items-end'>
          <MenuButton
            model={available_model.SRGAN}
            recommended={true}
            text='SRGAN (4x)'
          />
          <MenuButton
            model={available_model.SRCNN}
            recommended={false}
            text='SRCNN (2x)'
          />
        </div>

        {error && (
          <div className='flex justify-center items-center space-x-4 py-2 px-4 border border-red-500 rounded-md'>
            <MdErrorOutline className='text-red-500 text-lg' />
            <span className='text-red-500'>{error}</span>
          </div>
        )}

        <FileDropArea uploadFile={uploadFile} />
      </>
    );
  } else {
    return (
      <div className='mt-20'>
        <Loader />
      </div>
    );
  }
}
