import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient

class AuthControllers {

    static async login(req, res) {

        const {email, password} = req.body;

        const isEmailExist = await prisma.user.findUnique({
            where: {email}
        })

        if(!isEmailExist) {
            return res.status(401).json({message: "Email ou senha invalida"});
        }

        const verifySenha = await compare(password, isEmailExist.password);

        if(!verifySenha) {
            return  res.status(401).json({ message: "Senha invalida" });
        }

        try {
        
            const acessToken = jwt.sign({
                userName: isEmailExist.name,
                userEmail: isEmailExist.email,
                userId: isEmailExist.id,
            }, 'secret');

            return res.status(200).json({
                
                user: {
                    name: isEmailExist.name,
                    email: isEmailExist.email,
                    token: acessToken,
                    message: 'Login Realizado com sucesso!'
                }

            })

        } catch (error) {
            return res.status(401).json({message: 'E-mail ou senha invalido'})
            
        }
        
    }

}

export default AuthControllers;