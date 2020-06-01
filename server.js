const fs = require('fs')
const express = require('express')
const app = express()
const port = 8080
const cityPath = './data.json'

app.use(express.static(__dirname + '/public'))

// Create 'get' request endpoint 
app.get('/cities', (req, res) => {
  console.log('Recieved a "Get" request')
  // Read the JSON Data
  fs.readFile(cityPath, 'utf8', (err, text) => {
    if (err) return res.status(500).send(err)

    // Filter Data
    const filteredCityData = JSON.parse(text).filter(item => item.State === 'Oregon')

    return res.json(filteredCityData)
  })
})

app.listen(port, () => console.log(`Server listening at port:${port}`))
