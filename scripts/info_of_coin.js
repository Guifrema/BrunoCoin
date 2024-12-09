
const hre = require("hardhat");

async function main() {
    // Endereço do contrato e do usuário
    const contractAddress = "0xB89bf47CBE385703085A90cE1383593FA8485aA8"; // Substitua pelo endereço do seu contrato
    const BrunoCoin = await hre.ethers.getContractAt("BrunoCoin", contractAddress);
    console.log(BrunoCoin)

    const name = await BrunoCoin.getName();
    const symbol = await BrunoCoin.getSymbol();
    const decs = await BrunoCoin.info();
    const totalSupply = await BrunoCoin.supply();
  
    // Formatar o saldo em unidades legíveis (18 casas decimais)
    console.log(`Nome da moeda: `, name);
    console.log(`Símbolo da moeda: `, symbol);
    console.log(`Quantidade de decimais da moeda: `, decs);
    console.log(`Total de moedas em circulação: `, totalSupply.toString().slice(0,7).concat(','.concat(totalSupply.toString().slice(7))))
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
  