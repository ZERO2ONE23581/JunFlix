import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { comment_id } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!comment_id) return res.json({ ok: false, error: 'comment_id missed.' });

  //1. check if the comment exists
  const comment = await client.comment.findUnique({
    where: { id: +comment_id.toString() },
  });
  if (!comment) return res.json({ ok: false, error: 'no post found.' });

  //2. check if you have like data on this post
  const like = await client.like.findFirst({
    where: { comment_id: comment.id, host_id: user.id },
  });

  //3-1. delete like data if there is one
  if (like) {
    const isDeleted = Boolean(
      await client.like.delete({ where: { id: like.id } })
    );
    if (isDeleted) return res.json({ ok: isDeleted, message: 'deleted' });
  }
  //3-2. create like data if there is no one
  if (!like) {
    const isCreated = Boolean(
      await client.like.create({
        data: {
          host: { connect: { id: user.id } },
          comment: { connect: { id: comment.id } },
        },
      })
    );
    return res.json({ ok: isCreated, message: 'created' });
  }
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
