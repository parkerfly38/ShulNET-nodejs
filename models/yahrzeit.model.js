const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = new Schema({
        english_name: { type: String, required: true },
        hebrew_name: { type: String, required: true },
        date_of_death: { type: Date, required: true },
        hebrew_day_of_death: { type: String, required: false },
        hebrew_month_of_death: { type: String, enum: [
            "NISAN",
            "IYYAR",
            "SIVAN",
            "TAMUZ",
            "AV",
            "ELUL",
            "TISHREI",
            "CHESHVAN",
            "KISLEV",
            "TEVET",
            "SHVAT",
            "ADAR_I",
            "ADAR_II"
        ], required: false},
        hebrew_year_of_death: { type: String, required: false },
        calculated_hebrew_date_of_death: { type: String, required: false },
        member_id: { type: [String] },
        portal_id: { type: Schema.Types.ObjectId, required: true }
    }, {timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Yahrzeit = mongoose.model("yahrzeit", schema);
    return Yahrzeit;
};