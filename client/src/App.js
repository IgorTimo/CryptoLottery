import { useEffect, useState } from "react";
import lottery from "./lottery";
import web3 from "./web3";

function App() {
  // console.log(web3.version);
  // web3.eth.getAccounts().then(console.log);

  const [manager, setManager] = useState();
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState();
  const [message, setMessage] = useState();
  const [currentAccount, setCurrentAccount] = useState();

  useEffect(() => {
    lottery.methods.manager().call().then(setManager);
    lottery.methods.getPlayers().call().then(setPlayers);
    web3.eth.getBalance(lottery.options.address).then(setBalance);
    web3.eth.getAccounts().then((accounts) => setCurrentAccount(accounts[0]));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const valueInWei = web3.utils.toWei(value, "ether");
    console.log("Accounts: ", accounts);
    console.log("valueInWei: ", valueInWei);
    setMessage("Waiting on transaction success...");
    await lottery.methods.enter().send({
      from: accounts[0],
      value: valueInWei,
    });
    setMessage("You have been entered successfully!");
  };

  const handleClick = async () => {
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting winner...");
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    setMessage("Winner was picked!");
  };

  return (
    <>
      <h1>Lottery Contract</h1>
      <h2>This contract is maneged by {manager}</h2>
      <h2>
        {" "}
        There are currently {players.length} players and the prize is{" "}
        {web3.utils.fromWei(balance.toString(), "ether")} ether!{" "}
      </h2>
      <h3>Players:</h3>
      <ul>
        {players.map(player => <li>{player}</li>)}
      </ul>
      <hr />
      <form onSubmit={handleSubmit}>
        <h3>Want to try your luck?</h3>
        <label htmlFor="amount">Amount of ether to enter: </label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name="amount"
        />
        <input type="submit" value="I'm in!" />
      </form>
      <h3>{message}</h3>
      <hr />
      { manager === currentAccount &&
        <>
          <h4>Ready to pick a winner?</h4>
          <button onClick={() => handleClick()}>Pick</button>
        </>
      }
    </>
  );
}

export default App;
