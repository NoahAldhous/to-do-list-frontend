import React from 'react';
import './App.css';
import List from './components/List/List'

function App() {
  return (
    <div className="bg-slate-100 w-screen h-screen flex items-center justify-center">
      <section className="bg-slate-400 w-1/4 h-3/4 flex items-center justify-center flex-col rounded-3xl shadow-2xl">
        <h1 className="text-2xl text-slate-600 font-bold bg-blue rounded-xl "> To-do-List</h1>
        <List/>
      </section>
    </div>
  );
}

export default App;
