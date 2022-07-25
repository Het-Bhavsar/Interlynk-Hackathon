import Interlynk from "../artifacts/contracts/Interlynk.sol/Interlynk.json";
// Import the required shims
import "@ethersproject/shims";
// Import the ethers library
import { ethers } from 'ethers';
import {api_key,PRIVATE_KEY} from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';


const contractAddress ="0xd114b528639367869C8FeE741f820cc8aE060589";
const provider = new ethers.providers.AlchemyProvider("maticmum", api_key);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const readContract = new ethers.Contract(contractAddress,Interlynk.abi,provider);
const writeContract = new ethers.Contract(contractAddress,Interlynk.abi,signer);


export async function giveMeBalance(address){
    const balance = await readContract.balanceOf(address);
    console.log("-------balance----")
    console.log(await ethers.utils.formatEther(balance));
    const tempBalance = await ethers.utils.formatEther(balance);
    return tempBalance;
}

export async function mintTheToken(address,tokenAmt){
    console.log("--------minting function-------------");
    const reward = await writeContract.functions.mint(address,ethers.utils.parseUnits(`${tokenAmt}`, 18));
    console.log(reward);

}