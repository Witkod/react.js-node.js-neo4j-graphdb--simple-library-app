var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');

module.exports.addActor = async function addActor(data, session) {
    // const name = data.name;
    // const born = data.born;
    const {name, born} = data;

    if (!name || !born) {
        throw new Error('Incorrect data');
    }

    const response = await session.run(`CREATE (actor:Actor {name: '${name}', born: ${born}}) RETURN actor`)
   

    // const newActor = response.records[0];
    const [newActor] = response.records;


    

    return newActor.toObject().actor;
}

module.exports.getActor = async function getActor(name, session) {
    const response = await session.run( `MATCH (actor:Actor)-[:PlaysIn]->(movie:Movie) WHERE actor.name = '${name}' RETURN actor, movie`);
  
    // const newActor = response.records[0];
    const [actorData] = response.records;

    console.log('co mamy', actorData.toObject());

    return actorData.toObject();
}
