const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const patientModel = require("./models");
const router = express.Router();

router.post("/addPatient", bodyParser.urlencoded({ extended: false}), async (request, response) => {
  if (!request.body.name) {
    response.status(400).send({message: 'Patient name content cannot be empty!'});
    return;
  }
  const patient = new patientModel({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    barcode: request.body.barcode,
    filter_barcode: request.body.filter_barcode,
    Scans: []
  });
  try {
    await patient.save();
    response.send(patient);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/test", async (request, response) => {
  response.send('Hello world');
});
router.get("/patients", async (request, response) => {
    const patients = await patientModel.find({});
    console.log("patients:", patients);
    try {
      response.send(patients);
    } catch (error) {
      response.status(500).send(error);
    }
});

  module.exports = router;