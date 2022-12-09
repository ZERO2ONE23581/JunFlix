import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../src/libs/server/prisma_client';
import withHandler from '../../../src/libs/server/withHandler';
import { withApiSession } from '../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { user_id, title, description, genre, posts } = req.body;
  const isInputs = Boolean(user_id && title);
  const isHost = Boolean(user?.id === user_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!isHost) return res.json({ ok: false, error: 'invalid host.' });
  if (!isInputs) return res.json({ ok: false, error: 'miss_input' });
  //
  const UpdatePosts = Boolean(posts.length > 0);
  if (UpdatePosts) {
    const newBoard = await client.board.create({
      data: { title, host: { connect: { id: user_id } } },
    });

    const isUpdated = Boolean(
      posts.map(
        async (id: number) =>
          await client.post.update({
            where: { id },
            data: { board_id: newBoard.id },
          })
      )
    );
    return res.json({ ok: isUpdated });
  }
  const board = await client.board.create({
    data: {
      title,
      genre,
      description,
      host: { connect: { id: user_id } },
    },
  });
  //
  return res.json({ ok: true, board });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
