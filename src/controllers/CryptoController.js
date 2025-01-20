import axios from "axios";
import yahooFinance from "yahoo-finance2";
import cryptoServices from '../services/CryptoServices.js';

class CryptoController {
  static async cryptoAll(req, res) {
    const cryptoSymbols = [
      "BTC-USD", "ETH-USD", "USDT-USD", "XRP-USD", "BNB-USD",
      "SOL-USD", "DOGE-USD", "USDC-USD", "ADA-USD", "TRX-USD",
      "DOT-USD", "SHIB-USD", "MATIC-USD", "LTC-USD", "AVAX-USD",
      "UNI-USD", "ATOM-USD", "LINK-USD", "XMR-USD", "BCH-USD",
      "ICP-USD", "FIL-USD", "HBAR-USD", "QNT-USD", "FLOW-USD",
      "NEAR-USD", "VET-USD", "GRT-USD", "MANA-USD", "SAND-USD",
      "EOS-USD", "AAVE-USD", "KSM-USD", "FTM-USD", "XTZ-USD",
      "THETA-USD", "EGLD-USD", "ALGO-USD", "AXS-USD", "ZEC-USD",
      "CRV-USD", "ENJ-USD", "CHZ-USD", "STX-USD", "BAT-USD",
      "ZIL-USD", "1INCH-USD", "OMG-USD", "ANKR-USD", "YFI-USD",
      "BTT-USD", "WAVES-USD", "LUNA-USD", "FTT-USD", "CEL-USD",
      "SRM-USD", "RVN-USD", "COMP-USD", "KAVA-USD", "QTUM-USD"
    ];

    const { page = 1 } = req.query;
    const perPage = 10;
    const pageIndex = parseInt(page) - 1;

    const startIndex = pageIndex * perPage;
    const endIndex = startIndex + perPage;

    if (startIndex < 0 || startIndex >= cryptoSymbols.length) {
      return res.status(404).json({ error: "Página não encontrada ou inválida." });
    }

    const paginatedSymbols = cryptoSymbols.slice(startIndex, endIndex);

    try {

      const responses = await Promise.all(
        paginatedSymbols.map(symbol =>
          yahooFinance.quote(symbol).catch(err => null)
        )
      );

      const validResponses = responses.filter(response => response !== null);

      if (validResponses.length === 0) {
        return res.status(400).json({ error: "Nenhum dado válido nesta página." });
      }

      res.status(200).json({
        page: parseInt(page),
        perPage,
        total: cryptoSymbols.length,
        totalPages: [1, 2, 3, 4, 5, 6],
        data: validResponses
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async cryptoAlta(req, res) {
    const cryptoSymbols = ['BTC-USD', 'ETH-USD', 'BNB-USD', 'SOL-USD', 'ADA-USD', 'XRP-USD', 'MATIC-USD'];

    try {
      const cryptoData = await Promise.all(
        cryptoSymbols.map((symbol) => yahooFinance.quote(symbol))
      );

      const filteredData = cryptoData.map((crypto) => ({
        symbol: crypto.symbol,
        name: crypto.shortName,
        currentPrice: crypto.regularMarketPrice,
        changePercent: crypto.regularMarketChangePercent,
        marketState: crypto.marketState,
        logo: crypto.logoUrl,
        volume: crypto.regularMarketVolume,
      }));

      res.json({
        success: true,
        data: filteredData,
      });
    } catch (error) {
      console.error("Erro ao buscar dados das criptomoedas:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar dados das criptomoedas",
      });
    }
  }

  static async crypto(req, res) {
    const { symbol } = req.params;

    try {
      // Obter os detalhes da criptomoeda pelo símbolo via Yahoo Finance
      const response = await yahooFinance.quote(symbol + '-USD');
      // const grafico = await CryptoController.graph(symbol);

      const formattedResponse = {
        name: response.shortName, // Nome completo ou curto
        symbol: response.fromCurrency, // Símbolo da moeda
        currentPrice: response.regularMarketPrice, // Preço atual
        highToday: response.regularMarketDayHigh, // Alta do dia
        lowToday: response.regularMarketDayLow, // Baixa do dia
        changePercent: response.regularMarketChangePercent
          ? (response.regularMarketChangePercent * 100).toFixed(2) + "%" // Percentual do dia
          : "N/A",
        volume24h: response.regularMarketVolume, // Volume das últimas 24 horas
        logo: response.logoUrl, //Logo da moeda
        circulation: response.circulatingSupply, // circulação do Bitcoin
        diluted: response.fullyDilutedSupply,
        fiftyTwoWeekLow: response.fiftyTwoWeekLow,
      
      };

      res.status(200).json(formattedResponse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async graph(req, res) {
    const { action } = req.params;
  
    const apiKey = 'iJsLJoVbYovpFha2EXAx59Yiu7HcBckB';
    const uri = `https://api.polygon.io/v2/aggs/tickers/${action}-USD/prev`; // Exemplo com criptomoeda
  
    try {
      // Realizando a requisição para o endpoint correto
      const response = await axios.get(uri, {
        params: {
          apiKey: apiKey
        }
      });
  
      // Respondendo com os dados obtidos
      res.status(200).json(response.data);
  
    } catch (error) {
      // Tratamento de erro
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }


static async buyCypto(req, res) {

    const {userId} = req;
    const { action } = req.params;
    const { amount } = req.body;

    if(!userId) {
      return res.status(400).json({message: 'Usuario invalido'})
    }
    
    try {

        const responseAction = await yahooFinance.quote(`${action}-USD`)

        const price = responseAction.regularMarketPrice;
        const name = responseAction.shortName;
        const symbol = responseAction.symbol;



        const response = await cryptoServices.buyCrypto({
            userId, price, name, symbol, amount
        })

        res.status(201).json(response);
    } catch (error) {
        res.status(401).json({message: error.message})
    }

}

}

export default CryptoController;
