import client from '../../../src/libs/server/prisma_client';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiSession } from '../../../src/libs/server/withSession';
import withHandler from '../../../src/libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCT_ID}/images/v2/direct_upload `,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
      }
    )
  ).json();
  return res.json({ ok: true, ...response.result });
}
export default withApiSession(
  withHandler({ methods: ['GET'], handler, isPrivate: false })
);
