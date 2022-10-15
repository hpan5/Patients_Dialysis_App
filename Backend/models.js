const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScanSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    patient_name: String
});

const FilterSchema = new Schema({
  barcode: String,
  patient_id: String,
  closed_date: Date
});

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  barcode: String,
  filter_barcode: String,
  filter: { type: Schema.Types.ObjectId, ref: 'Filter' },
  Scans: [ScanSchema],
});


const FilterModel = mongoose.model("Filter", FilterSchema);
const patientModel = mongoose.model("Patient", PatientSchema);
module.exports = { patientModel, FilterModel };