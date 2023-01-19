require('dotenv').config();

const PORT = process.env.PORT;
const ELASTICS_SEARCH_CLIENT = process.env.ELASTICS_SEARCH_CLIENT;

module.exports = {
    PORT,
    ELASTICS_SEARCH_CLIENT,
}