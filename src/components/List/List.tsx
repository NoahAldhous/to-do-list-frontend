import ListItem from './ListItem';

type Props = {
    setItemText: React.Dispatch<React.SetStateAction<string>>,
    setItemCompleted: React.Dispatch<React.SetStateAction<boolean>>,
    setItemId: React.Dispatch<React.SetStateAction<string>>,
    list: { _id: string, action: string, completed: boolean }[]|[],
    setList: React.Dispatch<React.SetStateAction<{ _id: string, action: string, completed: boolean }[]|[]>>,
    setModal: React.Dispatch<React.SetStateAction<string>>,
}

export default function List({setItemText, setItemCompleted, setItemId, list, setList, setModal }: Props){

    return<section className = ' overflow-y-scroll h-4/6 w-full pl-5 pr-5 min-w-fit flex flex-col justify-start items-center'>
            {list.map( item  => 
                {
                return <ListItem key = {item._id} item = {item} setList = {setList} setItemText= {setItemText} setItemCompleted = {setItemCompleted} setItemId = {setItemId} setModal = {setModal}/>
                }
            )}
        </section>
}