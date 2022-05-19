import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '../../../src/libs/server/withHandler';
import prismaClient from '../../../src/libs/server/prisma_client';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { title, intro, genre } = req.body;
  const noInput = !Boolean(title && intro && genre);
  //
  if (!user) return res.json({ ok: false, error: 'Not logged In!' });
  if (noInput) return res.json({ ok: false, error: 'No Input Data!' });

  const blog = await prismaClient.blog.create({
    data: {
      title,
      intro,
      genre,
      user: { connect: { id: user.id } },
    },
  });
  console.log(blog);
  return;
  //
  return res.json({ ok: true });
}
export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
