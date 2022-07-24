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

const FilterSchema = new Schema({
  barcode: {
    type: String,
    default: 0,
  },
  Scans: [ScanSchema]
})

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    default: 0,
  },
  filter_barcode: {
    type: String,
    default: 0,
  },
  Filter: { type: Schema.Types.ObjectId, ref: 'FilterModel' }
});

const FilterModel = mongoose.model("Filter", FilterSchema);
const PatientModel = mongoose.model("Patient", PatientSchema);

module.exports =  {PatientModel, FilterModel};