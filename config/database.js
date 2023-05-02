import postgres from 'postgres';

const sql = postgres({
    database: 'CLA',
    user: 'postgres',
    password: 'Salinitas-p773'
});
export default sql;