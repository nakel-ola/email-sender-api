const config = {
  port: Number(process.env.PORT) || 4000,
  stmp_password: process.env.STMP_PASSWORD,
  stmp_email: process.env.STMP_EMAIL,
  mongodb_uri: process.env.MONGODB_URI,
};

export default config;
