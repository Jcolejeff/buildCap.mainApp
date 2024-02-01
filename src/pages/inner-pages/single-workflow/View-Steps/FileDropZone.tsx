import { useDropzone } from 'react-dropzone';
import Icon from 'utils/Icon';
const FileDropzone = ({ onDrop, file }: any) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <section {...getRootProps()}>
      <input {...getInputProps()} />
      {file ? (
        <div className='flex border-spacing-3 items-center justify-center gap-3  rounded-lg border border-dashed py-4 hover:cursor-pointer'>
          <Icon name='uploadIcon' svgProp={{ className: 'w-12' }}></Icon>
          <p className='text-sm'>{file.name}</p>
        </div>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className='flex items-center justify-center gap-3 rounded-lg border py-4 hover:cursor-pointer'>
          <Icon name='uploadIcon' svgProp={{ className: 'w-12' }}></Icon>

          <p className='text-sm text-secondary-1'>
            Drag and drop your video file or,
            <span className='font-bold text-primary-1'> {'  '} browse</span>
          </p>
        </div>
      )}
    </section>
  );
};

export default FileDropzone;
