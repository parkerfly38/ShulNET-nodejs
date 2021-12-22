const { Schema } = require('mongoose');
var Account = require('../models/account.model');

module.exports = mongoose => {
    var schema = new Schema({
        account: { type: Schema.Types.ObjectId, ref: Account },
        token: String,
        expires: Date,
        created: { type: Date, default: Date.now },
        createdByIp: String,
        revoked: Date,
        revokedByIp: String,
        replacedByToken: String
    });

    schema.virtual('isExpired').get(function(){
        return Date.now() >= this.expires;
    });

    schema.virtual('isActive').get(function(){
        return !this.revoked && !this.isExpired;
    });

    const RefreshToken = mongoose.model('refreshToken', schema);
    return RefreshToken;
}