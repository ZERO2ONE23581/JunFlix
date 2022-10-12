import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../../src/libs/server/prisma_client';
import withHandler from '../../../../../src/libs/server/withHandler';
import { withApiSession } from '../../../../../src/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const inputs = req.body;
  const { user } = req.session;
  const { user_id } = req.query;
  const isMatchQuery = Boolean(user?.id === +user_id);
  if (!user) return res.json({ ok: false, error: 'must login.' });
  if (!inputs) return res.json({ ok: false, error: 'input missed.' });
  if (!user_id) return res.json({ ok: false, error: 'query missed.' });
  if (!isMatchQuery) return res.json({ ok: false, error: 'invalid query.' });

  const email = inputs.email;
  const found = await client.user.findUnique({
    where: { email },
    select: { id: true },
  });
  const isExists = Boolean(found?.id !== +user_id);
  if (isExists) return res.json({ ok: false, error: 'already in use email.' });

  const isPassed = Boolean(
    await client.user.update({
      where: { id: +user_id },
      data: {
        email,
        name: inputs.name,
        birth: inputs.birth,
        gender: inputs.gender,
        location: inputs.location,
        username: inputs.username,
      },
    })
  );
  if (!isPassed) return res.json({ ok: false, error: 'update failed.' });
  return res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ['POST'], handler }));
