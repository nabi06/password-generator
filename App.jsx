import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const[numberAllowed, setNumberAllowed]=useState(false)
  const[charAllowed, setCharAllowed]=useState(false)
  const[password,setPasswrod]=useState('')
  const passwordRef=useRef(null)
  const generatePassword=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+"
    for(let i=0;i<length;i++){
      const char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPasswrod(pass)

  },[length,numberAllowed,charAllowed])
  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,charAllowed])
  const copypassword = ()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }


  return (
    <>
      <div className='bg-gray-500 w-full  max-w-md mx-auto rounded-lg shadow-md px-4 py-3 my-8 '>
        <h1 className='text-orange-400 text-3xl text-center my-3 '> password</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly 
            ref={passwordRef}
            />
            <button className='outline-none text-white bg-blue-500 rounded-lg px-3 py-0.5 shrink-0'
             onClick={copypassword()}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={100} value={length} 
            className='cursor-pointer'
            onChange={(e)=>setLength(e.target.value)}
            name=''
            id=''
            />
            <label htmlFor='label' className='text-orange-400'> Label:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numberAllowed}
            onChange={()=>{
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label className='text-orange-400' htmlFor='number'> Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={charAllowed}
            onChange={()=>{
              setCharAllowed((prev) => !prev)
            }}
            />
            <label className='text-orange-400' htmlFor='number'> character</label>
          </div>
          
        </div>
      </div>
    </>
    
  )
}

export default App
