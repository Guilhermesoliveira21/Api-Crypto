import axios, { AxiosHeaders } from "axios";
import yahooFinance from "yahoo-finance2";

class InvestmentController {

    static async actionUnique(req, res) {
        
        const { action } = req.params;

        const amountCovert = await InvestmentController.convertAmount();

        try {
            const actionResult = await yahooFinance.quote(action);

            const priceInBRL = actionResult.regularMarketPrice * amountCovert;

            actionResult.actionPriceInBRL = parseFloat(priceInBRL.toFixed(2));
            actionResult.actionPriceInUS = parseFloat(actionResult.regularMarketPrice);
            actionResult.altaHoje = parseFloat(actionResult.regularMarketChange.toFixed(2));
            actionResult.name = actionResult.displayName

            res.status(200).json({actionResult});

        } catch (error) {
            console.log(error.message())
        }
    }

    static async actionHistory(req, res) {

        const { action, date, interval } = req.body;

        const today = new Date();

        const formattedDate = today.toISOString().split('T')[0];
        
        try {
            
            const historyDataAction = await yahooFinance.historical(action, {
                period1: date,
                period2: formattedDate,
                interval
            })

            console.log(historyDataAction)

        } catch (error) {
            
        }

    }

    static async actionAll(req, res) {

        const tickersResult = await InvestmentController.finsAllActionsSimboys();
        const batchSize = 20;
        const batchIndex = req.query.batchIndex ? parseInt(req.query.batchIndex) : 0; 
        const startIndex = batchIndex * batchSize;
        const tickersBatch = tickersResult.slice(startIndex, startIndex + batchSize);

        console.log(tickersResult.lenght)

        const results = [];

        try {
            // Processa o lote de tickers
            for (const ticker of tickersBatch) {
                try {
                    const request = await yahooFinance.quote(ticker);
                    results.push(request); // Armazena o resultado de cada ticker
                } catch (error) {
                    console.log(`Erro ao buscar dados para ${ticker}:`, error);
                }
            }

            // Retorna os resultados do lote e o próximo índice para carregar mais dados
            res.json({
                results,
                nextBatchIndex: batchIndex + 1
            });

        } catch (error) {
            console.error('Erro ao processar o lote de ações:', error);
            res.status(500).json({ error: 'Erro ao carregar os dados' });
        }
       
    }

    static async findAmountToAction() {

        const apiKey = 'iJsLJoVbYovpFha2EXAx59Yiu7HcBckB';
        const uri = "https://api.polygon.io/v2/aggs/AAPL/tickers"

        try {
            
            const response = await axios.get(uri, {
                params: {
                    apiKey: apiKey
                }
            });

            return response.data.results;

        } catch (error) {
            console.error
        }

    }

    static async convertAmount() {

        const dataResponse = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const money = dataResponse.data.rates.BRL;

        return money;

    }

    static async finsAllActionsSimboys() {
        const apiKey = 'iJsLJoVbYovpFha2EXAx59Yiu7HcBckB';
        const uri = 'https://api.polygon.io/v3/reference/tickers';

        try {
            const response = await axios.get(uri, {
                params: {
                    market: 'stocks',
                    type: 'CS',
                    active: true,
                    limit: 1000,
                    apiKey: apiKey,
                }
            })

            const tickers = response.data.results;

            const responseActions = tickers.map((tic) => {
                return tic.ticker
            })

            return responseActions;
    
      
        } catch (error) {
            console.log(error)
        }
    }

}

export default InvestmentController;