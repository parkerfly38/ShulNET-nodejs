const db = require("../models");
const Event = db.event;

exports.create = (req, res) => {
    /*  #swagger.tags = ["Events"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Event definition',
            required: true,
            schema: { $ref: "#/definitions/Event" }
        }
        #swagger.responses[201] = {
            schema: { $ref: "#/definitions/Member" }
        }
    */
   const event = new Event(req.body);
   event
        .save(event)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred saving event."});
        });
};

exports.findAll = (req, res) => {
    /*  #swagger.tags = ["Events"] 
        #swagger.responses[200] = {
            schema: [{ $ref: "#/definitions/Event "}]
        }
    */
    Event.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occured retrieving events."});
        });
};

exports.findByCalendarId = (req, res) => {
    /*  #swagger.tags = ["Events"]
        #swagger.responses[200] = {
            schema: [{ $ref: "#/definitions/Event" }]
        }
    */
   const calendar_id = req.params.calendar_id;
   Event.find( { calendar_id: calendar_id })
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `No events found for calendar ${calendar_id} `});
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred retrieving events." });
        });
};

exports.findOne = (req, res) => {
    /*  #swagger.tags = ["Events"]
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Event" }
        }
    */
   const id = req.params.id;
   Event.findById(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message: "No event found for id " + id });
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred retrieving event" + id });
        });
};

exports.update = (req, res) => {
    /*  #swagger.tags = ["Events"] */
    const id = req.params.id;
    Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data)
            {
                req.status(404).send({ message: `Cannot update event with id = ${id}.  Event not found.`});
            } else {
                res.status(204).send();
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error updating event with id " + id });
        });
};

exports.delete = (req, res) => {
    /*  #swagger.tags = ["Events"] */
    const id = req.params.id;
    Event.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message: "Event not found."});
            } else {
                res.status(200).send({ message: `${data.deletedCount} events were deleted.`});
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred deleting an event."});
        });
};