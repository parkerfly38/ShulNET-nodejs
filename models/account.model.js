const { Schema } = require('mongoose');
var Member = require("./member.model");
var Portal = require("./portal.model");

module.exports = mongoose =>
{
    var schema = new Schema({
        email: { type: String, unique: true, required: true },
        passwordHash: { type: String, required: true },
        title: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        member_id: { type: Schema.Types.ObjectId, ref: Member },
        acceptTerms: Boolean,
        role: { type: String, required: true },
        verificationToken: String,
        verified: Date,
        resetToken: {
            token: String,
            expires: Date
        },
        passwordReset: Date,
        created: { type: Date, default: Date.now },
        updated: Date,
        portal_id: {type: Schema.Types.ObjectId, ref: Portal }
    });

    schema.virtual('isVerified').get(function() {
        return !!(this.verified || this.passwordReset);
    });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Account = mongoose.model('account', schema);
    return Account;
};