import { NextApiRequest, NextApiResponse } from 'next';
import upload from '../../../lib/upload';
import nc from 'next-connect';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const handler = nc();

handler.options(async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).end();
  return;
});

handler.use(upload.single('video'));

handler.post((req: NextApiRequest, res: NextApiResponse) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const tempPath = req.file.path;
  const ext = path.extname(req.file.originalname);
  const newFileName = `${uuidv4()}${ext}`;
  const newPath = path.join(req.file.destination, newFileName);

  fs.rename(tempPath, newPath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error renaming the file', details: err });
    }

    res.status(200).json({ data: 'success', file: newFileName });
  });
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};