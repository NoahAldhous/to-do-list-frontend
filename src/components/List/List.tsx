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
        {
            action:'codewars',
            complete: true,        
        },
        {
            action:'toilet paper',
            complete: false,        
        },
        {
            action:'session prep',
            complete: false,        
        },
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
        {
            action:'codewars',
            complete: true,        
        },
        {
            action:'toilet paper',
            complete: false,        
        },
        {
            action:'session prep',
            complete: false,        
        },
    ];

    return<section className = ' overflow-y-scroll h-5/6 flex flex-col items-end'>
        {myList.map( item  => {
            return <ListItem {...item}/>
        } )}
    </section>
}