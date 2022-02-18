import { getCandiesUsecaseFactory } from './candies/domain/get-candies.usecase.js'
import { getCandyUsecaseFactory } from './candies/domain/get-candy.usecase.js'
import { createCandyUsecaseFactory } from './candies/domain/create-candy.usecase.js'
import { deleteCandyUsecaseFactory } from './candies/domain/delete-candy.usecase.js'
import { CandyRepository } from './candies/infrastructure/candy.repository.js'

const candyRepository = new CandyRepository()
const getCandies = getCandiesUsecaseFactory(candyRepository)
const getCandy = getCandyUsecaseFactory(candyRepository)
const createCandy = createCandyUsecaseFactory(candyRepository)
const deleteCandy = deleteCandyUsecaseFactory(candyRepository)

export default {
    GetCandies: getCandies,
    GetCandy: getCandy,
    CreateCandy: createCandy,
    DeleteCandy: deleteCandy
}
