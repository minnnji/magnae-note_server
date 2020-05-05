const express = require('express');
const meetings = express.Router();
const meetingController = require('../controllers/meeting.controllers');

meetings.post('/', meetingController.createMeeting);

meetings.post('/validation',
  meetingController.passwordValidation,
  meetingController.getMeetingById);

meetings.put('/:meeting_id',
  meetingController.updateMeeting);

module.exports = meetings;
