const DB_URI = (process.env.NODE_ENV === 'test')
    ? 'postgresql://paulo:P@ulo445@localhost:5432/express_auth_test'
    : 'postgresql://paulo:P@ulo445@localhost:5432/express_auth';

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
    DB_URI,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
};

