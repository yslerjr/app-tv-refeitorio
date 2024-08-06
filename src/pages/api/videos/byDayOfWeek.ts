import { prisma } from '@/lib/prisma';

const getDayOfWeek = () => {
  const today = new Date();
  return today.getDay();
};

export default async function handler(req: any, res: any) {
  const response = await prisma.video.findMany({
    where: {
      dayOfWeek: getDayOfWeek(),
    },
  });

  console.log(response)

  res.status(200).json(response);
}
