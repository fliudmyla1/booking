const express = require('express')
const passport = require('passport')

const authRoute =  require('./auth.route')
const userRoute = require('./user.route')
const countryRoute = require('./country.route')
const companyRoute = require('./company.route')
const warehouseRoute = require('./warehouse.route')
const slotRoute = require('./slot.route')
const calendarRoute = require('./calendar.route')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/user', passport.authenticate('jwt', { session: false }), userRoute)
router.use('/country', passport.authenticate('jwt', { session: false }), countryRoute)
router.use('/company', passport.authenticate('jwt', { session: false }), companyRoute)
router.use('/warehouse', passport.authenticate('jwt', { session: false }), warehouseRoute)
router.use('/slot', passport.authenticate('jwt', { session: false }), slotRoute)
router.use('/calendar', passport.authenticate('jwt', { session: false }), calendarRoute)

module.exports = router
