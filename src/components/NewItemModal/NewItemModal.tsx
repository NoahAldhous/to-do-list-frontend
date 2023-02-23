export default function NewItemModal({setIsModal} : {setIsModal:React.Dispatch<React.SetStateAction<boolean>>}){

    return <>
        <section className= 'z-50 left-0 top-0 fixed w-full h-full bg-none flex flex-col justify-center items-center'>
            <section className= 'relative flex flex-col justify-center items-center w-1/2 h-1/4 bg-slate-400'>
                <input type="text"></input>
                <button>add</button>   
                <button className='absolute right-0 top-0 mt-1 mr-3' onClick={() => setIsModal(false)}>close X</button>
            </section>
        </section>
        <div className= 'z-40 fixed left-0 top-0 bottom-0 right-0 w-full h-full bg-green-100 opacity-50'></div>
    </>
};