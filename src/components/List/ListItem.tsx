import React, { ChangeEventHandler, useState} from "react";

type Props = {
    item: { _id: string, action: string; completed: boolean; },
    setList: React.Dispatch<React.SetStateAction<{_id: string, action: string, completed:boolean}[]|[]>>,
    setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setEditModalText: React.Dispatch<React.SetStateAction<string>>,
    setItemCompleted: React.Dispatch<React.SetStateAction<boolean>>,
    setItemId: React.Dispatch<React.SetStateAction<string>>,
}

const ListItem = ( { item, setList, setIsEditModal, setEditModalText, setItemCompleted, setItemId  } : Props ) =>  {
    
    const {action, completed, _id} = item

    const [checked, setChecked] = useState<boolean>(completed)

    const updateItemInDatabase = async(checkboxStatus:boolean) => {
        try{
            const url = `http://localhost:3001/${_id}`;
            const data = await fetch(url, {
                method: 'PUT',         
                body: JSON.stringify({
                    action: action, 
                    completed: checkboxStatus}),
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

    //TODO: If the checkbox is clicked too quickly, requests cant be resolved fast enough.
    const handleChange: ChangeEventHandler<HTMLInputElement> = () => {
        if(checked){
            setChecked(false);
            updateItemInDatabase(false);
        }else{
            setChecked(true);
            updateItemInDatabase(true)
        } 
    }

    const deleteFromDatabase = async (itemId:string) => {
        try{
            const url = `http://localhost:3001/${itemId}`;
            const data = await fetch(url, {
                method: 'DELETE'    
            });
            const response = await data.json();
            console.log(response);
        }   
        catch(err){
            console.log(err)
        }
    }

    const handleEdit = (_id:string) => {
        setEditModalText(action);
        setItemId(_id);
        setItemCompleted(completed)
        setIsEditModal(true);
    }

    const handleDelete = ( _id:string) => {
        //state update to avoid having to fetch after every deletion
        setList(list => list.filter(item => item._id !== _id))
        deleteFromDatabase(_id)
    }

    return <div key = {_id} className='w-full bg-slate-600 flex justify-end mb-4 rounded-xl pl-4 pr-4 pb-1 pt-1'> 
        <p className='text-l sm:text-2xl whitespace-nowrap'>{ action }</p>
        <div className='w-2'></div>
        <input  className='accent-orange-500' type='checkbox' onChange={handleChange} checked= {checked ? true : false}/>
        <button className='bg-blue-400 rounded-xl' onClick={() =>{handleEdit(_id)}}>edit</button>
        <button className='bg-red-500 rounded-xl' onClick={() =>{handleDelete(_id)}}>delete</button>
    </div>
}

export default ListItem

