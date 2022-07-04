import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, review_id, comment_id } = req.query;
  const queryExists = Boolean(user_id && review_id && comment_id);
  if (!user) return res.json({ ok: false, error: 'login needed.' });
  if (!queryExists) return res.json({ ok: false, error: 'invalid query' });
  //
  const Target = await client.comment.findUnique({
    where: { id: +comment_id },
  });
  if (!Target) return res.json({ ok: false, error: 'no comment to delete' });
  await client.comment.delete({
    where: { id: Target.id },
  });
  //
  if (Target.ParentID === 0) {
    await client.comment.deleteMany({
      where: { ParentID: Target.id },
    });
  }
  if (Target.ParentID !== 0 && Target.ReplyID === Target.ParentID) {
    await client.comment.deleteMany({
      where: { ParentID: Target.ParentID },
    });
  }
  if (Target.ParentID !== 0 && Target.ReplyID !== Target.ParentID) {
    const Comments = await client.comment.findMany({
      where: { ParentID: Target.ParentID },
    });
    Comments.filter((value) => value.id > Target?.ReplyID!).map(
      async (value) =>
        await client.comment.deleteMany({
          where: { id: value.id },
        })
    );
  }
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
