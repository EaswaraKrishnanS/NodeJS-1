const express = require('express')

const app = express()
const port = 2100

//parse JSON using express

app.use(express.json())
app.use(express.urlencoded({extended : false}))

let movies = [ 
{
    id : '1',
    title : 'Inception',
    director : 'Cristopher Nolan',
    year : '2010'
},
{
    id : '2',
    title : 'Openhimmer',
    director : 'Cristopher Nolan',
    year : '2023'
},
{
    id : '3',
    title : 'The Avengers',
    director : 'russo brothers',
    year : '2009'
}
];

//get the movie list in the form of json

app.get('/movies',(req,res) => {
    res.json(movies)
})

//add movie to the list

app.post('/movies',(req,res) => {
    const movie = req.body

    console.log(movie);
    movies.push(movie)
    res.send('Movie Is Added To The List')
    
})

//search for a movie in the list

app.get('/movies/:id',(req,res) => {
    const id = req.params.id

    for(let movie of movies) {
        if(movie.id === id){
            res.json(movie)
            console.log(movie);            
            return
        }
    }

    res.status(404).send('Movie Is Not Found')
})

//remove movie from the list

app.delete('/movies/:id',(req,res) => {
    const id = req.params.id

    movies = movies.filter(movie => {
        if(movie.id !== id) {
            return true
        }
        return false;
    });

    res.send('Movie Is Deleted')
    
})

//set the server to listen at port

app.listen(port,() => console.log(`Server Listening At Port ${port}`));

