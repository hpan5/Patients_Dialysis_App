const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { PatientModel, FilterModel, ScanModel } = require("./models");
const router = express.Router();

router.post("/addPatient", bodyParser.urlencoded({ extended: false}), async (request, response) => {
  if (!request.body.name) {
    response.status(400).send({message: 'Patient name content cannot be empty!'});
    return;
  }
  const patient = new PatientModel({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    barcode: request.body.barcode,
  });
  try {
    await patient.save();
    response.send(patient);
  } catch (error) {
    response.status(500).send(error);
  }
});
/*
case 1: check if patient already has a filter, if yes, send error
case 2: if partietient doesn't has a filter, get patient's filter, add the new scan info to the list
*/
router.get("/addScanByPatientId", bodyParser.urlencoded({ extended: false}), async (request, response) => {
    const patient = await PatientModel.findById(request.params.id);
    if (patient && patient.filter) {
     // const filter = await 
      const scan = new ScanModel({
        scanner_name: request.scanner_name || ''
      });
      patient.filter.scans.push(scan);
    } else {
      response.status(401).send({
        error: 'patient fetch error',
        patient: patient,
        patient_filter: patient.filter
      });
    }
    try {
      await patient.save();
    response.send(patient);
    } catch (error) {
      response.status(500).send(error);
    }
});

router.delete("/deleteAll", async (req, res) => {
  try {
      await PatientModel.deleteMany({});
      res.send("successfully deleted all the patients");
  } catch (err) {
      res.status(404).send({message : "didn't delete all the patients successfully"});
  }
})

router.get("/test", async (request, response) => {
  response.send('Hello world');
});

const isUndefined = (value) => {
  return (!value || typeof value == undefined || value === 'undefined' || value == null || value.length == 0 || value == "");
}

//helper funct
const isValidObject = (value) => {
  if (!value || typeof value == undefined || value === 'undefined' || value == null || value.length == 0 || value == "") {
      return false;
  } else {
      return true;
  }
}

module.exports = router;