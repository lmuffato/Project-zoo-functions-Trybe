const { prices } = require('../data');

const calculate = {
  entrants(entrants) {
    let numberOfEntrants = entrants;
    numberOfEntrants = Object.entries(entrants);

    let count = numberOfEntrants.map(([entrant, number]) => number * prices[entrant]);
    count = count.reduce((accumulator, currentValue) => accumulator + currentValue);

    return count;
  },
};

module.exports = {
  prices,
  calculate,
};
