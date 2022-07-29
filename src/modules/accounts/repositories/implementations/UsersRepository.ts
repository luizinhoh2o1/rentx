import { User } from "../../entities/User";
import { getRepository, Repository } from "typeorm";
import { ICreateUsersDTO } from "../../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository  implements IUsersRepository{
    private respository: Repository<User>;

    constructor() {
        this.respository = getRepository(User);
    }

    async create({name, email, driver_license, password}: ICreateUsersDTO): Promise<void> {
        const user = this.respository.create({
            name,
            email,
            driver_license,
            password
        });

        await this.respository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.respository.findOne({email});
        return user;
    }
    
    async findById(user_id: string): Promise<User> {
        const user = await this.respository.findOne(user_id);
        return user;
    }
}

export { UsersRepository };