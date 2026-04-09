import "@dotenvx/dotenvx/config";

export default new Pool({
    connectionString: process.env.DATABASE_URL,
});