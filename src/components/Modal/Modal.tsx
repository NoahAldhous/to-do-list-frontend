import DeleteItemModal from './DeleteItemModal';

type Props = {
    modal:string,
    setModal:React.Dispatch<React.SetStateAction<string>>,
}

export default function Modal({modal, setModal} : Props){
    //TODO:complete switch statement to render each modal type based on state
    switch(modal){
        case 'delete': 
            return <DeleteItemModal setModal = {setModal}/>
        case 'none':
            return null;
        default: return null;
    }
};