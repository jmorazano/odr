const production = {
  host: process.env.IP,
  port: process.env.PORT,
  dbUrl: process.env.MONGODB_URI,
  useMocks: false,
};

const development = {
  host: 'localhost',
  port: 3300,
  dbUrl: 'mongodb://localhost:27017/odr',
  useMocks: true,
  envVariables: true,
};

const exportConfig = process.env.NODE_ENV === 'production' ? production : development;

module.exports = exportConfig;
