import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';
import replies from '../post/[post_id]/comment/[og_id]/replies';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { post_id, cmt_id } = req.body;
  if (!user) return res.json({ ok: false, error: 'must login' });
  if (!Boolean(post_id && cmt_id))
    return res.json({ ok: false, error: 'input missed' });

  const post = await client.post.findUnique({
    where: { id: +post_id.toString() },
  });
  if (!post) return res.json({ ok: false, error: 'no post found' });

  const target = await client.comment.findUnique({
    where: { id: +cmt_id.toString() },
  });
  if (!target) return res.json({ ok: false, error: 'no comment found' });

  const isPostMatch = Boolean(post.id === target.post_id);
  if (!isPostMatch) return res.json({ ok: false, error: 'invalid post' });

  //IF DELETE OG
  const isOG = Boolean(!target.og_id && !target.reply_id);
  if (isOG) {
    const isRepsDeleted = Boolean(
      await client.comment.deleteMany({ where: { og_id: target.id } })
    );
    const isDeleted = Boolean(
      await client.comment.delete({ where: { id: target.id } })
    );
    return res.json({ ok: isRepsDeleted && isDeleted });
  } else {
    const isRepsDeleted = Boolean(
      await client.comment.deleteMany({ where: { reply_id: target.id } })
    );
    const isDeleted = Boolean(
      await client.comment.delete({ where: { id: target.id } })
    );
    return res.json({ ok: isRepsDeleted && isDeleted });
  }
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
