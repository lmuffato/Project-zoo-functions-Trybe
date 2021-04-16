/* eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
] */

const data = require('./data');

function animalsByIds(...ids) {
  const { animals } = data;
  if (ids.length !== 0) {
    return ids.map((animalById) => animals.find((animal) => animal.id === animalById));
  }
  return ids;
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  const old = animals.find((animal2) => (animal2.name === animal)).residents;
  const trueOrFalse = old.filter((ages) => (ages.age <= age));
  if (trueOrFalse.length > 0) {
    return console.log(false);
  }
  return console.log(true);
}

function employeeByName(employeeName) {
  const { employees } = data;
  const thereIs = employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return (thereIs !== '') ? console.log(thereIs) : {};
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  const { employees } = data;
  const trueOrFalse = employees.find((element) =>
    element.managers.find((ids) => ids === id));
  if (trueOrFalse !== undefined) {
    return true;
  }
  return false;
}

function addEmployee(id1, firstName1, lastName1, managers1, responsibleFor1) {
  const firstPart = { id: id1, fisrtName: firstName1, lastName: lastName1 };
  const secPart = { managers: managers1, responsibleFor: responsibleFor1 };
  if (managers1 === undefined) {
    const man = [];
    secPart.managers = man;
  }
  if (responsibleFor1 === undefined) {
    const res = [];
    secPart.responsibleFor = res;
  }
  const newEmployee = createEmployee(firstPart, secPart);
  const { employees } = data;
  employees.push(newEmployee);
  return employees;
}

function animalCount(species) {
  const { animals } = data;
  const toLower = species.toLowerCase();
  return animals.find((acc) => (acc.name === toLower ? console.log(acc.residents.length) : 0));
}

function entryCalculator(entrants) {
  const { prices } = data;
  const sumValues = (prices.Adult * entrants.Adult)
  + (prices.Child * entrants.Child)
  + (prices.Senior * entrants.Senior);
  return ((Object.keys(entrants).length) !== 3 || Object.values(entrants) !== '') ? 0 : sumValues;
}

function animalMap(options) {
  return options;
}

function schedule(dayName) {
  const { hours } = data;
  const dayss = hours[dayName];
  if (dayss.open - dayss.close === 0) {
    return 'CLOSED';
  }
  if (dayName === undefined) {
    return hours;
  }
  return `Open from ${dayss.open}am until ${dayss.close}pm`;
}

function oldestFromFirstSpecies(id) {
  const { animals } = data;
  const { employees } = data;
  const responsables = employees.find((resp) => (resp.id === id ? resp.responsibleFor : undefined))
    .responsibleFor[0];
  const selected = animals.find((sel) => sel.id === responsables).residents;
  const oldiest = selected.reduce((old, acc) => (acc.age > old.age ? acc : old));
  return oldiest;
}

function increasePrices(percentage) {
  const { prices } = data;
  const index = (parseFloat(percentage) / 100) + 1;
  let newPrice = 0;
  Object.keys(prices).forEach((i) => {
    newPrice = (prices[i] * index).toFixed(2);
    prices[i] = newPrice;
  });
  return prices;
}

function employeeCoverage(idOrName) {
  const { employees } = data;
  const { animals } = data;
  const obj = {};
  if (idOrName === undefined || idOrName === '') {
    return employees.forEach(({ firstName, lastName, responsibleFor }) => {
      const Name = `${firstName} ${lastName}`;
      const animal = responsibleFor.map((animalId) =>
        animals.find(({ id }) => animalId === id).name);
      obj[Name] = animal;
    });
  }
  const names = employees.find((resp) => (resp.id === idOrName));
  const animalss = names.responsibleFor.map((value) => animals.find(({ id }) => value === id).name);
  const employeeObj = {};
  employeeObj[`${names.firstName} ${names.lastName}`] = animalss;
  return employeeObj;
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
