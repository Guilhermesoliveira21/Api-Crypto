import yahooFinance from "yahoo-finance2";
import userInvestmentServices from "../services/UserInvestmentServices.js";

class UserInvestmentController {

    static async myInvestments(req, res) {

        const {userId} = req;

        try {
            
            const myActions = await userInvestmentServices.actionsUserAll({userId});

            res.status(200).json(myActions)

        } catch (error) {
            res.status(401).json(error.message)
        }

    }

    static async buyAction(req, res) {

        const {userId} = req;
        const { action } = req.params;
        const { amount } = req.body;
        
        try {

            const responseAction = await yahooFinance.quote(action)

            const price = responseAction.regularMarketPrice;
            const name = responseAction.displayName;
            const symbol = responseAction.symbol;

            const response = await userInvestmentServices.singAction({
                userId, price, name, symbol, amount
            })

            res.status(201).json(response);
        } catch (error) {
            res.status(401).json({message: error.message})
        }

    }

    static async myActionUnique(req, res) {

        const {userId} = req;
        
        const { action } = req.params;

        try {
            
            const actionUnique = await userInvestmentServices.actionUnique({ userId, action });

            const timeReal = await UserInvestmentController.actionSearch(action);

            const actionSearch = {
                name: timeReal.shortName,
                symbol: timeReal.fromCurrency, 
                currentPrice: timeReal.regularMarketPrice, 
                highToday: timeReal.regularMarketDayHigh, 
                lowToday: timeReal.regularMarketDayLow, 
                changePercent: timeReal.regularMarketChangePercent
                  ? (timeReal.regularMarketChangePercent * 100).toFixed(2) + "%"
                  : "N/A",
                volume24h: timeReal.regularMarketVolume,
                logo: timeReal.logoUrl,
                circulation: timeReal.circulatingSupply,
                diluted: timeReal.fullyDilutedSupply,
                fiftyTwoWeekLow: timeReal.fiftyTwoWeekLow,
              
              };

            res.status(200).json({actionUnique, actionSearch});
            
        } catch (error) {
            res.status(401).json({error})
        }

    }

    static async actionSearch(action) {

        try {
            
            const responseAction = await yahooFinance.quote(action);

            return responseAction;
        } catch (error) {
            return error;
        }

    }
    
}

export default UserInvestmentController