const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: "0.1.0",
        title: "ShulNET NodeJS API",
        description: "API underpinning ShulNET or custom integrations."
    },
    host: "localhost:8080",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      Bearer:
      {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description: "Enter your bearer token in the format Bearer &lt;token&gt;"
      }
    },
    definitions: {
        Authorization: {
            email: "brian.kresge@gmail.com",
            password: "<password>"
        },
        Registration: {
            email: "brian.kresge@gmail.com",
            title: "None",
            firstName: "Brian",
            lastName: "Kresge",
            password: "",
            confirmPassword: "",
            acceptTerms: true,
            role: "Admin",
            created: "2021-11-27"
        },
        Account: {
            email: "brian.kresge@gmail.com",
            member_id: "",
            passwordHash: "",
            title: "None",
            firstName: "Brian",
            lastName: "Kresge",
            acceptTerms: true,
            role: "Admin",
            verificationToken: "",
            verified: "2021-01-01",
            resetToken: {
                token: "",
                expires: "2021-01-01"
            },
            passwordReset: "2022-01-01",
            created: "2021-01-01",
            updated: "2021-01-01",
            portal_id: ""
        },
        Calendar: {
            name: "Example Calendar",
            members_only: false,
            public: true,
            created: "2021-01-01",
            portal_id: ""
        },
        Event: {
            name: "",
            tagline: "",
            calendar_id: "",
            starts: "2021-01-01",
            ends: "2021-01-02",
            start_registrations: "2020-12-01",
            early_bird_end: "2020-12-04",
            close_registration: "2020-12-15",
            created: "2020-11-01",
            max_rsvps: 0,
            members_only_rsvp: false,
            members_only_view: false,
            allow_guests: false,
            max_guests: 0,
            description: "",
            post_rsvp_message: "",
            online: false,
            url: "",
            location_name: "",
            address_line_1: "",
            address_line_2: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phone: "",
            all_day: false,
            public: true,
            status: 0
        },
        Honors: {
            id: "",
            date_title: "Parashat Bo",
            honor_date: "2022-06-18T01:37:13.234Z",
            hebrew_date: "22 Tevet 5782",
            honor_name: "1st Aliyah",
            portal_id: "",
            honoree: "Brian Kresge",
            honoree_email: "brian.kresge@gmail.com"
        },
        Member: {
            first_name: "Brian",
            last_name: "Kresge",
            middle_name: "Tiberius",
            address_line_1: "104 Baker Road",
            address_line_2: "",
            city: "Winterport",
            state: "ME",
            zip: "04496",
            country: "US",
            phone: "555-555-5555",
            fax: "555-555-5556",
            title: "Lord",
            cell: "555-555-5557",
            email: "brian.kresge@gmail.com",
            gender: "M",
            hebrew_name: "???????? ???? ???????? ??????",
            father_hebrew_name: "",
            mother_hebrew_name: "Shoshanna Rut",
            bar_bat_mitzvah_portion: "Balak",
            aliya: "true",
            dvar_torah: "true",
            bnai_mitzvah_date: "5 Tammuz",
            haftarah: "",
            wedding_anniversary: "2006-06-18",
            quickbooks_customer_id: "",
            portal_id: "",
            email_optout_date: "2022-01-01",
            sms_optout_date: "2022-01-01"
        },
        Family_Member: {
            member_id: "",
            first_name: "Amelia",
            last_name: "Kresge",
            address_line_1: "104 Baker Road",
            address_line_2: "",
            city: "Winterport",
            state: "ME",
            zip: "04496",
            country: "US",
            phone: "555-555-5555",
            email: "email@email.com",
            dob: "2001-01-01",
            hebrew_name: "Aviva Leah bat Baruch v/Leah Pesha",
            bnai_mitzvah_date: "2011-01-01",
            email_optout_date: "2022-01-01"
        },
        OutboundEmail: {
            email_subject: "To Whom it May Concern",
            email_from: "somebody@somewhere.com",
            email_html_body: "<html><head><title>Blah</title></head><body><p>This is an email.</p></body></html>",
            email_text_body: "For those situations where you need a plain text email, too.",
            portal_id: "",
            send_date: "<Populated later when it is sent>"
        },
        PortalSignup: {
            institution_name: "Congregation Beth Israel",
            address_line_1: "144 York Street",
            address_line_2: "",
            city: "Bangor",
            state: "ME",
            zip: "04401",
            country: "USA",
            phone: "207-945-3433",
            fax: "",
            webUrl: "www.cbisrael.org",
            officeEmail: "office@cbisrael.org",
            portal_domain: "cbisrael.shulnet.com",
            email: "brian.kresge@gmail.com",
            password: "",
            confirmPassword: "",
            title: "None",
            firstName: "Brian",
            lastName: "Kresge",
            acceptTerms: true,
        },
        Portal: {
            institution_name: "Congregation Beth Israel",
            address_line_1: "144 York Street",
            address_line_2: "",
            city: "Bangor",
            state: "ME",
            zip: "04401",
            country: "USA",
            phone: "207-945-3433",
            fax: "",
            webUrl: "www.cbisrael.org",
            officeEmail: "office@cbisrael.org",
            portal_domain: "cbisrael.shulnet.com",
            accept_terms: true,
            rabbis: [
                {
                    first_name: "Bob",
                    last_name: "Smith",
                    title: "Senior Rabbi",
                    phone: "555-555-5555",
                    email: "rabbi@email.org"
                },
                {
                    first_name: "Rachel",
                    last_name: "Smith",
                    title: "Associate Rabbi",
                    phone: "555-555-5555",
                    email: "associaterabbi@email.org"
                }
            ],
            officers: [
                {
                    first_name: "Robert",
                    last_name: "Goldberg",
                    title: "President",
                    phone: "555-555-5555",
                    email: "president@email.org"
                }
            ],
            committee_chairs: [
                {
                    first_name: "Marla",
                    last_name: "Goldberg",
                    title: "Ritual Committee Chair",
                    phone: "555-555-5555",
                    email: "cochair@email.org"
                }
            ],
            portal_settings: [
                {
                    option_name: "api_key1",
                    option_value: "apivalue"
                },
                {
                    option_name: "api_key2",
                    option_value: "apivalue"
                }
            ],
            portal_invoices: [
                {
                    date: "2021-01-01",
                    last_reminder: "2021-01-01",
                    date_due: "2021-02-01",
                    total_reminders: 0,
                    member_id: "",
                    status: 0,
                    tax_rate: 0,
                    shipping_rule: "",
                    shipping_name: "",
                    ip: "",
                    hourly: 0,
                    rollingInvoice: false,
                    check_only: false,
                    quote: false,
                    header: {
                        company_name: "ABC Company",
                        contact_name: "Brian Kresge",
                        address_line_1: "104 Baker Road",
                        address_line_2: "",
                        city: "Winterport",
                        state: "ME",
                        zip: "04496",
                        country: "US",
                        phone: "555-555-5555",
                        fax: "555-555-5556",
                        email: "brian.kresge@gmai.com",
                        webiste: "www.shulnet.com",
                        memo: ""
                    },
                    payments: [
                        {
                            date: "2021-01-01",
                            paid: 15.00
                        }
                    ],
                    components: {
                        type: "product", //product, time, credit
                        minutes: 0,
                        hourly: 0,
                        qty: 1,
                        unit_price: 15.00,
                        status: 0,
                        date: "2021-01-01",
                        option1: "",
                        option2: "",
                        option3: "",
                        option4: "",
                        option5: "",
                        name: "Name of line",
                        description: "Valuable service",
                        tax: 0
                    },
                    totals: {
                        paid: 0.00,
                        due: 1500.00,
                        subtotal: 1500.00,
                        shipping: 0.00,
                        tax: 0.00,
                        tax_rate: 0.20,
                        credits: 0.00
                    }
                }
            ]
        },
        Template: {
            template_name: "Invoice Template",
            template_type: "invoice",
            template_body: "<!DOCTYPE html><html><head></head><body><p>This is an invoice template</p></body></html>",
            portal_id: ""
        },
        Invoice: {
            date: "2021-01-01",
            last_reminder: "2021-01-01",
            date_due: "2021-02-01",
            total_reminders: 0,
            member_id: "",
            status: 0,
            tax_rate: 0,
            shipping_rule: "",
            shipping_name: "",
            ip: "",
            hourly: 0,
            rollingInvoice: false,
            check_only: false,
            quote: false,
            header: {
                company_name: "ABC Company",
                contact_name: "Brian Kresge",
                address_line_1: "104 Baker Road",
                address_line_2: "",
                city: "Winterport",
                state: "ME",
                zip: "04496",
                country: "US",
                phone: "555-555-5555",
                fax: "555-555-5556",
                email: "brian.kresge@gmai.com",
                webiste: "www.shulnet.com",
                memo: ""
            },
            payments: [
                {
                    date: "2021-01-01",
                    paid: 15.00
                }
            ],
            components: {
                type: "product", //product, time, credit
                minutes: 0,
                hourly: 0,
                qty: 1,
                unit_price: 15.00,
                status: 0,
                date: "2021-01-01",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                option5: "",
                name: "Name of line",
                description: "Valuable service",
                tax: 0
            },
            totals: {
                paid: 0.00,
                due: 1500.00,
                subtotal: 1500.00,
                shipping: 0.00,
                tax: 0.00,
                tax_rate: 0.20,
                credits: 0.00
            }
        },
        Yahrzeit: {
            english_name: "Bob Jones",
            hebrew_name: "??????????",
            date_of_death: "2014-01-01",
            hebrew_day_of_death: "14",
            hebrew_month_of_death: "TAMUZ",
            member_id: ["", "", ""]
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);