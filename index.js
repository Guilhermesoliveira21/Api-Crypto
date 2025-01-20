import  yahooFinance from 'yahoo-finance2';

async function buscarTodasAcoes() {
    try {
      const cotacoes = await Promise.all(
        acoes.map(async (simbolo) => {
          const cotacao = await yahooFinance.quote(simbolo);
          return { simbolo, cotacao };
        })
      );
  
      console.log('Cotações:', cotacoes);
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
    }
  }
  
  buscarTodasAcoes();