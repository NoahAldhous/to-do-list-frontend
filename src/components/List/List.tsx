import ListItem from './ListItem';
import React, { useState, useEffect} from 'react';

type Props = {
    isModal:boolean,
    setIsError:React.Dispatch<React.SetStateAction<boolean>>,
    isEditModal:boolean
    setIsEditModal:React.Dispatch<React.SetStateAction<boolean>>,
    setEditModalText: React.Dispatch<React.SetStateAction<string>>,
    setItemCompleted: React.Dispatch<React.SetStateAction<boolean>>,
    setItemId: React.Dispatch<React.SetStateAction<string>>,
}

export default function List({ isModal, setIsError, isEditModal, setIsEditModal, setEditModalText, setItemCompleted, setItemId }: Props){

    const [list, setList] = useState<{_id: string, action: string, completed:boolean}[]|[]>([]);

    async function fetchList(){

        const url = 'https://naldhous-to-do-list.onrender.com/';
        console.log(`sending request to ${url}`)
        await fetch(url)
        .then( async (response)  => {
            if (response.ok) {
                console.log(response)
                const data:{request:string, success: boolean, message:{_id: string, action: string, completed:boolean}[]} = await response.json();
                console.log(data.message)
                setList(data.message)
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

    useEffect(() => {
        fetchList();
        console.log('fetchlist called')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isModal, isEditModal])

    return<section className = ' overflow-y-scroll h-5/6 w-full pl-5 pr-5 min-w-fit flex flex-col justify-center items-center'>
        {list.length > 0
            ? list.map( item  => 
                {
                return <ListItem key = {item._id} item = {item} setList = {setList} setIsEditModal = {setIsEditModal} setEditModalText= {setEditModalText} setItemCompleted = {setItemCompleted} setItemId = {setItemId}/>
                })
            : <p className='text-2xl'>Loading...</p>
        }
    </section>
}