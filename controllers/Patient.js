const Report = require('../models/reportModel');
const Patient = require('../models/patientModel');
const Docter = require("../models/doctorModel");
const {mongoose} = require('mongoose');

exports.createReport = async (req, res) => {
    try {
        const { status,patientId } = req.body;
        const docterId = new mongoose.Types.ObjectId(req.user.id);

        const newReport = await Report.create({
            createdBy:docterId,
            status,
        });

       const updatedPatient = await Patient.findByIdAndUpdate(patientId, {
            $push: {
                reports: newReport._id
            },
        },{new:true});

        return res.status(200).json({
            success: true,
            message: "Report created successfully",
            updatedPatient
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create Report"
        });
    }
}
exports.getAllPatientReports = async (req, res) => {
    try {
        const {patientId} = req.body;

        const patient = await Patient.findOne({_id:patientId}).populate("reports").exec();

        const allReports = patient.reports.sort((a,b)=>b.createdAt - a.createdAt);
        console.log(allReports);
        return res.status(200).json({
            success: true,
            message: "Reports found successfully",
            allReports
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to find Reports",
        });
    }
}
exports.getAllStatusReports = async (req, res) => {
    try {
        
        const {status} = req.body;

        const allReports = await Report.find({status:status});


        return res.status(200).json({
            success: true,
            message: "Report found successfully with given status",
            allReports
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to find Reports with given status",
        });
    }
}