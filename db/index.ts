
import mongoose from 'mongoose';
const config = require('../config/');

require('./models/portfolio');
require('./models/project');

exports.connect = () => {
    // console.log("URI:",config.DB_URI);
    return mongoose.connect(config.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }, (err) => {
        if (err){
                console.log(err)
        }
        else {
                console.log("Connected to DB");
        }
    })
}
