const categoryModelMongoose = require('mongoose');

const Schema = categoryModelMongoose.Schema;
const ObjectId = Schema.ObjectId;

let CategorySchema = new Schema({
    id: Number,
    name: String,
    description: String,
    src: String
}, {
    timestamps: true
});

CategorySchema.virtual('categoryId').get(function(){
    return this._id;
});


// Export the model
module.exports = categoryModelMongoose.model('categories', CategorySchema);
