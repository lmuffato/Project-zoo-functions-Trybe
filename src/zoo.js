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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return ids.map((id) => animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const selectedAni = animals.find((currAnimal) => currAnimal.name === animal);
  return selectedAni.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  const notNull = employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return employeeName === undefined ? {} : notNull;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((element) => element.managers.find((theManagers) =>
    theManagers === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(employee);
}

function animalCount(species) {
  const fullList = animals.reduce((list, animal) =>
    ({ ...list, [animal.name]: animal.residents.length }), {});
  const onlySpecies = animals.find((animal) => animal.name === species);
  return species === undefined ? fullList : onlySpecies.residents.length;
}

function entryCalculator(entrants = {}) {
  const howMany = Object.entries(entrants);
  const priceIs = Object.entries(prices);
  const thePrice = howMany.map((element1) =>
    priceIs.find((element2) => element1[0] === element2[0])[1]);
  return howMany.reduce((acc, curr, index) => acc + (thePrice[index] * curr[1]), 0);
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const theHours = Object.entries(hours);
  const ifunder = theHours.reduce((acc, curr) =>
    ({ ...acc,
      [curr[0]]: ((curr[1].open - curr[1].close) !== 0
        ? `Open from ${curr[1].open}am until ${curr[1].close - 12}pm` : 'CLOSED') }), {});
  const selectedDay = Object.entries(ifunder).find((element) => element[0] === dayName);
  return dayName === undefined ? ifunder : { [selectedDay[0]]: selectedDay[1] };
}

function oldestFromFirstSpecies(id) {
  const specieId = employees.find((element) => element.id === id).responsibleFor[0];
  const theResidents = animals.find((element) => element.id === specieId).residents;
  const higherAge = theResidents.reduce((age, animal) =>
    ((age > animal.age) ? age : animal.age), 0);
  const theOldestResi = theResidents.find((resi) => resi.age === higherAge);
  return Object.values(theOldestResi);
}

function increasePrices(percentage) {
  const increment = percentage / 100;
  const newPrices = {
    Adult: parseFloat((data.prices.Adult + (data.prices.Adult + 0.01) * increment).toFixed(2)),
    Senior: parseFloat((data.prices.Senior + (data.prices.Senior + 0.01) * increment).toFixed(2)),
    Child: parseFloat((data.prices.Child + (data.prices.Child + 0.01) * increment).toFixed(2)),
  };
  data.prices = { ...newPrices };
}

const animalsByIdsV2 = (...theids) => animalsByIds(...theids).map((animal) =>
  animal.name);

const allResponsibleFor = () => employees.reduce((acc, curr) => (
  { ...acc,
    [`${curr.firstName} ${curr.lastName}`]: animalsByIdsV2(...curr.responsibleFor),
  }), {});

const onlyResponsibleFor = (findHim) => {
  const itsHim = employees.find((element) => ((element.firstName === findHim)
  || (element.lastName === findHim)) || element.id === findHim);
  const onlyFor = {
    [`${itsHim.firstName} ${itsHim.lastName}`]: animalsByIdsV2(...itsHim.responsibleFor),
  };
  return onlyFor;
};

function employeeCoverage(idOrName) {
  return idOrName === undefined ? allResponsibleFor() : onlyResponsibleFor(idOrName);
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
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
