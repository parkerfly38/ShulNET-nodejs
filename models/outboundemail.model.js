const { Schema } = require("mongoose");
var Portal = require("./portal.model");

module.exports = mongoose => {
    var schema = new Schema({
        email_subject: { type: String, required: true },
        email_from: { type: String, required: true },
        email_html_body: { type: String, required: true },
        email_text_body: { type: String, required: false },
        portal_id: { type: Schema.Types.ObjectId, ref: Portal },
        send_date: { type: Date, required: false },
        is_mass: { type: Boolean, required: false, default: true },
        email_to: { type: String, required: false }
    }, {timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const OutboundEmail = mongoose.model("outboundemail", schema);
    return OutboundEmail;
};