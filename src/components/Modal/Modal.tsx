import DeleteItemModal from './DeleteItemModal';
import EditItemModal from './EditItemModal';
import AddItemModal from './AddItemModal';

type Props = {
    modal:string,
    setModal:React.Dispatch<React.SetStateAction<string>>,
    editModalText: string,
    itemCompleted: boolean,
    itemId: string,
    list: { _id: string, action: string, completed: boolean }[]|[],
    setList: React.Dispatch<React.SetStateAction<{ _id: string, action: string, completed: boolean }[]|[]>>,
}

export default function Modal({modal, setModal, editModalText, itemCompleted, itemId, list, setList} : Props){
    //TODO:complete switch statement to render each modal type based on state
    switch(modal){
        case 'delete': 
            return <DeleteItemModal 
                setModal = {setModal}
                itemId={itemId}
                />;
        case 'edit':
            return <EditItemModal 
                setModal={setModal} 
                editModalText ={editModalText} 
                itemCompleted={itemCompleted} 
                itemId={itemId}
                list={list}
                setList={setList}
            />
        case 'add':
            return <AddItemModal 
                setModal = {setModal}
            />;
        case 'none':
            return null;
        default: return null;
    }
};