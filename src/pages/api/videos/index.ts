// pages/api/videos.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const videosDirectory = path.join(process.cwd(), 'public/videos');
  const filenames = fs.readdirSync(videosDirectory);
  const videos = filenames.map(name => path.join('/videos', name));
  res.status(200).json(videos);
}
