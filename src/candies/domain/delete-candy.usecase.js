export function deleteCandyUsecaseFactory (candyRepository) {
    return async (candyId) => {
        return await candyRepository.remove(candyId)
    }
}
