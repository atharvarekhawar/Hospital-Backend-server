const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  status: {
    type: String,
    enum: [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",
    ],
    required: true,
  },
},
{
  timestamps:true,
}
);
const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
