const e = require("express");
const { portal } = require("../models");
const db = require("../models");
const Portal = db.portal;

exports.create = (req, res) => {
    /*  #swagger.tags = ["Portal"]        
        #swagger.security = [{ "Bearer": [] }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Portal definitions.',
            required: true,
            schema: { $ref: "#/definitions/Portal" }
        }
        #swagger.responses[201] = {
            schema: { $ref: "#/definitions/Portal" }
        }
    */
   const portal = new Portal(req.body);
   portal
        .save(portal)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({message:err.message || "An error occurred saving portal details."});
        });
};

exports.findAll = (req, res) => {
    // this one does not return settings
    //  #swagger.tags = ["Portal"]
    /*  #swagger.responses[200] = {
        schema: [{ $ref: "#/definitions/Portal"}]
    }
    */
    Portal.find()
        .select('-portal_settings')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({message:err.message });
        });
};

exports.findOne = (req, res) => {
    /*  #swagger.tags = ["Portal"]
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Portal" }
        }
    */
    const id = req.params.id;
    Portal.findById(id)
        .select('-postal_settings')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({message:err.message});
        });
};

exports.findAllWithSettings = (req, res) => {
    //  #swagger.tags = ["Portal"]
    /*  #swagger.responses[200] = {
        schema: [{ $ref: "#/definitions/Portal"}]
    }
    */
    Portal.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({message:err.message });
        });
};

exports.findOneWithSettings = (req, res) => {
    /*  #swagger.tags = ["Portal"]
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Portal" }
        }
    */
    const id = req.params.id;
    Portal.findById(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({message:err.message});
        });
};

exports.update = (req, res) => {
    /*  #swagger.tags = ["Portal"]
        #swagger.parameters['obj'] - {
            in: 'body',
            description: 'Update portal definitions.',
            required: true,
            schema: { $ref: "#/definitions/Portal" }
        }
        #swagger.security = [{ "Bearer" : [] }]
    */
   if (!req.body)
   {
       return res.status(400).send({ message: "Payload may not be empty."});
   }
   const id = req.params.id;
   Portal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data)
        {
            req.status(404).send({
                message: `Cannot update portal settings with id = ${id}.  Portal settings not found.`
            });
        } else {
            res.status(204).send();
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error updating portal settings." });
    });
};

exports.delete = (req, res) => {
    /*  #swagger.tags = ["Portal"]
        #swagger.security = [{ "Bearer": [] }]
    */
   const id = req.params.id;
   Portal.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
        if (!data)
        {
            res.status(404).send({ message: `Cannot delete poetal settings with id = ${id}.  Portal settings not found.`});
        } else {
            res.status(200).send({ message: `${data.deletedCount} portal settings deleted.`});
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};