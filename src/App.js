import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import D3tree from "./d3/D3tree";
import data from "./d3/data_4";

function App() {
  return (
    <div>
    <BrowserRouter forceRefresh={true}>
      <Routes>
        <Route path='/' element={<D3tree data={data}/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
