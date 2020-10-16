const customerModelMongoose = require('mongoose');

const Schema = customerModelMongoose.Schema;
const ObjectId = Schema.ObjectId;

let CustomerSchema = new Schema({
    customerId: Number,
    customerFirstName: String,
    title: String,
    customerLastName: String,
    imageurl: {},
    email: String,
    gender: String,
    profile: String,
    phone: Number,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipCode: Number,
    country: String,
}, {
    timestamps: true
});

CustomerSchema.virtual('_customerId').get(function(){
    return this._id;
});


// Export the model
module.exports = customerModelMongoose.model('customers', CustomerSchema);
