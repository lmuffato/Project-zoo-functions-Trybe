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

const { animals, employees, hours, prices } = require('./data');

// const data = require('./data');

function animalsByIds(...ids) {
  return ids.map((id) => animals.find((singleAnimal) => singleAnimal.id === id));
}

function animalsOlderThan(animal, age) {
  const foundAnimal = animals.find((singleAnimal) => singleAnimal.name === animal);
  return foundAnimal.residents.every((animalName) => animalName.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.find((boss) => boss === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const animalResult = {};
  animals.forEach((animal) => {
    animalResult[animal.name] = animal.residents.length;
  });
  if (!species) {
    return animalResult;
  }
  return animalResult[species];
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const mol = Adult * prices.Adult + Senior * prices.Senior + Child * prices.Child;
  return mol;
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const humanReadable = {};
  const hoursArr = Object.entries(hours);
  hoursArr.forEach((day) => {
    humanReadable[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
  });
  humanReadable.Monday = 'CLOSED';
  const readableSimple = {};
  readableSimple[dayName] = humanReadable[dayName];
  if (!dayName) {
    return humanReadable;
  }
  return readableSimple;
}

function oldestFromFirstSpecies(id) {
  const employe = employees.find((element) => element.id === id);
  const animalId = employe.responsibleFor[0];
  const animal = animals.find((singleAnimal) => singleAnimal.id === animalId);
  const decreaseAgeStock = animal.residents.map((resident) => resident.age).sort((a, b) => b - a);
  const olderAnimal = animal.residents.find((resident) => resident.age === decreaseAgeStock[0]);
  return Object.values(olderAnimal);
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = prices;
  prices.Adult = (Math.round(Adult * (1 + percentage / 100) * 100)) / 100;
  prices.Child = (Math.round(Child * (1 + percentage / 100) * 100)) / 100;
  prices.Senior = (Math.round(Senior * (1 + percentage / 100) * 100)) / 100;
  return prices;
}

function employeeCoverage(idOrName) {
  const responsibleAnimal = {};
  if (idOrName) {
    const findEmployer = employees.find(({ firstName, lastName, id }) =>
      firstName === idOrName || lastName === idOrName || id === idOrName);
    const findAnimals = findEmployer.responsibleFor.map((animalId) => animals
      .find((animal) => (animal.id === animalId)).name);
    responsibleAnimal[`${findEmployer.firstName} ${findEmployer.lastName}`] = findAnimals;
    return responsibleAnimal;
  }
  employees.forEach((worker) => {
    responsibleAnimal[`${worker.firstName} ${worker.lastName}`] = worker.responsibleFor
      .map((animalId) => (animals.find((animal) => animal.id === animalId)).name);
  });
  return responsibleAnimal;
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
