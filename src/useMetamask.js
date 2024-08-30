import {useState, useEffect} from "react";

import {Web3} from "web3";

const useMetamask = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            window.ethereum.request({ method: "eth_requestAccounts" })
            .then(accounts => {
                setAccount(accounts[0]);
                setIsConnected(true);
            })
            .catch(err => {
                console.log(err);
            });

            window.ethereum.on("accountsChanged", accounts => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setIsConnected(true);
                } else {
                    setAccount(null);
                    setIsConnected(false);
                }
            });

            window.ethereum.on("chainChanged", chainId => {
                window.location.reload();
            });
        } else {
            console.log("Please install Metamask");
        }
    }, []);

    const connectMetamask = () => {
        if (window.ethereum) {
           try {
               const accounts = window.ethereum.request({ method: "eth_requestAccounts" });
                setAccount(accounts[0]);
                setIsConnected(true);
           } catch (err) {
               console.log('User denied account access');
           }
        }
    }

    return {web3, account, isConnected, connectMetamask};
}

export default useMetamask;