function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const minNodes = 100
const maxNodes = 1000

export const data = [
    [
        "SP",
        "RJ",
        getRandomNumber(minNodes, maxNodes)
    ],
    [
        "SP",
        "MG",
        getRandomNumber(minNodes, maxNodes)
    ],
    [
        "SP",
        "SC",
        getRandomNumber(minNodes, maxNodes)
    ],
    [
        "RJ",
        "RS",
        getRandomNumber(minNodes, maxNodes)
    ],
    [
        "RJ",
        "MG",
        getRandomNumber(minNodes, maxNodes)
    ],
    [
        "MG",
        "SC",
        getRandomNumber(minNodes, maxNodes)
    ],
    [
        "MG",
        "TO",
        getRandomNumber(minNodes, maxNodes)
    ],
    [
        "SC",
        "TO",
        getRandomNumber(minNodes, maxNodes)
    ],
    [
        "TO",
        "RS",
        getRandomNumber(minNodes, maxNodes)
    ],
    [
        "RS",
        "RJ",
        getRandomNumber(minNodes, maxNodes)
    ]
]