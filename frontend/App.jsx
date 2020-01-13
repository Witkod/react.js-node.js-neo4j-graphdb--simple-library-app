import React, {useState} from 'react';

import { Actors } from "./Actors";
import { Movies } from "./Movies";




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
        <Licznik />
        <Actors />
        <Movies />
    </div>
}