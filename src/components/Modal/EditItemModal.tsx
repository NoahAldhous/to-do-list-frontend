import { useState } from 'react';

type Props = {
    setModal: React.Dispatch<React.SetStateAction<string>>,
    itemText: string,
    itemCompleted: boolean,
    itemId: string,
    list: { _id: string, action: string, completed: boolean }[]|[],
    setList: React.Dispatch<React.SetStateAction<{ _id: string, action: string, completed: boolean }[]|[]>>,
}

export default function EditItemModal({setModal, itemText, itemCompleted, itemId, list, setList} : Props){

    const [editItemText, setEditItemText] = useState<string>(itemText)

    const [newItemUpdated, setNewItemUpdated] = useState<boolean>(false)
    
    const updateItemText = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('change detected')
        setEditItemText(e.target.value); 
        console.log(editItemText)
    }

    const handleClose = () => {
        setModal('none')
    }
   
    const updateItemInDatabase = async() => {
        try{
            const url = `https://naldhous-to-do-list.onrender.com/${itemId}`;
            const data = await fetch(url, {
                method: 'PUT',         
                body: JSON.stringify({
                    action: editItemText, 
                    completed: itemCompleted}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    }
            })
            const response = await data.json()
            console.log(response);
            if(response.success){
                setNewItemUpdated(true);
                updateLocalList();
            }
        }catch(err){
            console.log(err)
        }
    }

    const updateLocalList = () => {
        const newList = list.map(item=> item._id === itemId ? {_id:item._id, action:editItemText, completed:item.completed} : item);
        setList(newList)
    }

    const handleEdit = () => {
        updateItemInDatabase();
    }

    return <>
        <section className= 'left-0 top-0 fixed w-screen h-screen flex flex-col justify-center items-center'>
            <section className= 'z-50 relative flex flex-col justify-around items-center w-2/3 sm:w-1/3 h-1/3 bg-slate-400'>
                <h3 className='text-2xl mt-4' >Edit Item</h3>
                {newItemUpdated
                ? <p className='h-1/6'>item updated!</p>
                : <p className='h-1/6'> </p>
                }
                <input className='w-1/2 rounded-xl pl-2' id='input-box' type='text' maxLength={25} value={editItemText} onFocus={()=>{setNewItemUpdated(false)}} onChange = {updateItemText}></input>
                <button className='bg-blue-500 rounded-xl w-1/6 mt-2 mb-4' onClick = {handleEdit}>save</button>   
                <button className='absolute right-0 top-0 mt-1 mr-3' onClick={handleClose}>close X</button>
            </section>
        <div onClick={handleClose} className= 'z-40 fixed left-0 top-0 bottom-0 right-0 w-full h-full bg-slate-900 opacity-50'></div>
        </section>
    </>
};