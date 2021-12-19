const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = new Schema({
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        middle_name: {type: String, required: false },
        address_line_1: {type: String, required: false },
        address_line_2: {type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        zip: { type: String, required: false },
        country: { type: String, required: false },
        phone: {type: String, required: false },
        fax: {type: String, required: false },
        dob: {type: Date, required: false },
        title: {type: String, required: false },
        cell: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        gender: { type: String, required: false },
        hebrew_name: { type: String, required: false },
        father_hebrew_name: { type: String, required: false },
        mother_hebrew_name: { type: String, required: false },
        bar_bat_mitzvah_portion: { type: String, required: false },
        aliyah: { type: String, required: false },
        dvar_torah: { type: String, required: false },
        bnai_mitzvah_date: {type: Date, required: false },
        haftarah: { type: String, required: false },
        wedding_anniversary: { type: Date, required: false },
        quickbooks_customer_id: { type: String, required: false }
    }, {timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Member = mongoose.model("member", schema);
    return Member;
};