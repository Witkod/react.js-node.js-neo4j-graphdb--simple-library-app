var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');


module.exports.addBook = async function addBook(data, session) {
    // const name = data.name;
    // const born = data.born;
    const {title} = data;
    if (!title) {
        throw new Error('Incorrect data');
    }

    const response = await session.run(`CREATE (book:Book {title: '${title}'}) RETURN book`)
   
    // const newActor = response.records[0];
    const [newBook] = response.records;
    session.close();
    return newBook.toObject().book;
}

// Get book by id
module.exports.getBook = async function getBook(id, session) {
    const response = await session.run( `MATCH (book:Book) WHERE book.id = ${id} RETURN book`);
  
    // const newmovie = response.records[0];
    const [bookData] = response.records;
    return bookData.toObject().book;
}

// Get book by title
module.exports.getBookByTitle = async function getBookByTitle(title, session) {
    const response = await session.run( `MATCH (book:Book) WHERE book.title = ${title} RETURN book`);
  
    // const newmovie = response.records[0];
    const [bookData] = response.records;
    return bookData.toObject().book;
}

// Get all books with writer info
module.exports.getBooksWithWriter = async function getBooksWithWriter(session) {
    const response = await session.run( `MATCH (book:Book)-[:WroteBy]->(author:Author) RETURN collect(distinct author, distinct book)`);
  
    // const newActor = response.records[0];
    const [booksData] = response.records;

    console.log('co mamy', booksData.toObject());
    return booksData.toObject();
}