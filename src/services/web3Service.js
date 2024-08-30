import {Web3} from "web3";
import {MARKETPLACE_ADDRESS, NFT_ADDRESS} from "../constants";

const MARKETPLACE_ABI = require('../abis/marketplace.json');
const NFT_ABI = require('../abis/nft.json');

class Web3Service {
    constructor(provider) {
        console.log(provider);
        if (provider) {
           this.web3 = new Web3(provider);
        } else {
            console.log("No provider found");
        }
        this.marketplaceAddress = MARKETPLACE_ADDRESS;
        this.nftAddress = NFT_ADDRESS;

        this.marketplaceAbi = MARKETPLACE_ABI.abi;
        this.nftAbi = NFT_ABI.abi;

        this.marketplaceContract = new this.web3.eth.Contract(this.marketplaceAbi, this.marketplaceAddress);
        this.nftContract = new this.web3.eth.Contract(this.nftAbi, this.nftAddress);
    }

    async isApprovedForAll(owner){
        return await this.nftContract.methods.isApprovedForAll(owner, this.marketplaceAddress).call();
    }

    async setApprovalForAll(owner){
        return this.nftContract.methods.setApprovalForAll(this.marketplaceAddress, true).send({from: owner});
    }

    async listNft(tokenId, price, owner){
        return this.marketplaceContract.methods.list(tokenId, price).send({from: owner});
    }
}

export default Web3Service;