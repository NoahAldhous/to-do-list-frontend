import {useState} from 'react';

type Props = {
    setModal:React.Dispatch<React.SetStateAction<string>>,
    itemId: string,
    list: { _id: string, action: string, completed: boolean }[]|[],
    setList: React.Dispatch<React.SetStateAction<{ _id: string, action: string, completed: boolean }[]|[]>>,
    itemText: string,
}

export default function DeleteItemModal( {setModal, itemId, list, setList, itemText}: Props ){

    const [itemDeleted, setItemDeleted] = useState<boolean>(false);

    function handleClose(){
        setModal('none');
    }

    const deleteFromDatabase = async () => {
        try{
            const url = `https://naldhous-to-do-list.onrender.com/${itemId}`;
            const data = await fetch(url, {
                method: 'DELETE'    
            });
            const response = await data.json();
            if(response.success){
                setItemDeleted(true);
                setList(list => list.filter(item => item._id !== itemId))
            }
            console.log(response);
        }   
        catch(err){
            console.log(err)
        }
    }

    const handleDelete = () => {
        deleteFromDatabase();
        
    }

    return <>
    <section className= 'left-0 top-0 fixed w-screen h-screen flex flex-col justify-center items-center'>
        <section className= 'z-50 relative flex flex-col justify-around items-center w-2/3 sm:w-1/3 h-1/3 bg-slate-400'>
                <h3 className='text-2xl mt-4' >Delete Item</h3>
                {itemDeleted
                ? <p className='h-1/6'>item deleted!</p>
                : <p className='h-1/6'> </p>
                }
                <p>{itemText}</p>
                <button className='bg-red-500 rounded-xl w-1/6 mt-2 mb-4' onClick = {handleDelete}>delete</button>   
                <button className='absolute right-0 top-0 mt-1 mr-3' onClick={handleClose}>close X</button>
            </section>
            <div onClick={handleClose} className= 'z-40 fixed left-0 top-0 bottom-0 right-0 w-full h-full bg-slate-900 opacity-50'></div>
        </section>
    </>
}
