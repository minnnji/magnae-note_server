const express = require('express');
const meetings = express.Router();
const MeetingController = require('../controllers/meeting.controllers');

meetings.post('/', MeetingController.createMeeting);

meetings.post('/validation',
  MeetingController.passwordValidation,
  MeetingController.getMeetingById);

module.exports = meetings;
