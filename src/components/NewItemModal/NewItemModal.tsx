import { useState } from 'react';

export default function NewItemModal({setIsModal} : {setIsModal:React.Dispatch<React.SetStateAction<boolean>>}){

    const [newItemText, setNewItemText] = useState<string>('')

    const [newItemAdded, setNewItemAdded] = useState<boolean>(false)
    
    const updateItemText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemText(e.target.value); 
        console.log(newItemText)
    }

    const handleClose = () => {
        setIsModal(false)
    }
   
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
            if(response){
                setNewItemAdded(true);
                (document.getElementById('input-box') as HTMLInputElement).value = '';
            }
            console.log(response.message)
        }catch(err){
            console.log(err)
        }
    }

    const handleClick = () => {
        addItemToDataBase();
    }

    return <>
        <section className= 'left-0 top-0 fixed w-full h-full flex flex-col justify-center items-center'>
            <section className= 'z-50 relative flex flex-col justify-center items-center w-1/2 h-1/4 bg-slate-400'>
                {newItemAdded
                ? <p>item added!</p>
                : <p> </p>
                }
                <input id='input-box' type='text' onFocus={()=>{setNewItemAdded(false)}} onChange = {updateItemText}></input>
                <button onClick = {handleClick}>add</button>   
                <button className='absolute right-0 top-0 mt-1 mr-3' onClick={handleClose}>close X</button>
            </section>
        <div onClick={handleClose} className= 'z-40 fixed left-0 top-0 bottom-0 right-0 w-full h-full bg-slate-900 opacity-50'></div>
        </section>
    </>
};