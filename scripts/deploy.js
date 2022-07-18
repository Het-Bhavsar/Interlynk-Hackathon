async function main() {
    const Interlynk = await ethers.getContractFactory("Interlynk");
 
    // Start deployment, returning a promise that resolves to a contract object
    const inter_lynk = await Interlynk.deploy();   
    console.log("Contract deployed to address:", inter_lynk.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });