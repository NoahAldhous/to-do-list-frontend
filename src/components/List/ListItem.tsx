

const ListItem = ({ item }: {item:{ _id: string, action: string; complete: boolean; }}) =>  {
    const {action, complete, _id} = item
    return <div key = {_id} className='w-full bg-slate-600 flex justify-end mb-4 rounded-xl pl-4 pr-4 pb-1 pt-1'> 
        <p className='text-l sm:text-2xl whitespace-nowrap'>{ action }</p>
        <div className='w-2'></div>
        <input  className='accent-orange-500' type='checkbox' checked= {complete ? true : false}/>
    </div>
}

export default ListItem

