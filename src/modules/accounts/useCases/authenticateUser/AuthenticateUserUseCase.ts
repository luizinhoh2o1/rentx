import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        //usuario existe?
        const user = await this.usersRepository.findByEmail(email);
        //Senha correta?
        if (!user) {
            throw new AppError("Email or password incorrect!", 401);
        }
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!", 401);
        }
        //Gerar JWT
        const token = sign({}, "554b8d2f6a021cafaf5391d6663b56c6", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }
        
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };