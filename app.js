var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');
var cors = require('cors')

const authorApi = require('./author');
const bookApi = require('./book');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const USER_PASS = `b.fs2rKZ2XCYCA.wRTuwOvwWxj8JJxM`;
var drriver = neo4j.driver('bolt://hobby-jgiciegnhcgngbkejagpohel.dbs.graphenedb.com:24787', neo4j.auth.basic('user2',USER_PASS), {encrypted: true});
// var session = drriver.session();

app.use(cors());
app.use('/',express.static('./dist') );


app.post('/addAuthor', async function(req, res){
    const newAuthor = await authorApi.addAuthor(req.body, drriver.session());
    // console.log('new', newAuthor);
    res.json(newAuthor); 
})

app.post('/addBook', async function(req, res){
    const newBook = await bookApi.addBook(req.body, drriver.session());
    res.json(newBook);
})

app.get('/authors', async function(req, res){
    const response = await drriver.session().run( `MATCH (author:Author) RETURN author`);
    const recordsJson = response.records.map(record => record.toObject().author)
    res.json(recordsJson);   
})

// app.get('/actor/:name', async function(req, res){
//     const author = await authorApi.getAuthor(req.param('name'), session);
//     res.json(author);    
// })
app.get('/author', async function(req, res){
    const {authorName, authorSurname} = req.body;
    const author = await authorApi.getAuthor(authorName, authorSurname, drriver.session());
    res.json(author);    
})

app.get('/books', async function(req, res){
    const response = await drriver.session().run( `MATCH (book:Book) RETURN book`);
    const recordsJson = response.records.map(record => record.toObject().book)
    res.json(recordsJson);
})

app.post('/connectAuthor', async function(req, res){
    const {authorName, authorSurname, bookTitle} = req.body;
    const response = await drriver.session().run( `MATCH (author:Author) WHERE author.name = '${authorName}' AND author.surname = '${authorSurname}' MATCH (book:Book) WHERE book.title = '${bookTitle}' CREATE (book)-[:WroteBy]->(author) RETURN book, author`);

    const recordsJson = response.records.map(record => record.toObject())
     res.json(recordsJson);
})

app.get('/booksWithWriterInfo', async function(req, res){
    const response = await drriver.session().run( `MATCH (book:Book)-[:WroteBy]->(author:Author) RETURN author, book`);
  
    const recordsJson = response.records.map(record => record.toObject());
    // console.log(recordsJson);
    res.json(recordsJson);
})

app.post('/deleteAuthors', async function(req, res){
    const {name, surname} = req.body;
    const response = await drriver.session().run( `MATCH (n:Author { name: '${name}', surname: '${surname}'}) detach DELETE n`);
  
    // const recordsJson = response.records.map(record => record.toObject());
    // console.log(recordsJson);
    res.json(response);
})

app.post('/deleteBooks', async function(req, res){
    const {title} = req.body;
    const response = await drriver.session().run( `MATCH (n:Book { title: '${title}'}) detach DELETE n`);
  
    // const recordsJson = response.records.map(record => record.toObject());
    // console.log(recordsJson);
    res.json(response);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server started on port 3000');
});
