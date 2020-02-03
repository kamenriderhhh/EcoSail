const mongoose = require('mongoose'), Schema = mongoose.Schema;

const SubscriberSchema = mongoose.Schema({
   token: String,
   createDate: {
       type: Date,
       default: Date.now
   }
});

module.exports = mongoose.model('Subscribers', SubscriberSchema);