const orderModelMongoose = require('mongoose');

const Schema = orderModelMongoose.Schema;
const ObjectId = Schema.ObjectId;

let OrderSchema = new Schema({
    shippingDetails: {},
    order: {},
    orderId: {},
    totalAmount: {},
}, {
    timestamps: true
});

OrderSchema.virtual('_orderId').get(function(){
    return this._id;
});


// Export the model
module.exports = orderModelMongoose.model('orders', OrderSchema);
