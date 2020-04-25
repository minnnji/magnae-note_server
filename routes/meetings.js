const express = require('express');
const meetings = express.Router();
const MeetingController = require('../controllers/meeting.controllers');

meetings.post('/', MeetingController.createMeeting);

module.exports = meetings;
