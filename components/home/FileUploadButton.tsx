import { FiUpload } from 'react-icons/fi';

export default function FileUploadButton({
  uploadFile,
}: {
  uploadFile: (f: File | null) => void;
}) {
  const selectimage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async () => {
      if (!input.files) return;
      uploadFile(input.files[0]);
    };

    input.remove();
  };

  return (
    <button
      onClick={selectimage}
      className='flex justify-center items-center space-x-2 text-sm font-medium font-montserrat transition-colors hover:bg-neutral-800 border border-neutral-800 px-4 py-2 rounded-md'
    >
      <FiUpload className='text-lg' />
      <span>Upload</span>
    </button>
  );
}
