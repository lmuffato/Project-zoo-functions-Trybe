const { prices } = require('../data');
const { hours } = require('../data');

const calculate = {
  entrants(entrants) {
    let numberOfEntrants = entrants;
    numberOfEntrants = Object.entries(entrants);

    let count = numberOfEntrants.map(([entrant, number]) => number * prices[entrant]);
    count = count.reduce((accumulator, currentValue) => accumulator + currentValue);

    return count;
  },
};

const schedule = {
  getHour(number) {
    if (number > 12) {
      let hour = number;
      hour -= 12;
      return `${hour}pm`;
    }

    if (number === 0) return 'CLOSED';

    return `${number}am`;
  },
  getSchedule() {
    const weekSchedule = {};
    Object.entries(hours).forEach(([day, daySchedule]) => {
      let { open, close } = daySchedule;

      open = schedule.getHour(open);
      close = schedule.getHour(close);

      if ([open, close].includes('CLOSED')) weekSchedule[day] = 'CLOSED';

      else weekSchedule[day] = `Open from ${open} until ${close}`;
    });

    return weekSchedule;
  },
  getDaySchedule(dayName) {
    const daySchedule = schedule.getSchedule()[dayName];
    return { [dayName]: daySchedule };
  },
};
module.exports = {
  prices,
  calculate,
  schedule,
};
