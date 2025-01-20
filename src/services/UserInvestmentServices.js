import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

class UserInvestmentServices {

    async singAction(dto) {

    const isExistAction = await prisma.investment.findFirst({
        where: {
            symbol: {
                equals: dto.symbol,
            },
            user_id: dto.userId
        }
    })

    if (isExistAction) {
        
        const qtd = dto.amount + isExistAction.amount;
        const total = isExistAction.total * isExistAction.amount;



        try {
            
            await prisma.investment.updateMany({
                where: {
                    symbol: dto.symbol, 
                    user_id: dto.userId 
                },
                data: {
                    amount: qtd,
                    total: total
                }
            });
            

            return {
                message: `Compra da ação ${dto.symbol} da empresa ${dto.name} realizada com sucesso. Agradecemos pela sua preferência!`
            };

        } catch (error) {
            return error;
        }

        return
    } 
    

try {
    await prisma.investment.create({
        data: {
            action: dto.name,
            symbol: dto.symbol,
            price: dto.price,
            amount: dto.amount,
            total: dto.price,
            user_id: dto.userId
        }
    });

    return {
        message: `Ação ${dto.symbol} da empresa ${dto.name} adquirida com sucesso!`
    };
} catch (error) {
    console.log(error)
    return error.message;
}


    }

    async actionsUserAll(dto) {

        try {
            
            const responseUser = await prisma.user.findUnique({
                where: {
                    id: dto.userId
                },
                select: {
                    name: true,
                    phone: true,
                    email: true,
                    investment: {
                        select: {
                            id: true,
                            action: true,
                            symbol: true,
                            price: true,
                            amount: true,
                            total: true,
                            createdAt: true
                        }
                    }
                }
            });

            return responseUser;

        } catch (error) {
            return error;
        }

    }

    async actionUnique(dto) {

        try {
            
            const responseAction = await prisma.investment.findMany({
                where: {
                    symbol: dto.action,
                    user_id: dto.userId
                }
            });
            
            return responseAction;

        } catch (error) {
            return error.message;
        }

    }

}

export default new UserInvestmentServices();