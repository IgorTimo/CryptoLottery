import {useEffect, useState} from "react";
import './App.css';
import lottery from "./lottery";
import web3 from './web3';

function App() {
  // console.log(web3.version);
  // web3.eth.getAccounts().then(console.log);

  const [manager, setManager] = useState();

  useEffect(() => {
    lottery.methods.manager().call().then(setManager);
  }, []);
  return (
    <h1>{manager}</h1>
  );
}

export default App;
