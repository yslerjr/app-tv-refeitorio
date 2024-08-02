import { prisma } from '@/lib/prisma';

export default async function handler(req: any, res: any) {
  const response = await prisma.video.findMany({
    orderBy:{
      dayOfWeek: 'asc',
    }
  });

  res.status(200).json(response);
}
