import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Authors} from "./Authors";

async function getBooks() {
    const response = await axios.get('/books');

    return response.data;
}

async function getAuthors() {
    const response = await axios.get('/authors');
    return response.data;

}

async function getBooksWithWriterInfo() {
    const response = await axios.get('/booksWithWriterInfo');
    return response.data;
}

async function addBook(data) {
    await axios.post('/addBook', data);
}

async function deleteBooks(data) {
    const response = await axios.post('/deleteBooks', data);
    console.log(response);
}

async function connectAuthor(data){
    await axios.post('/connectAuthor', data)
}


export function Books() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [authorss, setAuthorss] = useState([]);
    const [booksWithWriters, setBooksWithWriters] = useState([]);
    const [titleToConnect, setTitleToConnect] = useState('');
    const [nameToConnect, setNameToConnect] = useState('');

    function loadBooksWithWriterInfo() {
        getBooksWithWriterInfo().then(books =>{
            setBooksWithWriters(books);
        })
    }

    function loadAuthors() {
        getAuthors().then(authors =>{
            setAuthorss(authors);
        })
    }

    function loadBooks() {
        getBooks().then(books => {
            setBooks(books);
        })
    }

    async function finishDeleteBooks() {
        if (!title) {
            alert('tytul wymagany');
            return;
        }

        await deleteBooks({title: title});

        loadBooks();
        loadAuthors();
        loadBooksWithWriterInfo();
    }

    async function finishAddingBook() {
        if (!title) {
            alert('tytul wymagany');
            return;
        }

        await addBook({title: title});

        loadBooks();
        loadAuthors();
        loadBooksWithWriterInfo();
    }

    async function finishConnectingAuthor() {
        const authorData = nameToConnect.split(" ");
        console.log(authorData);
        console.log(authorData[0]);
        console.log(authorData[1]);
        console.log(titleToConnect);
        if (!titleToConnect || !authorData[0] || !authorData[1]) {
            alert('brak wszystkich danych');
            return;
        }
        
        await connectAuthor({authorName: authorData[0], authorSurname: authorData[1], bookTitle: titleToConnect});

        loadBooks();
        loadAuthors();
        loadBooksWithWriterInfo();
    }

    useEffect(()=>{loadBooks()},[]);
    useEffect(()=>{loadAuthors()},[]); 
    useEffect(()=>{loadBooksWithWriterInfo()},[]); 
    // console.log(books);


    return <div>
    <div className="mainS">
        <div>
        <div className="ToolForm">
            <p>Dodaj Ksiazke</p>
            <input type="text" placeholder="Tytul..." value={title} onChange={event => setTitle(event.target.value)} />
            <br></br>
            <button className="MenuButton" onClick={finishAddingBook}>Dodaj</button>
            <br></br>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="ToolForm">
            <p>Usun Ksiazki</p>
            <input type="text" placeholder="Tytul..." value={title} onChange={event => setTitle(event.target.value)} />
            <br></br>
            <button className="MenuButton" onClick={finishDeleteBooks}>Usun</button>
            <br></br>
        </div>
        </div>
        <Authors onNewAuthorAdded={() => {
            loadAuthors();
        }} />
        <div className="ToolForm">
            <p>Przypisz autora do ksiazki</p>
            <select onChange={event => setTitleToConnect(event.target.value)}>
                <option value={''}> </option>
                {books.map(book => {
                    return <option value={book.properties.title}> {book.properties.title}</option>
                })}
            </select>
            <br></br>
            <select onChange={event => setNameToConnect(event.target.value)}>
            <option value={''}> </option>
            {authorss.map(author => {
                    return <option value={author.properties.name+' '+author.properties.surname}> {author.properties.name} {author.properties.surname} </option>
                })}
            </select>
            <br></br>
            <button className="MenuButton" onClick={finishConnectingAuthor}>Przypisz</button>
            <br></br>
        </div>
        <div>
            <a href="docs.html" target="_blank"><button className="MenuButton" a>Dokumentacja</button></a>
            <br></br><br></br><br></br>
        
        <div className="contentS">
        <table >
            <thead><td>Tytul Ksiazki</td><td>Imie Autora</td><td>Nazwisko Autora</td></thead>
            <tbody>
            {booksWithWriters.map(bookAndAuthor =>{
                return <tr><td>{bookAndAuthor.book.properties.title}</td><td>{bookAndAuthor.author.properties.name}</td><td>{bookAndAuthor.author.properties.surname}</td></tr>
            })}
            </tbody>
        </table>
	    </div>
        </div>
        {/* <iframe src="docs.html">
        <p>Your browser does not support iframes.</p>
        </iframe> */}
    </div>
    
    </div>
}