/**
 * Created by taolin-pc on 1/17/15.
 */

var mongoose = require( 'mongoose' );

var deviceSchema = new mongoose.Schema({
    device_name: {type: String, required: true},
    device_id: {type: String, required: true},
    device_type: {type: String, required: true},
    vendor: {type: String},
    place_name: {type: String, required: true},
    created_time: {type: Date, required: true},
    status: {type: String, required: true}
});

mongoose.model('Device', deviceSchema);