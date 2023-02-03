import ListItem from './ListItem';
import React, { useState } from 'react';

export default function List({ setIsError} : {setIsError:React.Dispatch<React.SetStateAction<boolean>>}){


    const [list, setList] = useState<{}[]|null>(null);

    async function fetchList(){

        const url = 'http://localhost:3001/';

        fetch(url)
        .then( async (response)  => {
            if (response.ok) {
                const data:{}[] = await response.json();
                setList(data)
                return true;
            }
            return Promise.reject(response);
        })
        .catch((response => {
            console.log(response.status, response.statusText);
            setIsError(true);
            response.json().then((json: any) => {
                console.log(json);
              })
        }))
    };

    fetchList();

    return<section className = ' overflow-y-scroll h-5/6 w-full pl-5 pr-5 min-w-fit flex flex-col justify-center items-center'>
        {list
            ? list.map( item  => {
                return <ListItem action={''} complete={false} {...item}/>
            } )
            : <p className='text-2xl'>Loading...</p>
        }
    </section>
}