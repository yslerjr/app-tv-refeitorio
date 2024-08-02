import React, { useState } from 'react';

export default function Upload({ setRefetch }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('video', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      setIsLoading(false);
      setRefetch((prev: any) => !prev);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg">Upload de Vídeo</h2>
      <form onSubmit={handleUpload}>
        <div className="flex items-center gap-4">
          <input type="file" onChange={handleFileChange} />
          <button
            disabled={isLoading}
            className="bg-slate-800 rounded-md p-2 disabled:opacity-50"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
