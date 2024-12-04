const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/users',require('./Router/API/Users'))


app.listen(1200,() =>{
    console.log('Server startded on : 1200');
    
})