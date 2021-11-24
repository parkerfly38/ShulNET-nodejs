const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = new Schema({
        username: {type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role_id: { type: [String]}
    });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("user", schema);
    return User;
};