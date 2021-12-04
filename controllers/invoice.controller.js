const e = require("express");
const { invoice } = require("../models");
const db = require("../models");
const Invoice = db.invoice;

exports.create = (req, res) =>
{
    // #swagger.tags = ["Invoices"]
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Invoice JSON',
        required: true,
        schema: { $ref: "#/definitions/Invoice" }
    }
       #swagger.security = [{ "Bearer": [] }]         
       #swagger.responses[201] = {
           schema: { $ref: "#/definitions/Invoice" }
       }
    */
    const invoice = new Invoice(req.body);

    invoice
        .save(invoice)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err =>
            {
                res.status(500).send({ message: err.message || "An error occurred trying to add an invoice."});
            })
};

exports.findAll = (req, res) => {
    // #swagger.tags = ["Invoices"]
    /* #swagger.responses[200] = {
            schema: [{ $ref: "#/definitions/Invoice" }]
        }
        #swagger.security = [{ "Bearer": [] }]         
    */
    Invoice.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({message: err.message || "An error occurred retrieving invoices."});
        })
};

exports.findByMemberId = (req, res) =>
{
    /*  #swagger.tags = ["Invoices"]
        #swagger.responses[200] = {
            schema: [{ $ref: "#/definitions/Invoice"}]
        }
        #swagger.security = [{ "Bearer": [] }]         
    */
   const member_id = req.params.member_id;
   Invoice.find({member_id: member_id})
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `Invoices for member ${member_id} not found.`});
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message || "An error occurred retrieiving invoices."});
        });
};

exports.fineOne = (req, res) => {
    // #swagger.tags = ["Invoices"]
    /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Invoice"}
    }
    #swagger.security = [{ "Bearer": [] }]         
    */
    const id = req.params.id;
    
    Invoice.findById(id)
        .then(data => {
            if (!data)
            {
                res.status(404).send({message: `Invoice id: ${id} not found.`});
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occurred retrieving invoice."});
        });
};

exports.update = (req, res) => {
    // #swagger.tags = ["Invoices"]
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Invoice JSON',
        required: true,
        schema: { $ref: "#/definitions/Invoice"}
    }
    #swagger.security = [{ "Bearer": [] }]         
    */
    if (!req.body)
    {
        return res.status(400).send({ message: "Data may not be empty. "});
    }
    const id = req.params.id;
    Invoice.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                req.status(404).send({
                    message: `Cannot update invoice with id = ${id}.  Invoice not found.`
                });
            } else {
                res.status(200).send({message: "Invoice was updated successfully."});
            }                               
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occurred updating invoice."});
        })
};

exports.delete = (req, res) => {
    // #swagger.tags = ["Invoices"]
    // #swagger.security = [{ "Bearer": [] }]         
    const id = req.params.id;
    Invoice.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `Cannot delete invoice with id = ${id}. Family member not found.`});
            } else {
                res.status(200).send({ message: `${data.deletedCount } Invoices were deleted.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred deleting an invoice."
            });
        });
};