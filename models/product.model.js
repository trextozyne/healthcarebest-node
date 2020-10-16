const productModelMongoose = require('mongoose');

const Schema = productModelMongoose.Schema;
const ObjectId = Schema.ObjectId;

let ProductSchema = new Schema({
        id: Number,
        title: String,
        description: String,
        type: String,
        brand: String,
        collections: [],
        category: String,
        price: Number,
        sale: Boolean,
        discount: Number,
        stock: Number,
        new: Boolean,
        quantity: Number,
        tags: [],
        variants: [],
        images: [],
    }, {
        timestamps: true
    });

ProductSchema.virtual('productId').get(function(){
    return this._id;
});


// Export the model
module.exports = productModelMongoose.model('products', ProductSchema);
