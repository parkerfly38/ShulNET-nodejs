const { Schema } = require('mongoose');

module.exports = mongoose =>
{
    var calendar = new Schema({
        name: { type: String, required: true },
        members_only: { type: Boolean, default: false },
        public: {type:Boolean, default: true },
        created: { type: Date, default: Date.now }
    });

    calendar.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Calendar = mongoose.model("calendar", calendar);
    return Calendar;
}