import React from 'react';
import './App.css';
import List from './components/List/List'

function App() {
  return (
    <div className="bg-slate-100 w-screen h-screen flex items-center justify-center">
      <section className="bg-slate-400 w-1/4 min-w-fit h-5/6 flex items-center justify-around flex-col rounded-3xl shadow-2xl">
        <h1 className="text-4xl text-slate-800 w-full font-bold bg-slate-300"> To-do-List</h1>
        <List/>
      </section>
    </div>
  );
}

export default App;
