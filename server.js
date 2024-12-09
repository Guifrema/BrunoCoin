const express = require("express");
const hre = require("hardhat");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Habilita o CORS para todas as origens (ou apenas a origem do seu front-end, se preferir)
app.use(cors());

// Restante do código

async function getCoinInfo() {
    // Endereço do contrato BrunoCoin
    const contractAddress = "0xB89bf47CBE385703085A90cE1383593FA8485aA8"; // Substitua pelo seu endereço
    const provider = new hre.ethers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/WAu9lCgOy8H3UaysYN3u0A6ampsBO0Lh");
    const signer = new hre.ethers.Wallet("7214fc0b0851eef18798dfac238a89b57413ebb0767bfdb21d7b54987d164193", provider)
    const BrunoCoin = await hre.ethers.getContractAt("BrunoCoin", contractAddress, signer);
    
    const name = await BrunoCoin.getName();
    const symbol = await BrunoCoin.getSymbol();
    const decimals = await BrunoCoin.info();
    const totalSupply = await BrunoCoin.supply();
    
    // Retorna as informações como um objeto JSON
    return {
        name,
        symbol,
        decimals: decimals.toString(),
        totalSupply: totalSupply.toString(),
    };
}

async function balance_of(address) {
    const contractAddress = "0xB89bf47CBE385703085A90cE1383593FA8485aA8"; // Substitua pelo seu endereço
    const provider = new hre.ethers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/WAu9lCgOy8H3UaysYN3u0A6ampsBO0Lh");
    const signer = new hre.ethers.Wallet("7214fc0b0851eef18798dfac238a89b57413ebb0767bfdb21d7b54987d164193", provider)
    const BrunoCoin = await hre.ethers.getContractAt("BrunoCoin", contractAddress, signer);
  
    const balance = await BrunoCoin.balance(address);

    return {
        balance: balance.toString()
    };

}

async function mint_1_BrunoCoin(recipient) {
    const contractAddress = "0xB89bf47CBE385703085A90cE1383593FA8485aA8"; // Substitua pelo seu endereço
    const provider = new hre.ethers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/WAu9lCgOy8H3UaysYN3u0A6ampsBO0Lh");
    const signer = new hre.ethers.Wallet("7214fc0b0851eef18798dfac238a89b57413ebb0767bfdb21d7b54987d164193", provider)
    const BrunoCoin = await hre.ethers.getContractAt("BrunoCoin", contractAddress, signer);
  
    const amount = hre.ethers.parseUnits("1", 18); 
    const tx = await BrunoCoin.mint(recipient, amount);
    console.log("Mint transaction hash:", tx.hash);
  
    const receipt = await tx.wait();
    console.log("Mint transaction confirmed in block:", receipt.blockNumber);
}

async function transferir(caller, recipient, quantity) {
    const contractAddress = "0xB89bf47CBE385703085A90cE1383593FA8485aA8"; // Substitua pelo seu endereço
    const provider = new hre.ethers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/WAu9lCgOy8H3UaysYN3u0A6ampsBO0Lh");
    const signer = new hre.ethers.Wallet("7214fc0b0851eef18798dfac238a89b57413ebb0767bfdb21d7b54987d164193", provider)
    const BrunoCoin = await hre.ethers.getContractAt("BrunoCoin", contractAddress, signer);
  
    //quantity = hre.ethers.parseUnits(quantity, 18); 
    const tx = await BrunoCoin.transferTo(caller, recipient, quantity)
    console.log("Transfer transaction hash:", tx.hash);
  
    const receipt = await tx.wait();
    console.log("Transfer transaction confirmed in block:", receipt.blockNumber);
}


// Rota /info que retorna os dados do contrato
app.get("/info", async (req, res) => {
    try {
        const coinInfo = await getCoinInfo();
        res.json(coinInfo);
    } catch (error) {
        console.error("Erro ao obter informações do contrato:", error);
        res.status(500).json({ error: "Erro ao obter informações do contrato" });
    }
});

app.get("/transfer/:caller/:recipient/:quantity", async (req, res) => {
    const { caller } = req.params;  
    const { recipient } = req.params;
    const { quantity } = req.params
    try {
        await transferir(caller, recipient, quantity);
    } catch (error) {
        console.error("Erro ao obter informações do contrato:", error);
        res.status(500).json({ error: "Erro ao obter informações do contrato" });
    }
});

app.get("/mine/:address", async (req, res) => {
    const { address } = req.params;  // Aqui está a extração do parâmetro "address"
    try {
        // Agora você pode usar o "address" no seu código
        await mint_1_BrunoCoin(address); // Passando o parâmetro para a função
    } catch (error) {
        console.error("Erro ao obter informações do contrato:", error);
        res.status(500).json({ error: "Erro ao obter informações do contrato" });
    }
});

app.get("/balance/:address", async (req, res) => {
    const { address } = req.params; 
    try {
        const balance = await balance_of(address);
        res.json(balance);
    } catch (error) {
        console.error("Erro ao obter informações do contrato:", error);
        res.status(500).json({ error: "Erro ao obter informações do contrato" });
    }
});


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
