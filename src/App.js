import React, {useEffect, useState} from 'react';
import useMetamask from "./services/useMetamask";
import NftList from "./components/NftList";
import Web3Service from "./services/web3Service";
import SellNFT from "./components/SellNFT";

function App() {
  const {web3, account, isConnected, connectMetamask} = useMetamask();
  const web3Service = new Web3Service(window.ethereum);

  const tokenId = 18;
  const price = 1000000000000000000;

  const [owner, setOwner] = useState('');
  useEffect(() => {
      if (isConnected && account) {
          setOwner(account);
      }
  }, [isConnected, account]);

  return (
      <div className="App">
            <header className="App-header">
                <h1>Marketplace</h1>
                {isConnected ? (
                    <div>
                        <p>Connected account: {account}</p>
                        {owner && <NftList owner={owner} />}
                        <SellNFT owner={owner} tokenId={tokenId} price={price} web3Service={web3Service} />
                    </div>
                ) : (
                    <button onClick={connectMetamask}>Connect Metamask</button>
                )
                }
            </header>
      </div>
  );
}

export default App;
