import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'hono/jwt';

export const AUTH_COOKIE_NAME = 'auth_token';
const JWT_ALG = 'HS256';
const JWT_EXPIRES_IN_SEC = 60 * 60 * 24 * 7; // 7 days

const DEV_SECRET = 'dev-insecure-secret-change-me';

export function getSecret(): string {
  const secret = process.env.AUTH_JWT_SECRET || DEV_SECRET;
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.AUTH_JWT_SECRET || process.env.AUTH_JWT_SECRET === DEV_SECRET) {
      console.error('AUTH_JWT_SECRET must be set to a secure value in production (e.g. from a secret manager).');
      process.exit(1);
    }
  } else if (!process.env.AUTH_JWT_SECRET) {
    console.warn('Warning: AUTH_JWT_SECRET is not set. Using an insecure default (local dev only).');
  }
  return secret;
}

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

export async function signAuthToken(input: { userId: string; username: string }) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: input.userId,
    username: input.username,
    iat: now,
    exp: now + JWT_EXPIRES_IN_SEC,
  };
  return sign(payload, getSecret(), JWT_ALG);
}

/** Optional auth: get token from cookie or Bearer header and verify. Returns null if missing/invalid. */
export async function getAuthFromToken(token: string | undefined) {
  if (!token) return null;
  try {
    const payload = await verify(token, getSecret(), JWT_ALG);
    const userId = payload.sub;
    const username = payload.username;
    if (!userId || typeof userId !== 'string') return null;
    if (!username || typeof username !== 'string') return null;
    return { userId, username };
  } catch {
    return null;
  }
}

/** Get token from request: cookie first, then Authorization Bearer. */
export function getTokenFromRequest(cookie: string | undefined, authHeader: string | undefined) {
  if (cookie) return cookie;
  if (!authHeader) return undefined;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match?.[1];
}
