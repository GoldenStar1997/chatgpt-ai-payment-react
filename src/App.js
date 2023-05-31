import React from 'react';
// import { useState, useContext } from 'react';
import Openai from './components/openai';
import Payment from './components/payment';
import './App.scss'
export default function App() {
  // const [lang, setlang] = useState("second")
  return (
    <div className='container'>
        <br/>
        <br/>
        <br/>
        <br/>
      <div className='row'>
        {/* <div className='col-md-6'>
          <Payment />
        </div> */}
       
        <div className='col-md-12'>
          <Openai />
        </div>
      </div>
    </div>
  )
}
