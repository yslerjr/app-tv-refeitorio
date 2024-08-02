import React, { useEffect, useState } from 'react';
import Upload from './upload';

export default function Listagem() {
  const [videos, setVideos] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('/api/videos');
      const data = await res.json();
      setVideos(data);

      console.log(data);
    };

    fetchVideos();
  }, [refetch]);

  const handleDelete = async (videoName: any) => {
    const res = await fetch(`/api/videos/remove?videoName=${videoName}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (res.ok) {
      setVideos(videos.filter((video) => video !== videoName));
    } else {
      console.error(data.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col gap-12">
        <div className="flex item-center justify-between">
          <h2 className="text-xl">Listagem de Vídeos</h2>
          <Upload setRefetch={setRefetch} />
        </div>
        {videos.length ? (
          <div className="grid grid-cols-4 gap-4">
            {videos.map((video: any) => (
              <div key={video} className="flex flex-col gap-2">
                <video src={video} loop={false} controls />
                <button
                  className="bg-red-500 px-2 w-fit rounded-sm hover:bg-red-700"
                  onClick={() => setConfirmDelete(video)}
                >
                  Excluir
                </button>
                {confirmDelete === video && (
                  <div>Tem certeza que quer excluir este video?</div>
                )}
                {confirmDelete === video && (
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-red-500 px-2 w-fit rounded-sm hover:bg-red-700"
                      onClick={() => handleDelete(video)}
                    >
                      Sim, remover
                    </button>
                    <button
                      className="bg-zinc-800 px-2 w-fit rounded-sm hover:bg-zinc-900"
                      onClick={() => setConfirmDelete('')}
                    >
                      Não, cancelar!
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>Não há vídeos para exibir</div>
        )}
      </div>
    </div>
  );
}
