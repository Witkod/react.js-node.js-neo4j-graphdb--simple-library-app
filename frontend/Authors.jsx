import React, {useState, useEffect} from 'react';
import axios from 'axios';

async function getAuthors() {
    const response = await axios.get('/actors');

    return response.data;d
}

async function addActor(data) {
    await axios.post('/addAuthor', data);
}


export function Authors() {
    const [actors, setActors] = useState([]);
    const [name, setName] = useState('');

    function loadActors() {
        getAuthors().then(actors => {
          console.log(actors);
            setActors(actors);
        })
    }

    async function finishAddingActor() {
        if (!name) {
            alert('nazwa wymagana');
            return;
        }

        await addActor({name: name, born: 1992});

        loadActors();
    }

    useEffect(()=>{loadActors()},[]); //loading actors after first load site

    

    console.log(actors);


    return <div>
        <div>
            <div>Dodaj aktora (nowa nazwa: {name})</div>
            <input type="text" placeholder="Nazwa..." value={name} onChange={event => setName(event.target.value)} />
            <button onClick={finishAddingActor}>Dodaj</button>
        </div>
        <div>tu bedzie lista (ilosc aktorow: {actors.length})</div>
        <div>
            {actors.map(actor => {
                return <div className="actor">aktor tu bedzie (imie: {actor.properties.name})</div>
            })}
        </div>
        <div>
            <button onClick={loadActors}>laduj</button>
        </div>
    </div>
}