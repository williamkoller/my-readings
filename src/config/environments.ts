type EnvironmentType = {
  nodeEnv: string;
  appUrl: string;
  port: number;
  secret: string;
  expiresIn: string;
  defaultStrategy: string;
  property: string;
  session: string;
  mongoUri: string;
};

export const environments = (): EnvironmentType => {
  return {
    nodeEnv: process.env.NODE_ENV,
    appUrl: process.env.APP_URL,
    port: Number(process.env.PORT),
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    defaultStrategy: process.env.DEFAULT_STRATEGY,
    property: process.env.PROPERTY_USER,
    session: process.env.SESSION,
    mongoUri: process.env.MONGODB_URI,
  };
};

export default {
  folderPath: '.env',
};
