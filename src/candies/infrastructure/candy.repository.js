let candies = [
    {id: '1', name: 'brown sugar', sugar_level: 'down', description: 'provoque la pertes des dents'},
    {id: '2', name: 'coke cola', sugar_level: 'high', description: 'pique le nez'},
    {id: '3', name: 'crystal mint', sugar_level: 'high', description: "à n'en plus dormir"},
    {id: '4', name: 'spice cake', sugar_level: 'down', description: 'étrange'},
    {id: '5', name: 'acid flying saucer', sugar_level: 'down', description: 'un voyage gustatif'},
    {id: '6', name: 'bloody molly', sugar_level: 'high', description: 'très tendre'},
]

export class CandyRepository {
    async get(candyId = undefined) {
        if (candyId) return candies.filter(candy => candy.id === candyId)
        return candies
    }

    async add(name, sugarLevel, description) {
        const candy = {id: (Math.floor(Math.random() * 999)).toString(), name: name, sugar_level: sugarLevel, description: description}
        candies.push(candy)
    }

    async remove(candyId) {
        candies = candies.filter(candy => candy.id !== candyId)
        console.log(candies)
    }
}
