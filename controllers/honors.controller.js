const e = require("express");
const { honors } = require("../models");
const db = require("../models");
const Honors = db.honors;

exports.create = (req, res) => {
    /*  #swagger.tags = ["Honors"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Torah honors assignment definition',
            required: true,
            schema: { $ref: "#/definitions/Honors" }
        }
        #swagger.responses[201] = {
            schema: { $ref: "#/definitions/Honors" }
        }
        #swagger.security = [{ "Bearer": [] }]
    */
   const honors = new Honors(req.body);
   honors
        .save(honors)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "There was an error creating your honors."});
        });
};

exports.findAll = (req, res) => {
    /*  #swagger.tag = ["Honors"]
        #swagger.parameters['portal_id'] = {
            in: 'header',
            description: "Portal Id"
        }
        #swagger.responses[200] = {
            schema: [{ $ref: "#/definitions/Honors" }]
        }
        #swagger.security = [{ "Bearer": [] }]
    */
    if (!req.header.portal_id)
    {
        return res.status(500).send({ message: "Portal ID required."});
    }
    const portal_id = req.header.portal_id;
    Honors.find({ portal_id: portal_id})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "There was an error retrieving honors."});
        });
};

exports.findOne = (req, res) => {
    /*  #swagger.tags = ["Honors"]
        #swagger.responses[200] = {
            schema: { $ref : "#/definitions/Honors" }
        }
        #swagger.security = [{ "Bearer": [] }]
    */
   const id = req.params.id;
   Honors.findById(id)
        .then(data => {
            if (!data)
            {
                res.status(404).send({ message: `Honors ${id} not found.`});
            } else {
                res.status(200).send(data);
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message || `There was an error retrieving ${id}.`});
        });
};

exports.update = (req, res) => {
    /*  #swagger.tags = ["Honors"]
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Honor Id'
        }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Honor body',
            schema: { $ref: "#/definitions/Honors"}
        }
        #swagger.security = [{ "Bearer" : [] }]
    */
   if (!req.body)
   {
        return res.status(400).send({ message: "Payload is missing."});
   }
   const id = req.params.id;
   Honors.findByIdAndUpdate(id, req.body)
    .then(data => {
        if (!data) {
            req.status(404).send({ message: `Cannot find honor ${id}.`});
        } else {
            res.status(200).send(data);
        }
    })
    .catch(error => {
        res.status(500).send({message: error.message || `Error updating ${id}.`});
    });
};

exports.delete = (req, res) => {
    /*  #swagger.tags = ["Honors"]
        #swagger.parameters["id"] = {
            in: 'path',
            description: 'Honor Id'
        }
        #swagger.security = [{ "Bearer" : [] }]
    */
   const id = req.params.id;
   Honors.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message: `Could not find ${id}.`});
            } else {
                res.status(200).send({ message: `Deleted honor ${id}.`});
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message || `Error deleting ${id}.`});
        });
};

