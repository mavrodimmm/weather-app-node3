const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=53c2c307660e365d9752b73c8478c296&query=' + latitude + ', ' + longitude + '&units=f'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback(body.error.info, undefined)
        } else{
            const data = body.current.weather_descriptions[0] + ': It is currently ' + body.current.temperature +
            ' degrees out. It feels like ' + body.current.feelslike + ' degrees.'
            callback(undefined, data)
        }
        
    })
}

module.exports = forecast

