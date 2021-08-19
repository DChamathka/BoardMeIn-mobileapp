const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    address:{
        type:String

    },
    email:{
        type:String

    },
    phone:{
        type:String

    },
    city:{
        type:String

    },
    country:{
        type:String

    },
    order_id:{
        type:String,
    },
    items:{
        type:String
    },
    currency:{
        type:String
    },
    amount:{
        type:String
    },
});

module.exports = mongoose.model('Payment',PaymentSchema)