import { prisma } from '@/lib/prisma';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import path from 'path';
const handler = nc();


handler.delete((req: NextApiRequest, res: NextApiResponse) => {
  const { videoName } = req.query;

    const fileName = path.basename(videoName as string);
    const videoPath = path.join(process.cwd(), 'public/videos', fileName);

    
    if (fs.existsSync(videoPath)) {
      fs.unlink(videoPath, async (err) => {
        if (err) {
          res.status(500).json({ message: 'Error deleting the video', error: err });
        } else {

          await prisma.video.delete({
            where: {
              url: String(fileName),
            },
          })
          res.status(200).json({ message: 'Video deleted successfully' });
        }
      });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
