var express = require('express')
var path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
var fs = require('fs')
var ReactSSR = require('react-dom/server')
var favicon = require('serve-favicon')
var isDev = process.env.NODE_ENV === 'development'

var reslove = (__path) => path.join(__dirname, __path)

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: false }))

app.use(session({
    maxAge: 10 * 60 * 1000,
    name: 'tid',
    resave: false,
    saveUninitialized: false,
    secret: 'react cnode class'
}))

app.use(favicon(reslove('../faviocn.ico')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

if (!isDev) {
    var serverEntry = require('../dist/server-entry').default
    var template = fs.readFileSync(reslove('../dist/index.html'), 'utf8', function (err, data) {
        if(err) { return 500 }
    })
    app.use('/public', express.static(reslove('../dist')))
    app.get('*', function (req, res) {

        var appStirng = ReactSSR.renderToString(serverEntry)
        res.send(template.replace('<!-- app -->', appStirng))

    })
} else {
    var devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen(3000, function () {
    console.log('server is 3000')
})

