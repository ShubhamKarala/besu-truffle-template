const Web3 = require("web3");
const assert = require("assert");
const certificatestoreArtifact = require("../build/contracts/CertificateStore.json");

const web3_provider_host =
  process.env.PRODUCTION_WEB3_PROVIDER_HOST || "http://127.0.0.1";
const web3_provider_port = process.env.PRODUCTION_WEB3_PROVIDER_PORT || 8545;
const provider = `${web3_provider_host}:${web3_provider_port}`;

const web3 = new Web3(new Web3.providers.HttpProvider(provider));

// ******************************************************************** //
//replace with your smart contract address
const certificateStoreAddress = "0xEd25Acae5CF9f9ac5Bb8e860b0304463a1B3Cd0c";
// ******************************************************************** //

const privateKeys = [
  "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
  "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
  "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f",
];

const address = [
  web3.eth.accounts.privateKeyToAccount(privateKeys[0]).address,
  web3.eth.accounts.privateKeyToAccount(privateKeys[1]).address,
  web3.eth.accounts.privateKeyToAccount(privateKeys[2]).address,
];

function getCertificateStoreContract() {
  let c = new web3.eth.Contract(
    certificatestoreArtifact.abi,
    certificateStoreAddress 
  );
  contract = c.clone();
  return contract;
}

async function sendDataToBC(name, universityName) {
  try {
      const from = address[0];
      const gas = 10000;
  
      const certificateRawTx = await getCertificateStoreContract().methods.createRandomCertificate(
        await name, universityName
      );
  
      const certificateSignedTx = await getSignedTx(certificateRawTx, from, gas);
  
      return directSendSignedTx(certificateSignedTx);
  } catch (e) {
    console.log(e.message);
  }
}

const name = process.argv[2];
const universityName = process.argv[3];

sendDataToBC(name, universityName).then((res)=> {
  console.log(res);
}).catch((err)=> {
  console.log(err);
})

// for (i = 0; i < csvData.length; i++) {
//   setTimeout(() => {
//     sendDataToBC(csvData[i]).then((res)=> {
//       console.log(res);
//     }).catch((err)=> {
//       console.log(err);
//     })
//   }, 3000)
// }

// function setData() {
//   setTimeout(() => {
//     for (i = 0; i < csvData.length; i++) {
//       sendDataToBC(csvData[i]).then((res)=> {
//         console.log(res);
//       }).catch((err)=> {
//         console.log(err);
//       })
//     }
//   }, 8000)
// }

// setData();

// (async () => {
//   try {
//     for (i = 0; i < csvData.length; i++) {
//       const entry = csvData[i];
//       const from = address[0];
//       const gas = 10000;
  
//       const certificateRawTx = await getCertificateStoreContract().methods.createRandomCertificate(
//         entry
//       );
  
//       const certificateSignedTx = await getSignedTx(certificateRawTx, from, gas);
  
//       // REST API call: /transfer
//       // return await sendSignedTx(signedTx, from, to, amount);
  
//       // direct mode - without REST API
//       return directSendSignedTx(certificateSignedTx);
//     }
//   } catch (e) {
//     console.log(e.message);
//   }
// })()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const getSignedTx = async (rawTrans, from) => {
  assert(
    rawTrans && from,
    "Need to specify each param of sendSignTransaction-func"
  );
  assert(web3.utils.isAddress(from), "Sender's address is not valid");

  const signed = await web3.eth.accounts.signTransaction(
    {
      to: certificateStoreAddress,
      from: from,
      data: rawTrans.encodeABI(),
      gasPrice: web3.eth.getGasPrice(),
      gas: Math.round((await rawTrans.estimateGas({ from })) * 1.5),
      nonce: web3.utils.toHex(
        await web3.eth.getTransactionCount(from, "pending")
      ),
    },
    privateKeys[0]
  );
  return signed.rawTransaction;
};

const directSendSignedTx = async (rawTxHex) => {
  let resp;
  try {
    await web3.eth.sendSignedTransaction(rawTxHex).on("receipt", (receipt) => {
      const { transactionHash, status, to, blockNumber } = receipt;
      resp = {
        transactionHash: transactionHash,
        status: status,
        to: to,
        blockNumber: blockNumber,
      };
    });
  } catch (error) {
    console.log(error);
    throw new BadRequestException({ description: error.message });
  }
  return JSON.stringify(resp);
};
