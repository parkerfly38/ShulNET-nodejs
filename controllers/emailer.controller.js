const e = require("express");
const { outboundemail } = require("../models");
const db = require("../models");
const OutboundEmail = db.outboundemail;

exports.create = (req, res) => {
    /*  #swagger.tags = ["Emailer"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Email definition.',
            required: true,
            schema: { $ref: "#/definitions/OutboundEmail" }
        }
        #swagger.responses[201] = {
            schema: { "$ref" : "#/definitions/OutboundEmail" }
        }
        #swagger.security = [{ "Bearer": [] }]
    */
   const outboundemail = new OutboundEmail(req.body);
   outboundemail
        .save(outboundemail)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({message:err.message || "An error occured staging an email for send."});
        });
};

exports.findAll = (req, res) => {
    /*  #swagger.tags = ["Emailer"]
        #swagger.parameters["portal_id"] = {
            in: 'header',
            description: 'Portal Identifier',
            required: true
        }
        #swagger.responses[200] = {
            schema: [{ "#ref" : "#/definitions/OutboundEmailer" }]
        }
        #swagger.security = [{ "Bearer": [] }]
    */
   if (req.headers.portal_id == "")
   {
       res.status(500).send({ message: "Portal ID is required." });
   }
   const portal_id = req.headers.portal_id;
   OutboundEmail.find({portal_id: portal_id})
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "An error occurred retrieving your outbound mail log."});
    });
};

exports.findOne = (req, res) => {
    /*  #swagger.tags = ["Emailer"]
        #swagger.parameters["portal_id"] = {
            in: 'header',
            description: 'Portal Identifier',
            required: true
        }
        #swagger.responses[200] = {
            schema: { "#ref" : "#/definitions/OutboundEmailer" }
        }
        #swagger.security = [{ "Bearer": [] }]
    */
   const id = req.params.id;
   OutboundEmail.findById(id)
        .then(data => {
            if (!data)
            {
                res.status(404).send({message: `Not found outbound email with id: ${id}`});
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || `Error retrieving email with id: ${id}`});
        });
};