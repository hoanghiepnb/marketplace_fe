import React, {useEffect, useState} from 'react';
import useMetamask from "./useMetamask";
import NftList from "./components/NftList";

function App() {
  const {web3, account, isConnected, connectMetamask} = useMetamask();
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
