const e = require("express");
const { members } = require("../models");
const db = require("../models");
const Member = db.members;

exports.create = (req, res) => {
    console.log("Create request received");
    if (!req.body.first_name || !req.body.last_name || !req.body.email)
    {
        res.status(400).send({ message: "Missing required fields." });
        return;
    }
    const member = new Member({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        middle_name: req.body.middle_name ? req.body.middle_name : "",
        address_line_1: req.body.address_line_1 ? req.body.address_line_1 : "",
        address_line_2: req.body.address_line_2 ? req.body.address_line_2 : "",
        city: req.body.city ? req.body.city : "",
        state: req.body.state ? req.body.state : "",
        zip: req.body.zip ? req.body.zip : "",
        country: req.body.country ? req.body.country : "",
        phone: req.body.phone ? req.body.phone : "",
        fax: req.body.fax ? req.body.fax : "",
        dob: req.body.dob ? req.body.dob : null,
        title: req.body.title ? req.body.title : "",
        cell: req.body.cell ? req.body.cell : "",
        email: req.body.email,
        hebrew_name: req.body.hebrew_name ? req.body.hebrew_name : "",
        father_hebrew_name: req.body.father_hebrew_name ? req.body.father_hebrew_name : "",
        mother_hebrew_name: req.body.mother_hebrew_name ? req.body.mother_hebrew_name : "",
        bar_bat_mitzvah_portion: req.body.bar_bat_mitzvah_portion ? req.body.bar_bat_mitzvah_portion : ""
    });

    member
        .save(member)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( { message: err.message || "Some error occured while creating a member." });
        });
};

exports.findAll = (req, res) => {
    Member.find()
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occured retrieving members." });
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
            res.status(500).send({ message: "Error retrieving Member with id " + id });
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
            res.status(500).send({ message: "Error updating Member with id=" + id });
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
                message: err.message || "Some error occurred whule removing a "
            });
        });
};