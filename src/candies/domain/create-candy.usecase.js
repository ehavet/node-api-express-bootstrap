export function createCandyUsecaseFactory (candyRepository) {
    return async (name, sugarLevel, description) => {
        return await candyRepository.add(name, sugarLevel, description)
    }
}
