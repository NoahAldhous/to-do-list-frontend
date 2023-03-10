import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import EditItemModal from './components/EditItemModal/EditItemModal';
import List from './components/List/List'
import NewItemModal from './components/NewItemModal/NewItemModal';

function App() {

  const [isError, setIsError] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isEditModal, setIsEditModal] = useState<boolean>(false)
  const [editModalText, setEditModalText] = useState<string>('')
  const [itemCompleted, setItemCompleted] = useState<boolean>(false)
  const [itemId, setItemId] = useState<string>('')
  const [list, setList] = useState<{_id: string, action: string, completed:boolean}[]|[]>([]);
  const [loadingMessage, setLoadingMessage] = useState<string>('')

  setTimeout(function() {
    setLoadingMessage(
      `The current version of this app uses a free server host that sleeps after some time. 
      If this message is displaying, please refresh the page until the server wakes up.`
    )
  }, 5000);

  async function fetchList(){
    setLoadingMessage('')
    const url = 'https://naldhous-to-do-list.onrender.com/';
    console.log(`sending request to ${url}`)
    await fetch(url)
    .then( async (response)  => {
        if (response.ok) {
            console.log(response)
            const data:{request:string, success: boolean, message:{_id: string, action: string, completed:boolean}[]} = await response.json();
            console.log(data.message)
            setList(data.message)
            return true;
        }
        return Promise.reject(response);
    })
    .catch((response => {
        console.log(response.status, response.statusText);
        setIsError(true);
        response.json().then((json: any) => {
            console.log(json);
          })
    }))
  };

  useEffect(() => {
      fetchList();
      console.log('fetchlist called')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isModal, isEditModal])

  return (
    <div className="bg-slate-100 w-screen h-screen flex items-center justify-center">
      {
        isError 
        ? <section>
            <p>OOPS! We can't connect to the server right now. Please try again in a few minutes.</p>
          </section>
        : <section className="bg-slate-600 w-1/3 min-w-fit h-5/6 flex items-center justify-around flex-col rounded-3xl shadow-2xl">
            <h1 className="flex justify-center text-4xl text-slate-800 w-full font-bold bg-slate-300"> To-Do-List</h1>
            {list.length > 0 
              ? <List 
                  isModal={isModal} 
                  setIsError = {setIsError} 
                  isEditModal={isEditModal} 
                  setIsEditModal={setIsEditModal} 
                  setEditModalText ={setEditModalText} 
                  setItemCompleted = {setItemCompleted} 
                  setItemId = {setItemId}
                  list = {list}
                  setList = {setList}
                />
              : <section className='left-0 top-0 fixed w-screen h-screen flex flex-col justify-center items-center'>
                <section className= 'z-50 relative flex flex-col justify-around items-center w-full sm:w-1/3 h-1/3 bg-slate-400'>
                  <h3 className='text-3xl'>Loading...</h3>
                  <p className='text-xl p-2'>{loadingMessage}</p>
                </section>
                </section>
            }  
            {isModal
            ? <NewItemModal setIsModal = {setIsModal}/>
            : null
            }
            {isEditModal
            ? <EditItemModal 
                setIsEditModal={setIsEditModal} 
                editModalText ={editModalText} 
                itemCompleted={itemCompleted} 
                itemId={itemId}
                list={list}
                setList={setList}
                />
            : null
            }
            {list.length > 0 
              ? <button className='bg-green-500  rounded-xl w-1/2 ml-2 mr-1 mb-2' onClick={ () => setIsModal(true) }>add an item</button>
              : null
            }
          </section>
      } 
    </div>
  );
}

export default App;
