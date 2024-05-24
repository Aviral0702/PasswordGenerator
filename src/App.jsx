import { useCallback, useEffect, useState } from 'react'
import { useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength]= useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const passRef = useRef();
  const passGen = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%^&*()_+"
    }
    for(let i=0;i<length;i++){
      pass+= str.charAt(Math.floor(Math.random()*str.length+1))
    }

    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword]);

  useEffect(()=>{
    passGen()
  },[length,numberAllowed,charAllowed])

  const copyTextToClipboard = useCallback(() =>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
    
  },[password])
  return (
    <>
      <div className='justify-center items-center'>
        <h1 className='text-4xl text-white mb-10'>Password generator</h1>
        <div className='items-center bg-gray-700 p-10 rounded-lg max-w-full'>
        <div>
          <input
           type="text" 
           className='rounded-lg p-2'
           value = {password}
           placeholder='Password'
           ref={passRef}

           readOnly
          />
          <button className='text-white rounded-lg gap-x-1 bg-blue-500 px-4 py-2'
            onClick={copyTextToClipboard}
          >
            Copy
          </button>
        </div>
        <div className='flex gap-10 justify-center'>
        <div className='flex items-center justify-center gap-3 mt-4'>
          <label htmlFor="rangeinp" className='text-white'>Length</label>
          <input 
          type="range"
          name='rangeinp'
          min = {8}
          max ={100}
          onChange={(e)=>{setLength(e.target.value)}}
          value={length}
          />
          <label htmlFor="rangeinp" className='text-white'>{length}</label>
        </div>
        <div className='flex items-center justify-center gap-3 mt-4'>
          <input 
          type="checkbox"
          id='number'
          onChange={(e)=>{setNumberAllowed(e.target.checked)}}
          />
          <label htmlFor="number" className='text-white'>Allow numbers</label>
        </div>
        <div className='flex items-center justify-center gap-3 mt-4'>
          <input 
          type="checkbox"
          id='char'
          onChange={(e)=>{setCharAllowed(e.target.checked)}}
          />
          <label htmlFor="char" className='text-white'>Allow special characters</label>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
