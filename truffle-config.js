var HDWalletProvider = require("@truffle/hdwallet-provider");

const privateKeys = [
	"0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
	"0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
	"0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f",
];

const privateKeyProvider = new HDWalletProvider(
	privateKeys,
	"http://blockchain.rxdp.in:8545",
	0,
	3
);

module.exports = {
	networks: {
		development: {
			host: "localhost",
			port: 8545,
			network_id: "*" // Match any network id
		},
		rinkeby: {
			provider: function () {
				var mnemonic = "thunder observe case repeat guard very leader kid latin crater only rescue"; //put ETH wallet 12 mnemonic code	
				return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/ccbda89b82274f218df78fab0b9ab8f6");
			},
			network_id: '4',
			from: '0x8157a8ac35ccc8388bc92453edf461966ed301bd',
			/*ETH wallet 12 mnemonic code wallet address*/
		},
		besu: {
			provider: privateKeyProvider,
			network_id: "*",
		},
	},
	compilers: {
		solc: {
			version: "0.6.8", // Fetch exact version from solc-bin (default: truffle's version)
			// docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
			// settings: {          // See the solidity docs for advice about optimization and evmVersion
			//  optimizer: {
			//    enabled: false,
			//    runs: 200
			//  },
			//  evmVersion: "byzantium"
			// }
		},
	},
};