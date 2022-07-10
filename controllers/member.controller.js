const e = require("express");
const { members } = require("../models");
const { invoice } = require("../models");
const db = require("../models");
const Member = db.members;
const Invoice = db.invoice;
const Yahrzeit = db.yz;

exports.create = (req, res) => {
    /*  #swagger.tags = ["Members"]
        #swagger.parameters['obj'] = {
           in: 'body',
           description: 'Member definition.',
           required: true,
           schema: { $ref: "#/definitions/Member" }
        }
        #swagger.security = [{ "Bearer": [] }]
        #swagger.responses[201] = {
            schema: { "$ref": "#/definitions/Member" }
        }
        */
    const member = new Member(req.body);

    member
        .save(member)
        .then(data => {
            
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send( { message: err.message || "An error occured while creating a member." });
        });
};

exports.findAll = (req, res) => {
    // #swagger.tags = ["Members"]
    /* #swagger.parameters["portal_id"] = {
            in: 'header',
            description: 'portal_id',
            required: true
       }
       #swagger.parameters["page"] = {
            in: 'query',
            description: 'Page in results.',
            required: false
       }
       #swagger.parameters["limit"] = {
            in: 'query',
            description: 'Per page results.',
            required: false
       }
    } */
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;

    if (req.headers.portal_id == "")
    {
        res.status(500).send({ message: "Portal ID is required."});
    }
    const portal_id = req.headers.portal_id;
    Member.find({portal_id: portal_id})
        .sort({_id: 1})
        .limit(limit)
        .skip(skipIndex)
        .then(data => {
            /* #swagger.responses[200] = {
                    schema: [{  "$ref": "#/definitions/Member" }]
                }
                #swagger.security = [{ "Bearer": [] }]                
                */
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occured retrieving members." });
        });
};

exports.findOne = (req, res) => {
    // #swagger.tags = ["Members"]
    // #swagger.security = [{ "Bearer": [] }]
    const id = req.params.id;

    Member.findById(id)
        .then(data => {
            if (!data)
            {
                res.status(404).send({message: "Not found Member with id " + id });
            } else {
                /* #swagger.responses[200] = {
                    schema: { "$ref": "#/definitions/Member" }
                }
                */
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving Member with id " + id });
        });
};

exports.update = (req, res) => {
    /*  #swagger.tags = ["Members"]
        #swagger.parameters['obj'] = {
           in: 'body',
           description: 'Member definition.',
           required: true,
           schema: { $ref: "#/definitions/Member" }
        }
        #swagger.security = [{ "Bearer": [] }]
    */
    if (!req.body)
    {
        return res.status(400).send({ message: "Data may not be empty."});
    }
    const id = req.params.id;
    Member.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data)
            {
                req.status(404).send({
                    message: `Cannot update Member with id = ${id}.  Member not found.`
                })
            } else {
                //res.status(201).send({message: "Member was updated successfully."});
                res.status(204).send();
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error updating Member with id=" + id });
        });
};

exports.delete = (req, res) => {
    // #swagger.tags = ["Members"]
    // #swagger.security = [{ "Bearer": [] }]
    const id = req.params.id;
    Member.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `Cannot delete Member with id = ${id}. Member not found.`});
            } else {
                res.status(200).send({ message: `${data.deletedCount} Members were deleted successfully.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while removing a member."
            });
        });
};

exports.getMemberYahrzeits = (req, res) => {
    /*  #swagger.tags = ["Members", "Yahrzeit"]
        #swagger.security = [{ "Bearer": []}]
        #swagger.parameters['member_id'] = {
            in: 'path',
            description: "Member Id"
        }
        #swagger.responses[200] = {
            schema: [{ $ref: "#/definitions/Yahrzeit" }]
        }
        */
       const id = req.params.member_id;
       Yahrzeit.find({member_id: id})
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `No yahrzeits found for member id ${id}`});
            } else {
                res.status(200).send(data);
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "An error occurred retrieving member yahrzeits."});
        });
};

exports.getMemberInvoices = (req, res) => {
    // #swagger.tags = ["Members","Invoices"]
    // #swagger.security = [{ "Bearer": [] }]
    const id = req.params.member_id;
    Invoice.find({ member_id: id })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `No invoices found for member id ${id}`});
            } else {
                /* #swagger.responses[200] = {
                    schema: { "$ref": "#/definitions/Invoice" }
                }
                */
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred retrieving member invoices."
            });
        });
};

exports.getMemberByEmail = (req, res) => {
    /*  #swagger.tags = ["Members"]
        #swagger.security = [{ "Bearer": [] }]
        #swagger.responses[200] = {
            schema: { "$ref":"#/definitions/Member" }
        }
        #swagger.parameters['obj'] = {
           in: 'body',
           description: 'Email of user.',
           required: true,
           schema: { $email: "" }
        }
    */
   const email = req.body.email;
   Member.find({ email: email })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: "No user found for member." });
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred retrieving a member."
            });
        });
};