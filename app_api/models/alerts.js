
var mongoose = require( 'mongoose' );

var alertSchema = new mongoose.Schema({
    alert_type: {type: String, required: true},
    place_name: {type: String, required: true},
    created_time: {type: Date, required: true},
    status: {type: String, required: true},
	reason:{type: String, required: true},
    details: {type: mongoose.Schema.Types.Mixed, required: true}
});

mongoose.model('Alert', alertSchema);
