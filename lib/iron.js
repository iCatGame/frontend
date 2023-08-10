export const ironOptions = {
  cookieName: 'siwe',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: process.env.NEXT_IRON_PASSWORD,
};