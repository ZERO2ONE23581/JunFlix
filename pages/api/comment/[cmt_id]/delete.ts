import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { cmt_id } = req.query;
  if (!user) return res.json({ ok: false, error: 'must login' });
  if (!cmt_id) return res.json({ ok: false, error: 'query missed' });

  const comment = await client.comment.findUnique({
    where: { id: +cmt_id.toString() },
  });
  if (!comment) return res.json({ ok: false, error: 'no comment found' });

  const isParent = Boolean(
    await client.comment.findUnique({ where: { id: comment.reply_id } })
  );
  if (!isParent) {
    const isDeleted = Boolean(
      await client.comment.delete({ where: { id: comment.id } })
    );
    return res.json({ ok: isDeleted });
  } else return res.json({ ok: false });
}
export default withApiSession(withHandler({ methods: ['GET'], handler }));
