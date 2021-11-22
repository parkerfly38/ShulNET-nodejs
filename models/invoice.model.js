const { Schema } = require("mongoose");

module.exports = mongoose =>
{
    var invoiceComponents = new Schema({
        type: { type: String, enum: ['product','time','credit'], default:'product', required: true},
        minutes: { type: Number, required: false },
        hourly: { type: Number, required: false },
        qty: { type: Number, required: false, default: 0},
        unit_price: { type: Number, required: false },
        status: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        option1: {type: String, required: false },
        option2: {type: String, required: false },
        option3: {type: String, required: false },
        option4: {type: String, required: false },
        option5: {type: String, required: false },
        name: { type: String, required: true },
        description: { type: String, required: false },
        tax: { type: Number, required: false }
    });

    var invoiceTotals = new Schema({
        paid: { type: Number, required: true },
        due: { type: Number, required: true },
        subtotal: { type: Number, required: true },
        shipping: { type: Number, required: true },
        tax: { type: Number, required: true },
        tax_rate: { type: Number, required: true },
        credits: { type: Number, required: true }
    });

    var invoiceData = new Schema({
        company_name: { type: String, required: false },
        contact_name: { type: String, required: true },
        address_line_1: { type: String, required: true },
        address_line_2: { type: String, required: false },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: false },
        fax: { type: String, required: false },
        email: { type: String, required: false },
        website: { type: String, required: false },
        memo: { type: String, required: false }
    });

    var invoicePayments = new Schema({
        date: { type: Date, default: Date.now },
        paid: { type: Number, required: true }
    });

    var invoice = new Schema({
        date: { type: Date, default: Date.now },
        last_reminder: { type: Date, required: false },
        date_due: { type: Date, required: true },
        total_reminders: { type: Number, default: 0 },
        member_id: { type: String, required: true },
        status: { type: Number, enum: [0,1,2,3,4], required: true }, //0 = unpaid, 1 paid, 2 partially paid, 3 overdue, 4 dead
        tax_rate: { type: Number, default: 0 },
        shipping_rule: {type: String, required: false },
        shipping_name: { type: String, required: false },
        ip: { type: String, required: false },
        hourly: { type: Number, required: false },
        rollingInvoice: {type: Boolean, default: false },
        check_only: { type: Boolean, default: false },
        quote: { type: Boolean, default: false },
        header: { type: invoiceData },
        payments: { type: [invoicePayments]},
        components: { type: [invoiceComponents]},
        totals: { type: invoiceTotals }
    });

    invoice.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Invoice = mongoose.model("invoice", invoice);
    return Invoice;


}