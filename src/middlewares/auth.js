import jwt from "jsonwebtoken";

export const autentica = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido!" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const secret = 'secret';
        const decoded = jwt.verify(token, secret); 

        const { userName, userEmail, userId } = decoded;

        req.userName = userName;
        req.userEmail = userEmail;
        req.userId = userId;

        return next();

    } catch (error) {
        return res.status(401).json({ message: "Token inválido ou expirado!" });
    }
};
