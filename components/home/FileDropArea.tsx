import { DragEvent, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { TbDragDrop } from 'react-icons/tb';
import FileUploadButton from './FileUploadButton';

export default function FileDropArea({
  uploadFile,
}: {
  uploadFile: (f: File | null) => void;
}) {
  const [drag, setDrag] = useState<boolean>(false);

  const allowDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setDrag(true);
  };

  const dragLeave = () => {
    setDrag(false);
  };

  const dropHandler = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      const item = ev.dataTransfer.items[0];
      if (item.kind == 'file' && item.type.split('/')[0] == 'image') {
        const file = item.getAsFile();
        setDrag(false);
        uploadFile(file);
      }
    }
  };

  return (
    <div
      className={`border-2 w-full h-96 rounded-lg flex items-center justify-center ${
        drag ? 'border-neutral-600' : 'border-neutral-800'
      }`}
      onDrop={dropHandler}
      onDragOver={allowDrop}
      onDragLeave={dragLeave}
    >
      <div className='flex flex-col space-y-4 justify-center items-center'>
        <FileUploadButton uploadFile={uploadFile} />

        <span className='text-neutral-500 font-bold text-md'>or</span>

        <div className='flex justify-center items-center space-x-2'>
          <TbDragDrop className='text-lg' />
          <span className='text-sm'>Drop an image</span>
        </div>
      </div>
    </div>
  );
}
