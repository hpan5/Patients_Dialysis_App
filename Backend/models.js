const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScanSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    scanner_name: {
        type: String,
    }
});

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    default: 0,
  },
  filter_id: string,
  filter_barcode: {
    type: String,
    default: 0,
  },
  Scans: [ScanSchema],
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;