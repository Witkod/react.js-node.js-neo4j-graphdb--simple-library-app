import React, {useState} from 'react';

import { Authors } from "./Authors";
import { Books } from "./Books";




function Licznik() {
    const [count, setCount] = useState(0);

    return <div><button onClick={() => {
        setCount(count + 1);
    }}>kliknij ({count})</button></div>
}

export function App() {
    return <div>
        <Licznik />
        <Licznik />
        <Licznik />
        <Authors />
        <Books />
    </div>
}