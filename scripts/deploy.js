// scripts/deploy.js
async function main() {
	// We get the contract to deploy
	// const Token = await ethers.getContractFactory("SnapUniverse");
	// console.log("Deploying Token...");
	// const token = await Token.deploy("0x4c5813b8c6FbbAC76CAA148aAf8910f236B56fDF");
	// await token.deployed();
	// console.log("token deployed to:", token.address);

	// mint pass
	const Token = await ethers.getContractFactory("SnapMintPass");
	console.log("Deploying Token...");
	const token = await Token.deploy();
	await token.deployed();
	console.log("token deployed to:", token.address);
}

main()
		.then(() => process.exit(0))
		.catch(error => {
			console.error(error);
			process.exit(1);
		});
