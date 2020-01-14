import React, {useState} from 'react';
import axios from 'axios';

async function getActors() {
    const response = await axios.get('http://localhost:3000/actors');

    return response.data;
}

async function addActor(data) {
    await axios.post('http://localhost:3000/addActor', data);
}


export function Books() {
    const [actors, setActors] = useState([]);
    const [name, setName] = useState('');

    function loadActors() {
        getActors().then(actors => {
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