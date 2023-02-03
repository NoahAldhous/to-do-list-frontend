
interface LiProps{
    action: string; complete: boolean; 
}

const ListItem: React.FC<LiProps> = (item: LiProps) =>  {
    const {action, complete} = item
    return <div className='w-full bg-slate-600 flex justify-end mb-4 rounded-xl pl-4 pr-4 pb-1 pt-1'> 
        <p className='text-l sm:text-2xl whitespace-nowrap'>{ action }</p>
        <div className='w-2'></div>
        <input  className='accent-orange-500' type='checkbox' checked= {complete ? true : false}/>
    </div>
}

export default ListItem

