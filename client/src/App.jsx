import abi from "../../artifacts/contracts/chai.sol/Chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import Buy from "./component/buy";
import Memos from "./component/memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    const contractAddress = "0xE298dbeDFc481bdA53f78E40a945d19f167833a2";
    const contractABI = abi.abi;

    try {
      const { ethereum } = window;

      if (ethereum) {
        await ethereum.request({ method: "eth_requestAccounts" });

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);
        setState({ provider, signer, contract });
        setIsConnected(true);
      } else {
        alert("Please install metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        await ethereum.request({
          method: "eth_requestAccounts",
          params: [null],
        });
        setAccount("None");
        setState({ provider: null, signer: null, contract: null });
        setIsConnected(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {isConnected ? (
        <button className="connect-wallet float-end" onClick={disconnectWallet}>
          Disconnect Wallet
        </button>
      ) : (
        <button className="connect-wallet float-end" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}

      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;
