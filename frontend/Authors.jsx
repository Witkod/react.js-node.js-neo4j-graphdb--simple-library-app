import React, {useState, useEffect} from 'react';
import axios from 'axios';

async function getAuthors() {
    const response = await axios.get('/authors');
    return response.data;
}

async function addAuthor(data) {
    await axios.post('/addAuthor', data);
}

async function deleteAuthors(data) {
    await axios.post('/deleteAuthors', data);
}

export function Authors(props) {
    const [authors, setAuthors] = useState([]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    function loadAuthors() {
        getAuthors().then(authors => {
          console.log('dzialaaam!');
            setAuthors(authors);
        })
    }

    async function finishAddingAuthor() {
        if (!name || !surname) {
            alert('brak wszystkich danych');
            return;
        }

        await addAuthor({name: name, surname: surname});
        loadAuthors();
        props.onNewAuthorAdded();
    }

    async function finishDeleteAuthors() {
        if (!name || !surname) {
            alert('brak wszystkich danych');
            return;
        }

        await deleteAuthors({name: name, surname: surname});
        loadAuthors();
        props.onNewAuthorAdded();
    }

    // useEffect(()=>{loadAuthors()},[]); 
    // console.log(authors);

    return <div>
        <div className="ToolForm">
            <p>Dodaj Autora</p>
            <input type="text" placeholder="Imie..." value={name} onChange={event => setName(event.target.value)} />
            <input type="text" placeholder="Nazwisko..." value={surname} onChange={event => setSurname(event.target.value)} />
            <br></br>
            <button className="MenuButton" onClick={finishAddingAuthor}>Dodaj</button>
            <br></br>
        </div>
        <br></br>
        <br></br>
        <div className="ToolForm">
            <p>Usun Autorow</p>
            <input type="text" placeholder="Imie..." value={name} onChange={event => setName(event.target.value)} />
            <input type="text" placeholder="Nazwisko..." value={surname} onChange={event => setSurname(event.target.value)} />
            <br></br>
            <button className="MenuButton" onClick={finishDeleteAuthors}>Usun</button>
            <br></br>
        </div>
    
    </div>
}