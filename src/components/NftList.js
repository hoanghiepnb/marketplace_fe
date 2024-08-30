import React, {useEffect, useState} from "react";
import axios from "axios";

const NftList = ({owner}) => {
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
     if (owner) {
         loadNfts(owner).then(r => console.log(r)).catch(e => console.log(e));
     }
    }, [owner]);

    const loadNfts = async (owner) => {
        try {
            const response = await axios.get("http://localhost:3001/nft/nfts-by-owner/{$owner}");
            console.log(response.data);
            setNfts(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className= "nft-list">
            <h2>NFTs Owned by {owner}</h2>
            <ul>
                {nfts.map(nft => (
                    <li key={nft.id}>
                        <p>Address: {nft.address}</p>
                        <p>NFT ID: {nft.nftId}</p>
                        <p>Owner: {nft.owner}</p>
                        <p>Created: {new Date(nft.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default NftList;
