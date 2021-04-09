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

const getAnimalsByZone = (zones) => zones
  .map((zone) => ({ [zone]: animals
    .filter(({ location }) => location === zone)
    .map(({ name }) => name) }))
  .reduce((obj, current) => Object.assign(obj, current), {});

const getAnimalsByOption = (sorted, sexo, zones) => {
  const animalsMap = getAnimalsByZone(zones);

  Object.keys(animalsMap).forEach((key) => {
    const names = Object.values(animalsMap[key])
      .map((specie) => {
        const petNames = animals
          .find(({ name }) => name === specie).residents
          .filter(({ sex }) => (sexo ? sex === sexo : sex))
          .map(({ name }) => name);

        if (sorted) petNames.sort();
        return { [specie]: petNames };
      });

    Object.assign(animalsMap, { [key]: names });
  });
  return animalsMap;
};

const animalMap = (options) => {
  // Retirar elementos repetidos, referencia :https://dicasdejavascript.com.br/javascript-como-remover-valores-repetidos-de-um-array/
  const zones = [...new Set(animals.map(({ location }) => location))];
  if (!options) return getAnimalsByZone(zones);

  const { includeNames, sorted, sex } = options;
  if (includeNames) return getAnimalsByOption(sorted, sex, zones);

  return getAnimalsByZone(zones);
};

const scheduleCheck = (open, close) => (!open
  ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`);

const schedule = (dayName) => {
  if (!dayName) {
    const res = {};

    Object.keys(hours).forEach((day) => {
      const { open, close } = hours[day];
      res[day] = scheduleCheck(open, close);
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
  const increase = (price) => (Math.round(price * percentage) + price * 100) / 100;
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
