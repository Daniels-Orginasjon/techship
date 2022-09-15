import Iron from '@hapi/iron';

export async function createLoginSession(session: any, secret: string) {
  const createdAt = Date.now();
  const obj = { ...session, createdAt };
  console.log(secret);
  const token = await Iron.seal(obj, secret, Iron.defaults);
  return token;
}

export async function getLoginSession(token: string, secret: string) {
  const session = await Iron.unseal(token, secret, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  if (session.maxAge && Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  return session;
}
