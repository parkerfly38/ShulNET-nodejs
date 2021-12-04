//mport {HebrewCalendar, HDate, Location, Event} from '@hebcal/core';
const e = require("express");
const { yahrzeit } = require("../models");
const db = require("../models");
const Yahrzeit = db.yz;

exports.create = (req, res) => {
    /* #swagger.tags = ["Yahrzeit"]
     #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Yahrzeit definition',
      required: true,
      schema: { $ref: "#/definitions/Yahrzeit" }
     }
     #swagger.responses[201] = {
      schema: { $ref: "#/definitions/Yahrzeit" }    
     }
     #swagger.security = [{ "Bearer": [] }]         */
    const yahrzeit = new Yahrzeit(req.body);
    yahrzeit
        .save(yahrzeit)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred saving this yahrzeit."});
        });
};

exports.findAll = (req, res) => {
    /* #swagger.tags = ["Yahrzeit"]
     #swagger.responses[200] = {
      schema: [{ $ref: "#/definitions/Yahrzeit" }]
    }
    #swagger.security = [{ "Bearer": [] }]          */
    Yahrzeit.find( req.body )
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred retrieving yahrzeits." });
        });
};

exports.findOne = (req, res) =>
{
    /* #swagger.tags = ["Yahrzeit"]
     #swagger.responses[200] = {
      schema: { $ref: "#/definitions/Yahrzeit" }
     }
     #swagger.security = [{ "Bearer": [] }]         
     */
    const id = req.params.id;

    Yahrzeit.findById(id)
        .then(data => {
            if (!data)
            {
                res.status(404).send({message: "Yahrzeit not found with id " .id});
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred looking up yahrzeit id " + id });
        });
};

exports.update = (req, res) => {
    /* #swagger.tags = ["Yahrzeit"]
     #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Yahrzeit definition',
      required: true,
      schema: { $ref: "#/definitions/Yahrzeit" }
     }
     #swagger.security = [{ "Bearer": [] }]          */
    if (!req.body)
    {
        return res.status(400).send({ message: "Data may not be empty."});
    }
    const id = req.params.id;
    Yahrzeit.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data)
            {
                req.status(404).send({
                    message: `Cannot update Yahrzeit with id = ${id}.  Member not found.`
                })
            } else {
                res.status(200).send({message: "Yahrzeit was updated successfully."});
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error updating Yahrzeit with id=" + id });
        });
};

exports.delete = (req, res) => {
    // #swagger.tags = ["Yahrzeit"]
    // #swagger.security = [{ "Bearer": [] }]         
    const id = req.params.id;
    Member.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `Cannot delete Yahrzeit with id = ${id}. Member not found.`});
            } else {
                res.status(200).send({ message: `${data.deletedCount} Yahrzeits were deleted successfully.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while removing a "
            });
        });
};