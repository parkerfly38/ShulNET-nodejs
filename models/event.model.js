const { Schema } = require("mongoose");

module.exports = mongoose =>
{
    var event = new Schema({
        name: {type: String, required: true },
        tagline: { type: String, required: true },
        calendar_id: { type: String, required: true },
        starts: { type: Date, required: true },
        ends: { type: Date, required: true },
        start_registrations: { type: Date, required: true },
        early_bird_end: { type: Date, required: false },
        close_registration: { type: Date, required: true },
        created: { type: Date, default: Date.now },
        max_rsvps: { type: Number, default: 0 },
        members_only_rsvp: { type: Boolean, default: false },
        members_only_view: { type: Boolean, default: false },
        allow_guests: { type: Boolean, default: false },
        max_guests: { type: Number, default: 0 },
        description: { type: String, required: false },
        post_rsvp_message: { type: String, required: false },
        online: { type: Boolean, default: false },
        url: { type: String, required: false },
        location_name: { type: String, required: false },
        address_line_1: { type: String, required: false },
        address_line_2: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        zip: { type: String, required: false },
        country: { type: String, required: false },
        phone: { type: String, required: false },
        all_day: { type: Boolean, default: false },
        public: { type: Boolean, default: true },
        status: { type: Number, default: 0 }
    });

    event.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Event = mongoose.model("event", event);
    return Event;
};