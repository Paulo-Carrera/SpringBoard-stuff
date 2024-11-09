const rollDice = require('./dice');

describe('#rollDice', ()=>{
    test('it rolls the correct amount of dice', ()=>{
        // mock the random number so it always returns 0.5
        Math.random = jest.fn(()=> 0.5);

        // so now we can test that the function returns 
        // the expected value (half of the input)
        expect(rollDice(6)).toEqual(3);
        expect(rollDice(2)).toEqual(1);

        // console.log(Math.random.mock.calls); use this to see
        // the calls to Math.random and their arguments 

        // check if math.random was called twice ; two ways
        expect(Math.random).toHaveBeenCalledTimes(2);
        expect(Math.random.mock.calls.length).toBe(2);
    });
});



