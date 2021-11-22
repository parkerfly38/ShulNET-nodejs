const e = require("express");
const { members } = require("../models");
const { invoice } = require("../models");
const db = require("../models");
const Member = db.members;
const Invoice = db.invoice;

exports.create = (req, res) => {
    const member = new Member(req.body);

    member
        .save(member)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( { message: err.message || "An error occured while creating a member." });
        });
};

exports.findAll = (req, res) => {
    Member.find()
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occured retrieving members." });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Member.findById(id)
        .then(data => {
            if (!data)
            {
                res.status(404).send({message: "Not found Member with id " + id });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving Member with id " + id });
        });
};

exports.update = (req, res) => {
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
                res.send({message: "Member was updated successfully."});
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error updating Member with id=" + id });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Member.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `Cannot delete Member with id = ${id}. Member not found.`});
            } else {
                res.send({ message: `${data.deletedCount} Members were deleted successfully.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while removing a "
            });
        });
};

exports.getMemberInvoices = (req, res) => {
    const id = req.params.member_id;
    Invoice.find({ member_id: id })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `No invoices found for member id ${id}`});
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred retrieving member invoices."
            });
        });
};