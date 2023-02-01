
interface LiProps{
    action: string; complete: boolean; 
}

const ListItem: React.FC<LiProps> = (item: LiProps) =>  {
    const {action, complete} = item
    return <li>
        { action }
        <input  type='checkbox' checked= {complete ? true : false}/>
    </li>
}

export default ListItem

