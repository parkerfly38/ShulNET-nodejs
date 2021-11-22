import {HebrewCalendar, HDate, Location, Event} from '@hebcal/core';
const e = require("express");
const { yahrzeit } = require("../models");
const db = require("../models");
const Yahrzeit = db.yz;

exports.create = (req, res) => {
    const yahrzeit = new Yahrzeit(req.body);
    yahrzeit
        .save(yahrzeit)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred saving this yahrzeit."});
        });
};

exports.findAll = (req, res) => {
    Yahrzeit.find( req.body )
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "An error occurred retrieving yahrzeits." });
        })
};