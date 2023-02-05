import React from 'react';
import {useState} from 'react';
import './App.css';
import List from './components/List/List'

function App() {

  const [isError, setIsError] = useState<boolean>(false)
  return (
    <div className="bg-slate-100 w-screen h-screen flex items-center justify-center">
      {
        isError 
        ? <section>
            <p>OOPS! We can't connect to the server right now.</p>
          </section>
        : <section className="bg-slate-400 w-1/4 min-w-fit h-5/6 flex items-center justify-around flex-col rounded-3xl shadow-2xl">
            <h1 className="flex justify-center text-4xl text-slate-800 w-full font-bold bg-slate-300"> To-Do-List</h1>
            <List setIsError = {setIsError}/>
          </section>
      } 
    </div>
  );
}

export default App;
