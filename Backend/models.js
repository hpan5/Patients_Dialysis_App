const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScanSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    nurse_name: {
        type: String,
    }
});

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  patient_barcode: {
    type: Number,
    default: 0,
  },
  filter_barcode: {
    type: Number,
    default: 0,
  },
  Scans: [ScanSchema],
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;