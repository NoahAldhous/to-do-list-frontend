import ListItem from './ListItem';

export default function List(){

    const myList:{action:string, complete:boolean}[] = [
        {
            action:'read my book',
            complete: true,        
        },
        {
            action:'do yoga',
            complete: false,        
        },
        {
            action:'cook dinner',
            complete: false,        
        },
    ];

    return<>
        {myList.map( item  => {
            return <ListItem props={item}/>
        } )}
    </>
}