async function main() {
    const Interlynk = await ethers.getContractFactory("Interlynk");
 
    // Start deployment, returning a promise that resolves to a contract object
    const Inter_lynk = await Interlynk.deploy(1000);   
    console.log("Contract deployed to address:", Inter_lynk.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });