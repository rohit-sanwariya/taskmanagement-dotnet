import React, { ChangeEvent, useRef, useState } from 'react';
import   { AxiosError } from 'axios';
import { uploadFile } from '@/services/fileService';
import { Input } from '../ui/input';

interface FileUploadProps {
  containerName: string;
  onUploadComplete: (uri: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ containerName, onUploadComplete }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0] || uploading) return;

    setUploading(true);
    setError(null);

    try {
      const response = await uploadFile(event.target.files[0], containerName);

      onUploadComplete(response.data.uri);
      setUploading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setUploading(false);
    }
  };
 

  return (
    <div>
      <Input type="file" ref={fileRef} onChange={handleUpload} disabled={uploading} />
      {uploading && <span>Uploading...</span>}
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

export default FileUpload;
