


import React, { useContext, createContext, useState} from 'react';


export const ComponentContextStore = createContext();

export default function CompContextStoreProvider(props){
    const [title, setTitle] = useState('Test Title from Context Provider');


    return(

        <ComponentContextStore.Provider value={{
            title: title,
        }}>

            {props.children}
        </ComponentContextStore.Provider>

    )

}