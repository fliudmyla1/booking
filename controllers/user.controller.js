const userModel = require('../models/user.model')
const companyModel = require('../models/company.model')
const config = require('../config')
const nodemailer = require('nodemailer')

async function list(req, res) {
    const { email, username, company, page, perPage } = req.query

    let query = { 
        email: new RegExp(email, 'i'),
        username: new RegExp(username, 'i')
    }

    if (company != -1) query['company'] = company

    let list = await userModel.find(query).populate('company').limit(+perPage).skip((page - 1) * perPage)
    let total = await userModel.count(query)
    let companies = await companyModel.find()
    res.json({ result: 1, data: { list, total, companies }})
}

async function add(req, res) {
    const { email, username, userType, company } = req.body

    let user  = new userModel()

    user.email = email
    user.username = username
    user.userType = userType
    user.company = company
    user.password = config.defaultPassword

    let newUser = await user.save()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        secureConnection: true,
        auth: {
            user: config.emailUser,
            pass: config.emailPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    transporter.sendMail({
        from: config.emailUser,
        to: newUser.email,
        subject: 'Account Created!',
        text: 'Hi! There, Your Account is created. Password is ' + config.emailPassword
    }, (err, info) => {
        if (err) {
            console.log(err)
            throw Error(err);
        }
        console.log('Email Sent Successfully');
        console.log(info);
    })

    res.json({ result: 1 })
}

async function edit(req, res) {
    let { email, username, userType, company } = req.body
    await userModel.updateOne({ _id: req.params.userId }, { email, username, userType, company })
    res.json({ result: 1 })
}

async function deleteById(req, res) {
    await userModel.deleteOne({ _id: req.params.userId })
    res.json({ result: 1 })
}

async function resetPassword(req, res) {
	let user = await userModel.findById(req.params.userId)
	user.password = config.defaultPassword
	await user.save()
	res.json({ result: 1 })
}

module.exports = {
    list,
    add,
    edit,
    deleteById,
    resetPassword
}