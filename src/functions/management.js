const { prices } = require('../data');
let { hours } = require('../data');

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
    hours = Object.entries(hours);
    hours = hours.map(([day, schedules]) => [day, {
      open: schedule.getHour(schedules.open),
      close: schedule.getHour(schedules.close),
    }]);
    let scheduleOutput = {};
    hours.forEach(([day, schedules]) => {
      if (schedules.open === 'CLOSED' || schedules.close === 'CLOSED') {
        scheduleOutput = { ...scheduleOutput, [day]: 'CLOSED' };
      } else {
        scheduleOutput = {
          ...scheduleOutput,
          [day]: `Open from ${schedules.open} until ${schedules.close}`,
        };
      }
    });

    return scheduleOutput;
  },
  getDaySchedule(dayName) {
    let daySchedule = schedule.getSchedule();
    daySchedule = Object.entries(daySchedule).find(([day]) => day === dayName);
    daySchedule = { [daySchedule[0]]: daySchedule[1] };
    return daySchedule;
  },
};
module.exports = {
  prices,
  calculate,
  schedule,
};
