const e = require("express");
const { invoice } = require("../models");
const db = require("../models");
const Invoice = db.invoice;

exports.create = (req, res) =>
{
    // #swagger.tags = ["Invoices"]
    const invoice = new Invoice(req.body);

    invoice
        .save(invoice)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err =>
            {
                res.status(500).send({ message: err.message || "An error occurred trying to add an invoice."});
            })
};

exports.findAll = (req, res) => {
    // #swagger.tags = ["Invoices"]
    Invoice.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: err.message || "An error occurred retrieving invoices."});
        })
};

exports.fineOne = (req, res) => {
    // #swagger.tags = ["Invoices"]
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
                res.send({message: "Invoice was updated successfully."});
            }                               
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occurred updating invoice."});
        })
};

exports.delete = (req, res) => {
    // #swagger.tags = ["Invoices"]
    const id = req.params.id;
    Invoice.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `Cannot delete invoice with id = ${id}. Family member not found.`});
            } else {
                res.send({ message: `${data.deletedCount } Invoices were deleted.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred deleting an invoice."
            });
        });
};