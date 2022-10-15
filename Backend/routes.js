const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {patientModel, FilterModel} = require("./models");
const router = express.Router();
/*
1. check if filter exists alreay, if yes, send error
2. else, create new filter
3. 
*/
router.post("/addPatient", bodyParser.urlencoded({ extended: false}), async (request, response) => {
  const body = request.body || {};
  if (!body.name) {
    response.status(400).send({message: 'Patient name content cannot be empty!'});
    return;
  }
  //create a new patient base on the patient model except for the filter information
  const patient = new patientModel({
    _id: new mongoose.Types.ObjectId(),
    name: body.name,
    barcode: body.barcode,
    scans: body.scans || []
  });
  try {
    //check if the filter is being used
    const exisiting_filter = body.filter_barcode && await FilterModel.findOne({ barcode: body.filter_barcode });
    if (exisiting_filter) {
      response.status(400).send('Preset filter exists and being used already');
      return;
    }
    //if not used, we can create a new filter and store inside the patient info
    const new_filter = new FilterModel({
      _id: new mongoose.Types.ObjectId(),
      patient_id: patient._id,
      barcode: body.filter_barcode,
    })
    await new_filter.save();
    patient.filter = new_filter;
    patient.filter_barcode = new_filter.barcode;
    await patient.save();
    response.send(patient);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/fetchFilterbyBarcode", async (request, response) => {
  const barcode = request.query && request.query.barcode;
  if (!barcode) {
    response.status(400).send('query barcode is not defined or valid');
    return;
  }
  const filter = await FilterModel.findOne({ barcode: barcode});
  console.log("filter:", filter);
  try {
    response.send(filter);
  } catch (error) {
    response.status(500).send(error);
  }
});


router.get("/fetchPatients", async (request, response) => {
    const patients = await patientModel.find({});
    console.log("patients:", patients);
    try {
      response.send(patients);
    } catch (error) {
      response.status(500).send(error);
    }
});

router.delete("/deleteAll", async (req, res) => {
  try {
      await patientModel.deleteMany({});
      await FilterModel.deleteMany({});
      res.send("successfully deleted all the patients");
  } catch (err) {
      res.status(404).send({message : "didn't delete all the patients successfully"});
  }
})
  module.exports = router;

  router.get("/test", async (request, response) => {
    response.send('Hello world');
  });