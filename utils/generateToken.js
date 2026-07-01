import jwt from 'jsonwebtoken';

const generateToken = (payload, expiresIn = "7days") => {
  
    const secret = process.env.JWT_SECRET;
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in your .env file');
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};

export default generateToken;