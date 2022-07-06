const express = require("express");
const patientModel = require("./models");
const app = express();

app.post("/add_patient", async (request, response) => {
    const patient = new patientModel(request.body);
  
    try {
      await patient.save();
      response.send(patient);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/patients", async (request, response) => {
    const patients = await patientModel.find({});
  
    try {
      response.send(patients);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  module.exports = app;