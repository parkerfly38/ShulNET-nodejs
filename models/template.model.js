const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = new Schema({
        template_name: { type: String, required: true },
        template_type: { type: String, enum: ['invoice','email','yahrzeit', 'other'], required: true},
        template_body: { type: String, required: true },
        portal_id: { type: String, required: true }
    }, {timestamps: true});

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject;
        object.id = _id;
        return object;
    });

    const Template = mongoose.model("template", schema);
    return Template;
};