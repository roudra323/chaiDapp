import abi from "../../artifacts/contracts/chai.sol/Chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import Buy from "./components/buy";
import Memos from "./components/memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xE298dbeDFc481bdA53f78E40a945d19f167833a2";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = ethereum.request({
            method: "eth_requestAccounts",
          });

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
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);

  console.log(state);

  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <Buy state={state} />
    </div>
  );
}

export default App;
