import { useState } from 'react';

type Props = {
    setModal: React.Dispatch<React.SetStateAction<string>>,
    list: { _id: string, action: string, completed: boolean }[]|[],
    setList: React.Dispatch<React.SetStateAction<{ _id: string, action: string, completed: boolean }[]|[]>>,
}

export default function AddItemModal({ setModal, list, setList } : Props){

    const [newItemText, setNewItemText] = useState<string>('')

    const [statusMessage, setStatusMessage] = useState<string>('')
    
    const updateItemText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemText(e.target.value); 
        console.log(newItemText)
    }

    const handleClose = () => {
        setModal('none')
    }

    const resetInputField = () => {
        (document.getElementById('input-box') as HTMLInputElement).value = '';
    }
   
    const addItemToDataBase = async() => {
        try{
            const url = 'https://naldhous-to-do-list.onrender.com/';
            const data = await fetch(url, {
                method: 'POST',         
                body: JSON.stringify({
                    action: newItemText, 
                    completed: false}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    }
            })
            const response = await data.json()
            if(response.success){
                setStatusMessage(`'${newItemText}' added to list!`);
                resetInputField();
                setList([...list, {_id: response.itemId, action:newItemText, completed:false}])
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleClick = () => {
        if(!newItemText.trim()){
            setStatusMessage('type something first!');
            resetInputField();
        }else{
            addItemToDataBase();
        }
    }

    return <>
        <section className= 'left-0 top-0 fixed w-screen h-screen flex flex-col justify-center items-center'>
            <section className= 'z-50 relative flex flex-col justify-around items-center w-2/3 sm:w-1/3 h-1/3 bg-slate-400'>
                <h3 className='text-2xl mt-4' >Add an Item</h3>
                <p>{statusMessage}</p>
                <input className='w-5/6 sm:w-1/2 rounded-xl pl-2' id='input-box' type='text' maxLength={25} onFocus={()=>{setStatusMessage('')}} onChange = {updateItemText}></input>
                <button className='bg-green-500 rounded-xl w-1/6 mt-2 mb-4' onClick = {handleClick}>add</button>   
                <button className='absolute right-0 top-0 mt-1 mr-3' onClick={handleClose}>close X</button>
            </section>
        <div onClick={handleClose} className= 'z-40 fixed left-0 top-0 bottom-0 right-0 w-full h-full bg-slate-900 opacity-50'></div>
        </section>
    </>
};