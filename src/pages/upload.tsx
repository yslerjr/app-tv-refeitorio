import React, { useState } from 'react';

export default function Upload({ setRefetch }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [dayOfWeek, setDayOfWeek] = useState('');

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('dayOfWeek', dayOfWeek);

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
          <select
            onChange={(e) => setDayOfWeek(e.target.value)}
            name="dayOfWeek"
            className="p-1 bg-zinc-900 rounded-md"
            required
          >
            <option value="">Selecione o dia da semana</option>
            <option value="0">Domingo</option>
            <option value="1">Segunda-feira</option>
            <option value="2">Terça-feira</option>
            <option value="3">Quarta-feira</option>
            <option value="4">Quinta-feira</option>
            <option value="5">Sexta-feira</option>
            <option value="6">Sábado</option>
          </select>
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
