import React, {useState} from 'react';

import { Books } from "./Books";
import { Authors } from "./Authors";

export function App() {
    return <div>
        <div className="headerS">
            <h1>Spis Ksiazek</h1>
	    </div>
        <div className="mainDiv">
            <Books />
        </div>
    </div>
}