require('dotenv').config()


module.exports = {
    DB_URI:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@portfolio-main.nzgnc.mongodb.net/portfolioDB?retryWrites=true&w=majority`,
    AUTH0_NAMESPACE:`https://porfolio-tumo.com`
}