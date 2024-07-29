import React, { useCallback, useState, useEffect, useRef } from 'react'

const App = () => {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passRef =useRef(null)
  const handleLength = (event) => {
    setLength(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const generatePass = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numAllowed) str += '1234567890'
    if (charAllowed) str += '!@#$%^&*()?|'

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numAllowed, charAllowed])

  useEffect(() => {
    generatePass()
  }, [length, numAllowed, charAllowed, generatePass])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    passRef.current.select()
    alert('Password copied to clipboard')
  }

  return (
    <div className="bg-gray-700 flex items-center justify-center h-screen">
      <div className="bg-blue-100 text-black p-7 rounded-lg shadow-lg space-y-4">
        <h1 className="text-xl font-bold text-center">Password Generator</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder={password}
            value={password}
            readOnly
            ref={passRef}
            onChange={handlePassword}
            className="border border-gray-400 p-2 rounded flex-1"
          />
          <button
            onClick={copyToClipboard}
            className="bg-green-700 text-white p-2 rounded hover:bg-blue-600"
          >
            Copy
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            className="flex-1"
            min={6}
            value={length}
            onChange={handleLength}
          />
          <span>{length} Length</span>
          <input
            type="checkbox"
            checked={numAllowed}
            id="number"
            onChange={() => setNumAllowed(!numAllowed)}
          />
          <label htmlFor="number">Number</label>
          <input
            type="checkbox"
            checked={charAllowed}
            id="character"
            onChange={() => setCharAllowed(!charAllowed)}
          />
          <label htmlFor="character">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
