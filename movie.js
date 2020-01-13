var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');


module.exports.addMovie = async function addMovie(data, session) {
    // const name = data.name;
    // const born = data.born;
    const {title, tagline, released} = data;

    if (!title || !tagline || !released) {
        throw new Error('Incorrect data');
    }

    const response = await session.run(`CREATE (movie:Movie {title: '${title}', tagline: '${tagline}', released: ${released}}) RETURN movie`)
   

    // const newActor = response.records[0];
    const [newMovie] = response.records;

    return newMovie.toObject().movie;
}

module.exports.getMovie = async function getMovie(id, session) {
    const response = await session.run( `MATCH (movie:Movie) WHERE movie.id = ${id} RETURN movie`);
  
    // const newmovie = response.records[0];
    const [movieData] = response.records;

    return movieData.toObject().movie;
}
module.exports.getMovieByTitle = async function getMovieByTitle(title, session) {
    const response = await session.run( `MATCH (movie:Movie) WHERE movie.title = ${title} RETURN movie`);
  
    // const newmovie = response.records[0];
    const [movieData] = response.records;

    return movieData.toObject().movie;
}