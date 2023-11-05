import logo from "./logo.svg";
import "./App.css";
import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}[]~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllowed, charAllowed, setpassword]);

  const passwordCopy = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setpassword]);
  console.log("pppppppppp", password);

  return (
    <>
      <div className="w-full justify-center items-center text-center max-w-md mx-auto text-content-center shadow-md rounded-lg px-4 my-8 text-orange bg-gray-700 ">
        password Generator
        <div className="flex shadow rounded-lg overflow-hidden md-4">
          <input
            type="text"
            value={password}
            placeholder="password"
            ref={passwordRef}
            className="outline-none w-full py-1 mb-6 px-3 rounded-2xl"
          />
          <button
            className="outline-none bg-blue-700 text-white px-2 mb-6 py-0.5 rounded-2xl shrink-0"
            onClick={passwordCopy}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer text-orange"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Charters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
