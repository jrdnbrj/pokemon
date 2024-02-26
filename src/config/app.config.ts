export const AppConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3002,
    mongodb: process.env.MONGO_DB_URI,
    defaultLimit: process.env.DEFAULT_LIMIT || 7,
});
