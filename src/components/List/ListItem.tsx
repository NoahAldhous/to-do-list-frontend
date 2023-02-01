
interface LiProps{
     props: { action: string; complete: boolean; }; 
}

const ListItem: React.FC<LiProps> = (props: LiProps) =>  {
    const {action, complete} = props.props
    return <li>
        { action }
        <input  type='checkbox' checked= {complete ? true : false}/>
    </li>
}

export default ListItem

