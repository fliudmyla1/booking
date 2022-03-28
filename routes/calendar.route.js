const express = require('express')
const router = express.Router()
const calendarController = require('../controllers/calendar.controller')

router.route('/')
	.get(calendarController.list)
	.post(calendarController.booking)

router.route('/warehouse')
	.get(calendarController.warehouses)

router.route('/download/:attachment')
	.get(calendarController.download)


router.route('/:bookingId')
	.put(calendarController.move)
	.delete(calendarController.deleteById)

module.exports = router
