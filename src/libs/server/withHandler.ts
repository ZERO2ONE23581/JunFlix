import { NextApiRequest, NextApiResponse } from 'next';

type method = 'GET' | 'POST';

export default function withHandler(
  methods: method[],
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as any))
      return res.status(405).end();
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
