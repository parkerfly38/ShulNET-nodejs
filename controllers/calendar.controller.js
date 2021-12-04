const e = require("express");
const { calendar } = require("../models");
const db = require("../models");
const Calendar = db.calendar;

exports.create = (req, res) => {
    /*
        #swagger.tags = ["Calendar"]
        #swagger.parameters['obj'] = {
            in: "body",
            description: "Create a calendar.",
            required: true,
            schema: { "$ref": "#/definitions/Calendar"}
        }
        #swagger.responses[201] = {
            schema: { "$ref": "#/definitions/Calendar" }
        }
        #swagger.security = [{ "Bearer": [] }]         
    */
   const calendar = new Calendar(req.body);

   calendar
        .save(calendar)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err =>
        {
            res.status(500).send( { message: err.message || "An error occured while creating calendar." });
        });
};

exports.findAll = (req, res) => {
    // #swagger.tags = ["Calendar"]
    Calendar.find()
        .then(data => {
            /* #swagger.responses[200] = {
              schema: [{ "$ref": "#/definitions/Calendar" }]    
             } */
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred while retrieving calendars. "});
        });
};

exports.findOne = (req, res) => {
    // #swagger.tags = ["Calendar"]
    Calendar.findById(req.params.id)
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: "Calendar not found with id " . req.params.id });
            } else {
                /* #swagger.responses[200] = { 
                    schema: { $ref: "#/definition/Calendar" } 
                } */
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message:err.message || "An error occurred retrieving a calendar with id " + req.params.id });
        });
};

exports.update = (req, res) => {
    /*  #swagger.tags = ["Calendar"]
        #swagger.parameters['obj'] = {
           in: 'body',
           description: 'Member definition.',
           required: true,
           schema: { "$ref": "#/definitions/Member" }
        }
        #swagger.security = [{ "Bearer": [] }]         
    */
   const id = req.params.id;
    Calendar.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if(!data)
        {
            req.status(404).send({
                message: `Cannot update calendar with id = ${id}.  Calendar not found.`
            })
        } else {
            //res.status(201).send({message: "Member was updated successfully."});
            res.status(204).send();
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error updating calendar with id=" + id });
    });
};

exports.delete = (req, res) => {
       // #swagger.tags = ["Calendar"]
       // #swagger.security = [{ "Bearer": [] }]         
       const id = req.params.id;
       Member.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `Cannot delete calendar with id = ${id}. Calendar not found.`});
            } else {
                res.status(200).send({ message: `${data.deletedCount} calendars were deleted successfully.`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while removing a calendar"
            });
        });
};