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

const data = require('./data');

function animalsByIds(...ids) {
  const { animals } = data;
  const arrAnimals = animals.filter(({ id }) => ids.includes(id));
  return arrAnimals;
}

function animalsOlderThan(animal, age) {
  const searchAnimal = data.animals.find(({ name }) => name === animal);
  return searchAnimal.residents.every(({ age: idade }) => idade > age);
}

function employeeByName(employeeName) {
  const objEmployee = data.employees.find(
    ({ firstName, lastName }) =>
      employeeName === firstName || employeeName === lastName,
  );
  return !employeeName ? {} : objEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(thisId) {
  const checkIsManager = data.employees.some((manager) =>
    manager.managers.includes(thisId),
  );
  return checkIsManager;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const createObj = { id, firstName, lastName, managers, responsibleFor };
  const addObjEmployee = data.employees.push(createObj);
  return addEmployee;
}

function animalCount(species) {
  const animalObj = data.animals.find(({ name }) => name === species);
  const calcPopul = data.animals.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
  }, {});
  return !species ? calcPopul : animalObj.residents.length;
}

function entryCalculator(entrants) {
  const objIsEmpty = (obj) => Object.keys(obj).length === 0;
  if (!entrants || objIsEmpty(entrants)) return 0;
  const {
    Adult: priceAdult,
    Child: priceChild,
    Senior: princeSenior,
  } = data.prices;
  const listPrices = entrants;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const sumPrinces =
    Adult * priceAdult + Child * priceChild + Senior * princeSenior;
  return sumPrinces;
}

function animalMap(options) {}

const daySchedule = (open, closed) =>
  closed - open === 0 ? 'CLOSED' : `Open from ${open}am until ${closed - 12}pm`;

function schedule(dayName) {
  const { hours } = data;
  const calendar = Object.fromEntries(
    Object.entries(hours).map(([key, { open, close: closed }]) => [
      key,
      daySchedule(open, closed),
    ]),
  );
  return !dayName ? calendar : { [dayName]: calendar[dayName] };

  //  const { open, close } = !dayName ? {open: null, close: null} : hours[dayName]
  // return !dayName ? calendar : { [dayName]: daySchedule(open, close) };
}

function oldestFromFirstSpecies(id) {
  const objManager = data.employees.find(({ id: isId }) => isId === id);
  const searchAnimal = data.animals.find(
    ({ id: idAnimal }) => idAnimal === objManager.responsibleFor[0],
  );
  const olderAnimal = searchAnimal.residents.reduce(
    (acc, { age }) => (acc > age ? acc : age),
    {},
  );
  const newObjAnimal = searchAnimal.residents.find(
    ({ age }) => age === olderAnimal,
  );
  const newArrAnimal = Object.keys(newObjAnimal).map(
    (key) => newObjAnimal[key],
  );
  return newArrAnimal;
}

function increasePrices(percentage) {
  const { prices } = data;
  const toConvert = percentage / 100 + 1 + 0.005;
  return Object.keys(data.prices).forEach((key) => {
    prices[key] = Number(parseFloat(prices[key] * toConvert).toFixed(2));
  });

  return values;
}

function employeeCoverage(idOrName) {}

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
