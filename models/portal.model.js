const { ServerDescriptionChangedEvent } = require("mongodb");
const { Schema } = require("mongoose");

module.exports = mongoose => {

    var person = new Schema({
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        title: { type: String, required: false },
        phone: { type: String, required: false },
        email: { type: String, required: false }
    });

    var setting = new Schema({
        option_name: { type: String, required: true },
        option_value: { type: String, required: true }
    });

    var schema = new Schema({
        institution_name: { type: String, required: true },
        address_line_1: { type: String, required: false },
        address_line_2: { type: String, required: false},
        city: { type: String, required: false },
        state: { type: String, required: false },
        zip: { type: String, required: false },
        country: { type: String, required: false },
        phone: { type: String, required: false },
        fax: { type: String, required: false },
        webUrl: { type: String, required: false },
        officeEmail: { type: String, required: false },
        rabbis: { type: [person]},
        officers: { type: [person]},
        board_members: { type: [person]},
        committee_chairs: { type: [person]},
        portal_settings: { type: [setting]}
    });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Portal = mongoose.model("portal", schema);
    return Portal;
}