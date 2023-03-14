import React, { ChangeEventHandler, useState} from "react";

type Props = {
    item: { _id: string, action: string; completed: boolean; },
    setList: React.Dispatch<React.SetStateAction<{_id: string, action: string, completed:boolean}[]|[]>>,
    setItemText: React.Dispatch<React.SetStateAction<string>>,
    setItemCompleted: React.Dispatch<React.SetStateAction<boolean>>,
    setItemId: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<string>>,
}

const ListItem = ( { item, setList, setItemText, setItemCompleted, setItemId, setModal  } : Props ) =>  {
    
    const {action, completed, _id} = item

    const [checked, setChecked] = useState<boolean>(completed)

    const updateItemInDatabase = async(checkboxStatus:boolean) => {
        try{
            const url = `https://naldhous-to-do-list.onrender.com/${_id}`;
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

    const handleEdit = (_id:string) => {
        setItemText(action);
        setItemId(_id);
        setItemCompleted(completed)
        setModal('edit')
    }

    const handleDelete = ( _id:string) => {
        //state update to avoid having to fetch after every deletion
        setItemText(action);
        setItemId(_id);
        setModal('delete');
    }

    return <section className = 'w-full flex justify-around mb-4'>
        <section key = {_id} className='w-2/3 bg-slate-800 hover:bg-slate-700 flex justify-end rounded-xl pl-4 pr-4 pb-1 pt-1'> 
            <p className='cursor-pointer truncate text-s md:text-l sm:text-xl text-slate-200' onClick={() => handleEdit(_id)}>{ action }</p>
            <div className='w-2'></div>
            <input  className='accent-orange-500' type='checkbox' onChange={handleChange} checked= {checked ? true : false}/>
        </section>
        <section className='w-1/3 flex items-center justify-around'>
            <button className='bg-blue-500 rounded-xl w-1/2 h-5/6 ml-2 mr-1' onClick={() =>{handleEdit(_id)}}>edit</button>
            <button className='bg-red-500 rounded-xl w-1/2 h-5/6 ml-1' onClick={() =>{handleDelete(_id)}}>delete</button>
        </section>
        
    </section> 
}

export default ListItem

