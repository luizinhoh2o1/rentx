import { ICreateUsersDTO } from "../../../dtos/ICreateUsersDTO";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { hash } from "bcrypt";
import { response } from "express";
import { AppError } from "../../../../errors/AppError";
@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({name, email, password, driver_license}: ICreateUsersDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists!", 401);
        }
        
        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        });
    }
}

export { CreateUserUseCase };