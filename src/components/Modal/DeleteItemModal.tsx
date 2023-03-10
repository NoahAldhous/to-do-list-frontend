
type Props = {
    setModal:React.Dispatch<React.SetStateAction<string>>,
}

export default function DeleteItemModal( {setModal}: Props ){

    function handleClose(){
        setModal('none')
        //TODO: ensure fetch is called again on close
    }

    function handleDelete(){
       //TODO: write handle delete function
    }

    return <>
    <section className= 'left-0 top-0 fixed w-screen h-screen flex flex-col justify-center items-center'>
        <section className= 'z-50 relative flex flex-col justify-around items-center w-2/3 sm:w-1/3 h-1/3 bg-slate-400'>
                <h3 className='text-2xl mt-4' >Delete Item</h3>
                {/* {requestComplete
                ? <p className='h-1/6'>item deleted!</p>
                : <p className='h-1/6'> </p>
                } */}
                <button className='bg-blue-500 rounded-xl w-1/6 mt-2 mb-4' onClick = {handleDelete}>delete</button>   
                <button className='absolute right-0 top-0 mt-1 mr-3' onClick={handleClose}>close X</button>
            </section>
            <div onClick={handleClose} className= 'z-40 fixed left-0 top-0 bottom-0 right-0 w-full h-full bg-slate-900 opacity-50'></div>
        </section>
    </>
}
