const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = new Schema({
        name: { type: String, required: true, unique: true }
    });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Role = mongoose.model("role", schema);
    return Role;
};