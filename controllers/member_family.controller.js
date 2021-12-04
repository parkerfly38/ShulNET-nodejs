const e = require("express");
const { members } = require("../models");
const db = require("../models");
const MemberFamily = db.memberFamily;

exports.create = (req, res) => {
    // #swagger.tags = ["Family Members"]
    /*
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Family member definition.',
            required: true,
            schema: { "$ref": "#/definitions/Family_Member" }
        }
        #swagger.responses[201] = {
            schema: { "$ref": "#/definitions/Family_Member" }
        }
        #swagger.security = [{ "Bearer": [] }]
    */
    const memberfamily = new MemberFamily(req.body);

    memberfamily
        .save(memberfamily)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send( {message: err.message || "An error occured saving a family member." });
        });
};

exports.findAll = (req, res) => {
    // #swagger.tags = ["Family Members"]
    /*
        #swagger.responses[200] = {
            schema: [{ "$ref": "#/definitions/Family_Member" }]
        }
        #swagger.security = [{ "Bearer": [] }]
    */
    if (!req.params.member_id)
    {
        MemberFamily.find()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred retrieving family members."});
            });
    } else {
        MemberFamily.find({ member_id: req.params.member_id})
            .then(data => {
                if (!data)
                {
                    res.status(404).send({ message: "No family members found for member id " + req.params.member_id });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error retrieving family members with member id " + req.params.member_id });
            });
    }
};

exports.findOne = (req, res) => {
    // #swagger.tags = ["Family Members"]
    /*
        #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/Family_Member" }
        }
        #swagger.security = [{ "Bearer": [] }]
    */
    const id = req.params.id;

    MemberFamily.findById(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({message: "Not found family member with id " + id });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving family member with id " + id });
        })
};

exports.update = (req, res) => {
    // #swagger.tags = ["Family Members"]
    // #swagger.security = [{ "Bearer": [] }]
    if (!req.body)
    {
        return res.status(400).send({ message: "Data may not be empty. "});
    }
    const id = req.params.id;
    MemberFamily.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                req.status(404).send({
                    message: `Cannot update family member with id = ${id}.  Family member not found.`
                });
            } else {
                res.status(200).send({message: "Family member was updated successfully."});
            }                               
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occurred updating family member."});
        })
};

exports.delete = (req, res) => {
    // #swagger.tags = ["Family Members"]
    // #swagger.security = [{ "Bearer": [] }]
    const id = req.params.id;
    MemberFamily.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `Cannot delete family member with id = ${id}. Family member not found.`});
            } else {
                res.status(200).send({ message: `${data.deletedCount } Family members were deleted.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred deleting a family member."
            });
        });
};