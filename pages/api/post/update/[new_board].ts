import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { posts } = req.body;
  const { new_board } = req.query;
  const { user } = req.session;
  const isPost = Boolean(posts.length > 0);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!new_board) return res.json({ ok: false, error: 'query missed.' });
  if (!isPost) return res.json({ ok: false, error: 'no posts selected.' });

  const board = await client.board.findUnique({
    where: { id: +new_board.toString() },
  });
  if (!board) return res.json({ ok: false, error: 'no board found.' });
  if (board.host_id !== user.id)
    return res.json({ ok: false, error: 'invalid board host.' });

  const isUpdated = Boolean(
    posts.map(
      async (id: number) =>
        await client.post.update({
          where: { id },
          data: { board_id: board.id },
        })
    )
  );
  return res.json({ ok: isUpdated });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
