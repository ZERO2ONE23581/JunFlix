import { withIronSessionApiRoute } from 'iron-session/next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
      userId: string;
    };
  }
}

const cookie = {
  cookieName: 'junflix_cookie',
  password: process.env.COOKIE_PASSWORD!,
};

export function withApiSession(withHandler: any) {
  return withIronSessionApiRoute(withHandler, cookie);
}
