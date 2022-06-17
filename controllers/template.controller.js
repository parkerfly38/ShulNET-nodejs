const e = require("express");
const db = require("../models");
const Template = db.template;

exports.create = (req, res) => {
    /*  #swagger.tags = ["Template"]
        #swagger.security = [{ "Bearer": [] }]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Template definitions.',
            required: true,
            schema: { $ref: "#/definitions/Template"}
        }
        #swagger.responses[201] = {
            schema: { $ref: "#/definitions/Template" }
        }
    */
   const template = new Template(req.body);
   template
        .save(template)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred creating your template."});
        });
};

exports.findAll = (req, res) => {
    /*  #swagger.tags = ["Template"]
        #swagger.security = [{ "Bearer": [] }]
        #swagger.parameters["portal_id"] = {
            in: 'header',
            description: 'portal_id',
            required: true
        }
        #swagger.responses[200] = {
            schema: [{ $ref: "#/definitions/Template"}]
        }
    */
    const portal_id = req.headers.portal_id;
    Template.find({portal_id: portal_id})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "There was a problem searching for your templates."});
        });
};

exports.findOne = (req, res) => {
    /*  #swagger.tags = ["Template"]
        #swagger.security = [{ "Bearer": [] }]
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Template"}
        }
    */
   const id = req.params.id;

   Template.findById(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message: `Template ${id} not found.`});
            } else {
                res.status(200).send(data);
            }
        })
        .catch(error => {
            res.status(500).send({ message: error.message || `There was an error retrieving template ${id}.`});
        });
};

exports.update = (req, res) => {
    /*  #swagger.tags = ["Template"]
        #swagger.security = [{ "Bearer": [] }]
        #swagger.paramters['obj'] = {
            in: 'body',
            description: 'Template definition',
            required: true,
            schema { $ref: "#/definitions/Template" }
        }
    */
   if (!req.body)
   {
    return res.status(400).send({ message: "Template data may not be empty." });
   }
   const id = req.params.id;
   Template.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if(!data)
        {
            req.status(404).send({ message: `Cannot update template ${id}.`});
        } else {
            res.status(204).send();
        }
    })
    .catch(error => {
        res.status(500).send({ message: error.message || `There was a problem updating template ${id}.`});
    })
};

exports.delete = (req, res) => {
    /*  #swagger.tags = ["Template"]
        #swagger.security = [{ "Bearer": [] }]
    */
   const id = req.params.id;
   Template.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
        if(!data)
        {
            res.status(404).send({ message: `Template ${id} not found.`});
        } else {
            res.status(200).send({ message: `Template ${id} deleted.`});
        }
    })
    .catch(error => {
        res.status(500).send({ message: error.message || "An error occurred."});
    });
}