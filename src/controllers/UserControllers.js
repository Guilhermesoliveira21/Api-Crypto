import userServices from "../services/UserServices.js";

class UserControllers {

    // Método estático para criação de usuário
    static async create(req, res) {
        try {
            const { name, email, phone, role, password } = req.body;


            if (!name || !email || !phone || !role || !password) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
            }

            await userServices.createUser({ name, email, phone, role, password });


            res.status(201).json({
                message: "Conta criada com sucesso!"
            });
        } catch (error) {

            
            res.status(500).json({ message: 'Erro ao criar o usuário, tente novamente mais tarde.'+ error.message });
        }
    }

}

export default UserControllers;
