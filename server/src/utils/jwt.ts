import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
}

// Generate JWT token
export const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign(payload, secret, {
    expiresIn: '7d',
  } as jwt.SignOptions);
};

// Verify JWT token
export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.verify(token, secret) as TokenPayload;
};
