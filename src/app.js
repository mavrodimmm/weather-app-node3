const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

//path.join('/Users/nikitafedotov/Desktop/LearningMaterials/NODE/programs/web-server/public')

const app = express()

const port = process.env.PORT || 3000

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Nikita Fedotov"
    })
})

app.get('/help', (req, res)  => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help page',
        name: 'Nikita Fedotov'
    })
})

app.get('/about', (req, res)  => {
    res.render('about', {
        title: 'About Page',
        name: 'Nikita Fedotov'
    })
})

app.get('/weather', (req, res)  => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) =>  {
        if (error){
            return res.send({error})
        }
        forecast (latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide search argument'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikita',
        errorMessage: 'Help Page'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Nikita',
        errorMessage: 'Help Page'
    })
})

app.listen(port, () => {
    console.log('Server Running on Port ' + port)
})