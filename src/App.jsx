import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = ""
    if (number) str += "0123456789"
    if (character) str += "<>?,./;':[]{}\|!@#$%^&*()"
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, setNumber, setCharacter, setPassword])

  const CopyPassword=useCallback(()=>{
    passwordRef.current?.select()
window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => {
    passwordGenerator();
  }, [length, setCharacter, setNumber])

  return (
    <>
      <div className="justify-center w-full rounded-xl bg-gray-700 max-w-md px-4 py-8 mx-auto">
        <h1 className='text-xl align-middle justify-center'>Passoword Generator</h1>
        <div className="flex rounded-xl shadow mb-4">
          <input
            type="text"
            placeholder="Password"
            value={password}
            ref={passwordRef}
            readOnly
            className='rounded-l-md outline-none w-full py-1 px-3 text-red-700'
          />
          <button
          onClick={CopyPassword}
            className='bg-blue-700 text-white shrink-0 outline-none px-3 py-1 rounded-r-md'>
            Copy
          </button>
        </div>
        <div className="flex">
          <div className="flex items-center gap-5">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              value={length}
              className='cursor-pointer'
              onChange={() => { setNumber((pre) => !pre) }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              value={length}
              className='cursor-pointer'
              onChange={() => { setCharacter((pre) => !pre) }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
