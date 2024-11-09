function rollDice(numSides){
    // takes number of sides and returns a random number (0-numSides)
    return Math.floor(Math.random() * numSides);
}

module.exports = rollDice;



