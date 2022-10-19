import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../src/libs/server/prisma_client';
import withHandler from '../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //1. 새로운 포스트 이미지를 올리는경우 (기존이미지를 대체) // Boolean(post_image) === true
  //2. 포스트 이미지에 변화 안주는 경우 // Boolean(post_image) === false
  //3. 포스트 이미지를 삭제하는 경우 // post_image === 'delete_og'

  //1. 보드가 없는 상태에서 선택한 보드에 연결하는경우
  //2. 보드에 연결된 상태에서 선택한 보드로 바꿔 연결하는 경우
  //3. 보드에 연결안하고 기존의 quicksave (board_id === 0)에 계속 저장하는 경우
  //4. 기존의 보드와의 연결을 끊는 경우 // board_id === 0으로 바꿔줌

  const {
    title,
    description,
    hashtags,
    pageLink,
    post_image,
    fetch_type,
    board_id,
  } = req.body;
  const { user } = req.session;
  const { post_id } = req.query;
  console.log(post_id, post_image);
  return;
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!post_id) return res.json({ ok: false, error: 'query missed.' });

  //target post
  const target_post = await client.post.findUnique({
    where: { id: +post_id.toString() },
    select: { host_id: true, board_id: true, id: true },
  });
  if (!target_post) return res.json({ ok: false, error: 'no post found.' });
  if (!Boolean(target_post.host_id === user.id))
    return res.json({ ok: false, error: 'invalid host.' });

  //option1. skip update
  if (inputs.fetch_type === 'update_post_skip')
    return res.json({ ok: false, message: inputs.fetch_type });

  //option2. update board host only
  if (inputs.fetch_type === 'update_post') {
    const board_id = +inputs.board_id.toString();
    if (!board_id) return res.json({ ok: false, error: 'board_id missed.' });

    //find board
    const board = await client.board.findUnique({
      where: { id: board_id },
      select: { id: true, host_id: true },
    });

    //err handling
    if (!board) return res.json({ ok: false, error: 'no board found.' });
    if (!Boolean(board.host_id === user.id))
      return res.json({ ok: false, error: 'invalid board host.' });
    //update
    const isUpdate = Boolean(
      await client.post.update({
        where: { id: target_post.id },
        data: { board_id: board.id },
      })
    );
    if (!isUpdate) return res.json({ ok: false, error: 'update_post_fail.' });
    return res.json({ ok: isUpdate, message: inputs.fetch_type });
  }
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
