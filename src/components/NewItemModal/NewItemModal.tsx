import { useState } from 'react';

export default function NewItemModal({setIsModal} : {setIsModal:React.Dispatch<React.SetStateAction<boolean>>}){

    const [newItemText, setNewItemText] = useState<string>('')

    //TODO:function updateItemText that will update state of NewItemText
    const updateItemText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemText(e.target.value); 
        console.log(newItemText)
    }


    //TODO:function addItemToDatabase that will send POST request to DB
    const addItemToDataBase = async() => {
        try{
            const url = 'http://localhost:3001/';
            const data = await fetch(url, {
                method: 'POST',         
                body: JSON.stringify({
                    action: newItemText, 
                    completed: false}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    }
            })
            console.log(data);
            const response = await data.json()
            console.log(response.message)
        }catch(err){
            console.log(err)
        }
    }

    const handleClick = () => {
        addItemToDataBase();
    }

    return <>
        <section className= 'z-50 left-0 top-0 fixed w-full h-full bg-none flex flex-col justify-center items-center'>
            <section className= 'relative flex flex-col justify-center items-center w-1/2 h-1/4 bg-slate-400'>
                <input type="text" onChange = {updateItemText}></input>
                <button onClick = {handleClick}>add</button>   
                <button className='absolute right-0 top-0 mt-1 mr-3' onClick={() => setIsModal(false)}>close X</button>
            </section>
        </section>
        <div className= 'z-40 fixed left-0 top-0 bottom-0 right-0 w-full h-full bg-slate-800 opacity-50'></div>
    </>
};