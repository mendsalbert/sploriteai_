import { Prompt } from '@/types/prompt';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import data from '../../../utils/prompt';
import { convertDataToObject } from '@/utils/helpers';
import { Dialog } from '@headlessui/react';
import { IconPhoto, IconPrompt, IconTrash, IconUpload } from '@tabler/icons-react';
import { useDropzone } from 'react-dropzone';

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 3MB in bytes

interface Props {
  onRunOCR: any;
  onClose: () => void;
}

export const FileUploadModal: FC<Props> = ({ onClose, onRunOCR }) => {
  const { t } = useTranslation('promptbar');

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const prompts = convertDataToObject(data);
  const [query, setQuery] = useState('');

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      //   onUpdatePrompt({ ...prompt, name, description, content: content.trim() });
      onClose();
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      window.removeEventListener('mouseup', handleMouseUp);
      onClose();
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onClose]);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const [file, setFile] = useState(null);
  const [src, setSrc] = useState('');
  //   console.log(src);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*' as any,
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles[0].size > MAX_FILE_SIZE) {
        alert('File size must be less than 3MB');
      } else {
        const reader = new FileReader();
        reader.onload = function (upload: ProgressEvent<FileReader>) {
          setSrc(upload?.target?.result as string);
        };
        reader.readAsDataURL(acceptedFiles[0]);
        setFile(acceptedFiles[0]);
      }
    },
  });

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    // handle file submission here
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className='fixed inset-0 bg-black/50' aria-hidden='true' />

      {/* Full-screen container to center the panel */}
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        {/* The actual dialog panel  */}
        <Dialog.Panel
          className='dark:bg-white- mx-auto h-[50%] w-[95%] overflow-scroll rounded-xl bg-[#0d131f] shadow-2xl sm:w-[40%]
        
        '
        >
          <input {...getInputProps()} />
          {file ? (
            <>
              <div className='flex h-full w-full  flex-col items-center justify-center border-0 outline-none ring-0'>
                <img src={URL.createObjectURL(file)} alt='preview' className='rounded-2xl' style={{ maxWidth: '400px', maxHeight: '400px' }} />
                {/* <IconTrash size={30} onClick={handleFileRemove} className='my-2 text-white' /> */}
                <div className='flex flex-row items-center space-x-4 py-3'>
                  <span onClick={handleFileRemove} className='flex cursor-pointer flex-row items-center justify-center  rounded-2xl bg-red-400 px-3 py-1 text-white'>
                    <IconTrash size={20} />
                    <span>Delete</span>
                  </span>
                  <span
                    onClick={() => {
                      setIsOpen(false);
                      onRunOCR(src);
                      // alert('working');
                    }}
                    className=' flex cursor-pointer flex-row items-center justify-center  rounded-2xl bg-cyan-600 px-3 py-1 text-white'
                  >
                    <IconUpload size={20} />
                    <span>Upload</span>
                  </span>
                </div>
              </div>
              {/* <p className='text-white'>Filename: {file.name}</p> */}
            </>
          ) : (
            <>
              <div {...getRootProps()} className='flex h-full w-full  flex-col items-center justify-center border-0 outline-none ring-0'>
                <span>
                  <IconPhoto size={100} className='mb-2' color='#3d90f0' />
                </span>
                <p className='text-center text-white'>
                  Drag and drop an image here, <br /> or click to select an image
                  <br />
                  <i>Ensure your image is not blurry for a better result</i>
                </p>
              </div>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
