const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = new Schema({
        date_title: { type: String, required: true },
        honor_date: { type: Date, required: true },
        hebrew_date: { type: String, required: true },
        honor_name: { type: String, required: true },
        portal_id: { type: Schema.Types.ObjectId, required: true },
        honoree: { type: String, required: false },
        honoree_email: { type: String, required: false }
    }, {timestamps: true });

    schema.method("to.JSON", function() {
        const { __v, _id, ...object } = this.toObject;
        object.id = _id;
        return object;
    });

    const Honors = mongoose.model("honors", schema);
    return Honors;
};