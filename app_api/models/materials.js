/**
 * Created by taolin-pc on 1/21/15.
 */

var mongoose = require( 'mongoose' );

var materialSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sku: {type: String, required: true},
    order_number: {type: String, required: true},
    quantity: {type: Number},
    consumed: {type: Number},
    created_time: {type: Date, required: true},
    place_name: {type: String, required: true}
});

mongoose.model('Material', materialSchema);