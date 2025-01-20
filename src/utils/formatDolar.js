export const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  };

export const dolar = async () => {

    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');

        return response.data.rates.BRL;

      } catch (erro) {
        // setErro(erro.message)
      }

}