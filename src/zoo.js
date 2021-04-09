/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { animals, employees, hours } = require('./data');
const { prices } = require('./data');

const animalsByIds = (...ids) => ids.map((animalId) => animals.find(({ id }) => animalId === id));

const animalsOlderThan = (animal, minimalAge) => animals
  .find(({ name }) => animal === name).residents
  .every(({ age }) => age >= minimalAge);

const employeeByName = (employeeName) => {
  const findEmployee = employees.find((employee) => Object.values(employee).includes(employeeName));
  return employeeName ? findEmployee : {};
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => employees.some(({ managers }) => managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
};

const animalCount = (species) => {
  if (species) return animals.find(({ name }) => name === species).residents.length;
  const res = {};
  animals.map(({ name, residents }) => ({ [name]: residents.length })).forEach((obj) => {
    Object.assign(res, obj);
  });
  return res;
};

const entryCalculator = (entrants) => {
  if (!entrants || entrants === {}) return 0;
  let totalPrice = 0;
  Object.keys(entrants).forEach((key) => {
    totalPrice += entrants[key] * prices[key];
  });

  return totalPrice;
};

function animalMap(options) {
  const mapZones = ['NE', 'NW', 'SE', 'SW'];

  if (!options) {
    const map = {};
    mapZones.forEach((zone) => {
      Object.assign(map, { [zone]: animals
        .filter(({ location }) => location === zone)
        .map(({ name }) => name) });
    });
    return map;
  }
  const map = {};
  mapZones.forEach((zone) => {
    Object.assign(map, { [zone]: animals
      .filter(({ location }) => location === zone)
      .map(({ name }) => name) });
  });
  return map;
} // ver

const scheduleCheck = (open, close) => (!open
  ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`);

const schedule = (dayName) => {
  if (!dayName) {
    const res = {};

    Object.keys(hours).forEach((key) => {
      const { open, close } = hours[key];
      res[key] = scheduleCheck(open, close);
    });

    return res;
  }
  const { open, close } = hours[dayName];
  return { [dayName]: scheduleCheck(open, close) };
};

const oldestFromFirstSpecies = (employeeId) => {
  const specie = employees.find(({ id }) => id === employeeId).responsibleFor[0];
  const oldestAge = animals.find(({ id }) => id === specie).residents
    .map(({ age }) => age)
    .reduce((bigger, current) => ((bigger > current) ? bigger : current));

  return Object.values(animals
    .find(({ id }) => id === specie).residents.find(({ age }) => age === oldestAge));
};

const increasePrices = (percentage) => {
  const increase = (price) => (price + ((price * percentage) / 100)).toFixed(2);
  const { Adult, Child, Senior } = prices;
  Object.assign(prices, {
    Adult: increase(Adult),
    Child: increase(Child),
    Senior: increase(Senior),
  });
};

const getResponsible = (animalsId) => animalsId
  .map((ids) => animals
    .find(({ id }) => id === ids).name);

const getEmployeesCoverage = () => {
  const employeesName = employees.map(({ firstName, lastName }) => `${firstName} ${lastName}`);
  return employeesName
    .sort()
    .map((name) => ({ [name]: getResponsible(employees
      .find(({ lastName }) => name.includes(lastName)).responsibleFor) }))
    .reduce((obj, current) => Object.assign(obj, current), {});
};

const employeeCoverage = (idOrName) => {
  if (!idOrName) return getEmployeesCoverage();

  const { firstName, lastName, responsibleFor } = employees
    .find((element) => Object.values(element).includes(idOrName));

  return {
    [`${firstName} ${lastName}`]: getResponsible(responsibleFor) };
};

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
