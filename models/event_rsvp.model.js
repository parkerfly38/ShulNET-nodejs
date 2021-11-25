const { Schema } = require("mongoose");

module.exports = mongoose => { 
    var schema = new Schema({
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        address_line_1: { type: String, required: false },
        address_line_2: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        zip: { type: String, required: false },
        country: { type: String, required: false },
        phone: { type: String, required: false },
        cell: { type: String, required: false },
        cell_carrier: { type: String, required: false },
        sms_optout: { type: Boolean, default: false },
        email: { type: String, required: false }  
    });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const EventRsvp = mongoose("eventrsvp", schema);
    return EventRsvp;
};