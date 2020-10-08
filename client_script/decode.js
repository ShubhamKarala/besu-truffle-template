const abiDecoder = require('abi-decoder');

const CertificateStoreABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"certificateId","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"instituteName","type":"string"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"NewCertificate","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"certificates","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"instituteName","type":"string"},{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_instituteName","type":"string"}],"name":"createRandomCertificate","outputs":[],"stateMutability":"nonpayable","type":"function"}];
abiDecoder.addABI(CertificateStoreABI);

const testData = "0xc445ea9e00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000568736f617300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000156175687370666f696861736a6e20617368646670770000000000000000000000";
const decodedData = abiDecoder.decodeMethod(testData);

console.log(decodedData.params[0].value)
console.log(decodedData.params[1].value)