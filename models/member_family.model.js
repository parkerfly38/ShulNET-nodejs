const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = new Schema({
        member_id: {type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        address_line_1: { type: String, required: false },
        address_line_2: { type: String, required: false },
        city: { type: String, required: false },
        state: {type: String, required: false },
        zip: { type: String, required: false },
        country: { type: String, required: false },
        phone: { type: String, required: false },
        email: {type: String, required: false },
        dob: {type:Date, required: false },
        hebrew_name: { type: String, required: false },
        bnai_mitzvah_date: {type: Date, required: false }
    }, {timestamps: true});

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const MemberFamily = mongoose.model("memberFamily", schema);
    return MemberFamily;
};