const e = require("express");
const role = require("../handlers/role");
const { portal } = require("../models");
const db = require("../models");
const accountService = require("./account.controller");
const Role = require("../handlers/role");
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

exports.signup = (req, res) => {
    /*  #swagger.tags = ["Portal"]       
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Portal definitions.',
            required: true,
            schema: { $ref: "#/definitions/PortalSignup" }
        }
        #swagger.responses[201] = {
            schema: { $ref: "#/definitions/PortalSignup" }
        }
    */
   const portalFields = {
    institution_name: req.body.institution_name,
    address_line_1: req.body.address_line_1,
    address_line_2: req.body.address_line_2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    fax: req.body.fax,
    webUrl: req.body.webUrl,
    officeEmail: req.body.officeEmail,
    portal_domain: req.body.portal_domain,
    accept_terms: req.body.acceptTerms
   };
   const accountFields = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    title: req.body.title,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    acceptTerms: req.body.acceptTerms,
    role: Role.Admin,
    portal_id: ""
   };
   const portal = new Portal(portalFields);
   portal
        .save(portal)
        .then(data => {
            accountFields.portal_id = data.id;
            accountService.register(accountFields)
                .then(account => {
                    res.status(201).send(account);
                })
                .catch(error => {
                    res.status(500).send({message: error.message || "An error occurred saving portal admin."});
                });
            //res.status(201).send(data);
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
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Portal identifier',
            required: true
        }
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Portal" }
        }
    */
    const id = req.params.id;
    Portal.findById(id)
        .select('-portal_settings')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({message:err.message});
        });
};

exports.findByDomain = (req, res) => {
    /*  #swagger.tags = ["Portal"]
        #swagger.parameters['domain'] = {
            in: 'path',
            description: 'Portal domain',
            required: true
        }
        #swagger.responses[200] = {
            schema: [{ $ref: "#/definitions/Portal"}]
        }
    */
   const domain = req.params.domain;
   Portal.findOne({portal_domain : domain })
        .then(data => {
            if (!data) {
                res.status(404).send({message: "Domain not found."});
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message });
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

exports.findOneWithRabbis = (req, res) => {
    /*  #swagger.tags = ["Portal"]
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Portal" }
        }
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Portal ID'
        }
        #swagger.security = [{ "Bearer" : []}]
    */
   const id = req.params.id;
   Portal.findById(id, 'rabbis')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
};

exports.findOneWithSettings = (req, res) => {
    /*  #swagger.tags = ["Portal"]
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Portal ID'
        }
        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Portal" }
        }
        #swagger.security = [{ "Bearer" : [] }]
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