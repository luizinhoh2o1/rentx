import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {
        this.categoriesRepository
    }

    async execute({ name, description }: IRequest) {
        const categoryAlreadyExistis = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExistis) {
            throw new AppError("Category already exists!", 401);
        }
    
        this.categoriesRepository.create({name, description});
    }
}

export { CreateCategoryUseCase };