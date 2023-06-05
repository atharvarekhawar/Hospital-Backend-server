const express = require('express');
const router = express.Router();
const {register} = require('../controllers/Auth')
const {login} = require('../controllers/Auth')
const {patientRegister} = require('../controllers/Auth')
const {createReport, getAllPatientReports,getAllStatusReports} = require('../controllers/Patient');
const {isDoctor} = require('../middlewares/auth');

router.post('/doctors/register',register);
router.post('/doctors/login',login);
router.post('/patients/register',isDoctor,patientRegister);
router.post('/patients/create_report',isDoctor,createReport);
router.post('/patients/all_reports',isDoctor,getAllPatientReports);
router.post('/reports',isDoctor,getAllStatusReports);
module.exports = router;