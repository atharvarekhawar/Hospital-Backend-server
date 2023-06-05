const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "patient",
  },
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
},
{
  timestamps:true,
}
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
