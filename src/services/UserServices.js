import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient()

class UserServices {

    async createUser(dto) {

        try {

            const isEmailExist = await prisma.user.findUnique({
                where: {email: dto.email}
            })

            if(isEmailExist) {
                throw new Error('E-mail já esta em uso!');
            }

            const passwordHash = await hash(dto.password, 10);

            const createUser = await prisma.user.create({
                data: {
                    name: dto.name,
                    phone: dto.phone,
                    email: dto.email,
                    role: dto.role,
                    password: passwordHash
                }
            })

            return createUser;

        } catch (error) {
            return error;
        }

    }


}

export default new UserServices();