import express from "express";
import hre from "hardhat";
import cors from "cors";

const app = express();
const PORT = 3000;

const contractAddress = "0xB89bf47CBE385703085A90cE1383593FA8485aA8"; // Substitua pelo seu endereço
const provider = new hre.ethers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/WAu9lCgOy8H3UaysYN3u0A6ampsBO0Lh");
const signer = new hre.ethers.Wallet("7214fc0b0851eef18798dfac238a89b57413ebb0767bfdb21d7b54987d164193", provider);
const BrunoCoin = await hre.ethers.getContractAt("BrunoCoin", contractAddress, signer);

// Habilita o CORS para todas as origens (ou apenas a origem do seu front-end, se preferir)
app.use(cors());

// Restante do código

async function getCoinInfo() {
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

app.get("/info", async (req, res) => {
    try {
        const coinInfo = await getCoinInfo();
        res.json(coinInfo);
    } catch (error) {
        console.error("Erro ao obter informações do contrato:", error);
        res.status(500).json({ error: "Erro ao obter informações do contrato" });
    }
});

async function balance_of(address) {
    const balance = await BrunoCoin.balance(address);
    
    return {
        balance: balance.toString()
    };
    
}

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

async function mint_1_BrunoCoin(recipient) {
    const amount = hre.ethers.parseUnits("1", 18); 
    const tx = await BrunoCoin.mint(recipient, amount);
    console.log("Mint transaction hash:", tx.hash);
    
    const receipt = await tx.wait();
    console.log("Mint transaction confirmed in block:", receipt.blockNumber);
}

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


async function transferir(caller, recipient, quantity) {
    quantity = hre.ethers.parseUnits(quantity, 18); 
    const tx = await BrunoCoin.transferTo(caller, recipient, quantity)
    console.log("Transfer transaction hash:", tx.hash);
  
    const receipt = await tx.wait();
    console.log("Transfer transaction confirmed in block:", receipt.blockNumber);
}


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


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
  });

