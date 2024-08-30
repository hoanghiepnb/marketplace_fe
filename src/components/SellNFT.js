import React, {useState} from "react";

const SellNFT = ({owner, tokenId, price, web3Service}) => {
    const [isApproved, setIsApproved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkAndApprove = async () => {
        setIsLoading(true);
        try {
            const approved = await web3Service.isApprovedForAll(owner);
            if (!approved) {
                await web3Service.setApprovalForAll(owner);
            }
            setIsApproved(true);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }

    const listNFTForSale = async () => {
        if (isApproved) {
            setIsLoading(true);
            try {
                await web3Service.listNft(tokenId, price, owner);
                alert(`NFT ${tokenId} listed for sale at ${price}`);
            } catch (err) {
                console.log(err);
                alert("Error listing NFT for sale");
            }
            setIsLoading(false);
        } else {
            alert("Please approve the marketplace to sell your NFT");
        }
    }

    return(
        <div>
            <h3>Sell NFT {tokenId}</h3>
            <button onClick={checkAndApprove} disabled={isLoading}>
                {isApproved ? "Approved" : "Approve"}
            </button>
            <button onClick={listNFTForSale} disabled={!isApproved || isLoading}>
                Sell NFT
            </button>
        </div>
    );
}

export default SellNFT;