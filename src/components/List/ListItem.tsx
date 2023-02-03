

const ListItem = ({ item }: {item:{ itemNumber: number, action: string; complete: boolean; }}) =>  {
    const {action, complete, itemNumber} = item
    return <div key = {itemNumber} className='w-full bg-slate-600 flex justify-end mb-4 rounded-xl pl-4 pr-4 pb-1 pt-1'> 
        <p className='text-l sm:text-2xl whitespace-nowrap'>{ action }</p>
        <div className='w-2'></div>
        <input  className='accent-orange-500' type='checkbox' checked= {complete ? true : false}/>
    </div>
}

export default ListItem

