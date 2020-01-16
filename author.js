var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');

module.exports.addAuthor = async function addAuthor(data, session) {
    // const name = data.name;
    // const surname = data.surname;
    const {name, surname} = data;

    if (!name || !surname) {
        throw new Error('Incorrect data');
    }

    const response = await session.run(`CREATE (author:Author {name: '${name}',surname: '${surname}'}) RETURN author`)
   
    // const newAuthor = response.records[0];
    const [newAuthor] = response.records;
    return newAuthor.toObject().author;
}

module.exports.getAuthor = async function getAuthor(name, surname, session) {
    const response = await session.run( `MATCH (book:Book)-[:WroteBy]->(author:Author) WHERE author.name = '${name}' AND author.surname = '${surname}' RETURN author, book`);
  
    // const newActor = response.records[0];
    const [authorData] = response.records;

    console.log('co mamy', authorData.toObject());
    return authorData.toObject();
}
