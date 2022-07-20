async function main() {
    const interlynk = await ethers.getContractFactory("interlynk");
 
    // Start deployment, returning a promise that resolves to a contract object
    const inter_lynk = await interlynk.deploy();   
    console.log("Contract deployed to address:", inter_lynk.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });