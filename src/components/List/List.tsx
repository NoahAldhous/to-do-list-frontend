import ListItem from './ListItem';
import { useState } from 'react';

export default function List(){

    const [list, setList] = useState<{}[]|null>(null);

    async function fetchList(){
        const response = await fetch('http://localhost:3001/');
        const data:{}[] = await response.json();
        setList(data)
    };

    fetchList();

    return<section className = ' overflow-y-scroll h-5/6 w-full pl-5 pr-5 min-w-fit flex flex-col items-center'>
        {list
            ? list.map( item  => {
                return <ListItem action={''} complete={false} {...item}/>
            } )
            : <p>Loading...</p>
        }
    </section>
}