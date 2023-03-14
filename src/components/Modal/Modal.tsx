import DeleteItemModal from './DeleteItemModal';
import EditItemModal from './EditItemModal';
import AddItemModal from './AddItemModal';

type Props = {
    modal:string,
    setModal:React.Dispatch<React.SetStateAction<string>>,
    itemText: string,
    itemCompleted: boolean,
    itemId: string,
    list: { _id: string, action: string, completed: boolean }[]|[],
    setList: React.Dispatch<React.SetStateAction<{ _id: string, action: string, completed: boolean }[]|[]>>,
}

export default function Modal({modal, setModal, itemText, itemCompleted, itemId, list, setList} : Props){

    return <>
            {{'delete': 
            <DeleteItemModal 
                setModal = {setModal}
                itemId={itemId}
                list = {list}
                setList = {setList}
                itemText = {itemText}
                />,
        'edit':
             <EditItemModal 
                setModal={setModal} 
                itemText ={itemText} 
                itemCompleted={itemCompleted} 
                itemId={itemId}
                list={list}
                setList={setList}
            />,
        'add':
            <AddItemModal 
                setModal = {setModal}
                list = {list}
                setList = {setList}
            />,
        'none': null,
    }[modal]
    }
    </>
};