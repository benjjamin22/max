const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')

// Env vars
const API_BASE_URL = process.env.NAMS

// Init cache
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async(req, res, next) => {
    try {
        const apiRes = await needle('get', `${API_BASE_URL}`)
        const data = apiRes.body

        // Log the request to the public API
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}`)
        }

        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

module.exports = router