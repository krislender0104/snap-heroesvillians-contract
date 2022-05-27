const tokenAddress = '0x66Ef2450394d882bf89A9cf8B1f39e5aF72E0418';

async function buy(size) {
	const walletAddress = (await window.web3.eth.getAccounts())[0];

	let minABI = [
		// mint
		{
			"constant": true,
			"inputs": [
				{
					"name": "player",
					"type": "address"
				},
				{
					"name": "numberOfMints",
					"type": "uint256"
				}
			],
			"name": "mint",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": true,
			"type": "function"
		}
	];
	let contract = new web3.eth.Contract(minABI, tokenAddress);
	let cost = ""+(size * 2e16);
	let currentTokenId = await contract.methods.mint(walletAddress, size).send({ from: walletAddress, value: cost});
	let progress = document.getElementById("progress")
	progress.value = currentTokenId;
}

async function callback() {
	const walletAddress = (await window.web3.eth.getAccounts())[0];

	let minABI = [
		// currentTokenId
		{
			"constant": true,
			"inputs": [],
			"name": "currentTokenId",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"type": "function"
		}
	];
	let contract = new web3.eth.Contract(minABI, tokenAddress);
	let currentTokenId = await contract.methods.currentTokenId().call();
	let progress = document.getElementById("progress")
	progress.value = currentTokenId;
}

async function main() {
// Modern dapp browsers...
	if (window.ethereum) {
		window.web3 = new Web3(ethereum);
		try {
			// Request account access if needed
			await ethereum.enable();
			callback();
		} catch (error) {
			console.log(error);
		}
	}
// Legacy dapp browsers...
	else if (window.web3) {
		window.web3 = new Web3(web3.currentProvider);
		callback();
	}
}

main().catch(e => console.log(e));
