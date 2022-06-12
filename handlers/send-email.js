const OutboundEmail = require("../models/outboundemail.model");

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from, portal_id }) {
    //this just pops our queue
    const outboundemail = new OutboundEmail({
        email_subject : subject,
        email_from : from,
        email_html_body : html,
        portal_id : portal_id,
        send_date: null,
        is_mass: false,
        email_to: to
    });
    outboundemail.save();
}