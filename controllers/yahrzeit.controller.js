//mport {HebrewCalendar, HDate, Location, Event} from '@hebcal/core';
const e = require("express");
const { yahrzeit } = require("../models");
const db = require("../models");
const Yahrzeit = db.yz;
const hebrewDate = require("hebrew-date");

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
    const gMonth = yahrzeit.date_of_death.getMonth()+1;
    const gDay = yahrzeit.date_of_death.getDate();
    const gYear = yahrzeit.date_of_death.getFullYear();
    const hebrewDateObject = hebrewDate(gYear, gMonth, gDay);
    yahrzeit.calculated_hebrew_date_of_death = hebrewDateObject.date + ' ' + hebrewDateObject.month_name + ' ' + hebrewDateObject.year;
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
    #swagger.parameters['portal_id'] = {
        in: 'header',
        description: 'Portal Id',
        required: true
    }
     #swagger.responses[200] = {
      schema: [{ $ref: "#/definitions/Yahrzeit" }]
    }
    #swagger.security = [{ "Bearer": [] }]          */
    if (!req.header.portal_id)
    {
        return res.status(500).send({ message: "Portal ID required."});
    }
    const portal_id = req.header.portal_id;
    Yahrzeit.find({portal_id: portal_id})
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
    //always check to update the Hebrew Date
    const gMonth = req.params.date_of_death.getMonth()+1;
    const gDay = req.params.date_of_death.getDate();
    const gYear = req.params.date_of_death.getFullYear();
    const hebrewDateObject = hebrewDate(gYear, gMonth, gDay);
    req.params.calculated_hebrew_date_of_death = hebrewDateObject.date + ' ' + hebrewDateObject.month_name + ' ' + hebrewDateObject.year;
    Yahrzeit.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data)
            {
                req.status(404).send({
                    message: `Cannot update Yahrzeit with id = ${id}.  Member not found.`
                });
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
    Yahrzeit.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `Cannot delete Yahrzeit with id = ${id}. Yahrzeit not found.`});
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