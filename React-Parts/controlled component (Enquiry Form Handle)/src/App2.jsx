                                                      //Password Generator App

import React, { useState } from 'react';
import './App2.css'
import { toast, ToastContainer } from 'react-toastify';
import { LC, NC, SC, UC } from './Data/PassChar';

export default function App2() {
  let [uppercase, setUppercase] = useState(false)
  let [lowercase, setLowercase] = useState(false)
  let [symbol, setSymbol] = useState(false)
  let [number, setNumber] = useState(false)
  let [passLength, setPassLength] = useState(8)
  let [fPass, setFpass] = useState('')
  



  let createPassword =() => {
    let charSet = '';
    let finalPass = '';
    if(uppercase || lowercase || symbol || number) {
      if(uppercase) charSet += UC;
      if(lowercase) charSet += LC;
      if(symbol) charSet += SC;
      if(number) charSet += NC;

      for(let i = 0; i<passLength; i++){
        finalPass += charSet.charAt(Math.floor(Math.random()*charSet.length))
      }
      setFpass(finalPass)
    }
    else{
      toast.error("Please check atleast a box")
    }
  }


  let copyPass = () => {
    navigator.clipboard.writeText(fPass)
  }


  return (
    <div className='passwordBox'>
      <h3>Password Generator</h3>
      <div className='passwordBoxIn'>
        <input className='display' type='text' value={fPass} readOnly/>
        <button onClick={copyPass}>copy</button>
      </div>
      <div className='passLength'>
        <label>Password Length</label>
        <input className='numInp' type='number' max={20} min={8} value={passLength} onChange={(event) => setPassLength(event.target.value)}/>
      </div>
      <div className='passLength'>
        <label>Include uppercase letters</label>
        <input type='checkbox' defaultChecked={uppercase} onClick={() => setUppercase(!uppercase)}/>
      </div>
      <div className='passLength'>
        <label>Include lowercase letters</label>
        <input type='checkbox' defaultChecked={lowercase} onClick={() => setLowercase(!lowercase)}/>
      </div>
      <div className='passLength'>
        <label>Include Symbols</label>
        <input type='checkbox' defaultChecked={symbol} onClick={() => setSymbol(!symbol)}/>
      </div>
      <div className='passLength'>
        <label>Include Numbers</label>
        <input type='checkbox' defaultChecked={number} onClick={() => setNumber(!number)}/>
      </div>
      <button className='btn' onClick={createPassword}>Generate Password</button>
      <ToastContainer/>
    </div>
  )
}
