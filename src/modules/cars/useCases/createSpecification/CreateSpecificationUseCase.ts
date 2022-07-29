import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/implementations/ISpecificationsRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationRepository) {}

    async execute({name, description}: IRequest): Promise<void> {
        
        const specificationAlreadyExitis = await this.specificationRepository.findByName(name);

        if (specificationAlreadyExitis) {
            throw new AppError("Specification already exists!", 401);
        }
        
        await this.specificationRepository.create({
            name,
            description
        });
    }
}

export { CreateSpecificationUseCase };