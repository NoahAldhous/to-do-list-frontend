
interface LiProps{
    action: string; complete: boolean; 
}

const ListItem: React.FC<LiProps> = (item: LiProps) =>  {
    const {action, complete} = item
    return <div className='text-2xl w-80 bg-slate-600 flex justify-end mb-4 rounded-xl'> 
        <p className='mr-4'>{ action }</p>
        <input  className='mr-4' type='checkbox' checked= {complete ? true : false}/>
    </div>
}

export default ListItem

