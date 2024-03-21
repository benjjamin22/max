const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const errorHandler = require('./middleware/error')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 100,
})
app.use(limiter)
app.set('trust proxy', 1)

// Enable cors
app.use(cors())
let option = { maxAge: "5" }

// Set static folder
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    setHeaders: setCustomCachedControl
}));

function setCustomCachedControl(res, path) {
    if (serveStatic.mime.lookup(path) === 'text/html') {
        res.setHeaders('Cach-Control', 'public,max-age=0')
    }
}

//app.get(["/tre", "/index.html"], (req, res) => {
//   res.sendFile(__dirname + "/index.html");
//})



// Routes
app.use('/api', require('./routes'))
app.use('/nams', require('./routes/nams'))

// Error handler middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))