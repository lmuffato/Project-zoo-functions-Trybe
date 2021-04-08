const data = require('./data');

function animalsByIds(...ids) {
  const animals = [];
  ids.forEach((id) => {
    animals.push(data.animals.find((animal) => animal.id === id));
  });
  return animals;
}

function animalsOlderThan(species, age) {
  const { residents } = data.animals.find((animal) => species === animal.name);
  return residents.every((animal) => animal.age > age);
}

function employeeByName(employeeName) {
  const employeeResult = data.employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return employeeResult !== undefined ? employeeResult : {};
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.find((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    const animals = {};
    data.animals
      .forEach((animal) => {
        animals[animal.name] = animal.residents.length;
      });
    return animals;
  }
  const { residents } = data.animals.find((animal) => animal.name === species);
  return residents.length;
}

function entryCalculator(entrants) {
  return entrants;
}

function animalMap(options) {
  return `${options}`;
}

function convertHourToAmPm(hour) {
  return hour > 12 ? `${hour - 12}pm` : `${hour}am`;
}

function formatMessageOpenClose(openHour, closedHour) {
  if (openHour === 0 && closedHour === 0) return 'CLOSED';

  const open = convertHourToAmPm(openHour);
  const close = convertHourToAmPm(closedHour);
  return `Open from ${open} until ${close}`;
}

function schedule(dayName) {
  if (dayName === undefined) {
    const hourskeys = Object.keys(data.hours).sort();
    const weekSchedule = {};
    hourskeys
      .forEach((day) => {
        weekSchedule[day] = formatMessageOpenClose(data.hours[day].open, data.hours[day].close);
      });
    return weekSchedule;
  }
  const day = {};
  day[dayName] = formatMessageOpenClose(data.hours[dayName].open, data.hours[dayName].close);
  return day;
}

function oldestFromFirstSpecies(id) {
  return `${id}`;
}

function increasePrices(percentage) {
  return `${percentage}`;
}

function employeeCoverage(idOrName) {
  return `${idOrName}`;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
