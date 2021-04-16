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
const data = require('./data');

function animalsByIds(...ids) {
  return ids.map(id => animals.find(singleAnimal => singleAnimal.id === id));
}

function animalsOlderThan(animal, age) {
  const foundAnimal = animals.find(singleAnimal => singleAnimal.name === animal);
  return foundAnimal.residents.every(animalName => animalName.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some(employee => employee.managers.find(boss => boss === id));
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
  animals.forEach(animal => (animalResult[animal.name] = animal.residents.length));
  if (!species) {
    return animalResult;
  }
  return animalResult[species];
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const {Adult = 0, Child = 0, Senior = 0} = entrants;
  const mol = Adult * prices.Adult + Senior * prices.Senior + Child * prices.Child;
  return mol
}


function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const humanReadable = {};
  const hoursArr = Object.entries(hours);
  hoursArr.forEach(day => humanReadable[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`);
  humanReadable['Monday'] = 'CLOSED';
  if (!dayName) {
    return humanReadable;
  }
  const readableSimple = {};
  readableSimple[dayName] = humanReadable[dayName];
  return readableSimple;
}

function oldestFromFirstSpecies(id) {
  const employe = employees.find(element => element.id === id);
  const animalId = employe.responsibleFor[0];
  const animal = animals.find(singleAnimal => singleAnimal.id === animalId);
  const ageStock = animal.residents.map(resident => resident.age);
  const a = ageStock.sort((a, b) => b - a)
  console.log(ageStock);
  console.log(a);
  const b = animal.residents.find(resident => resident.age === a[0]);
return Object.values(b);

}

function increasePrices(percentage) {
  prices.Adult = (prices.Adult * (1 + percentage/100)).toFixed(2);
  prices.Child = (prices.Child * (1 + percentage/100)).toFixed(2);
  prices.Senior = (prices.Senior * (1 + percentage/100)).toFixed(2);
  return prices;
}

function employeeCoverage(idOrName) {
  const employerResponsibleAnimals = {};
  const findEmployer = employees.find(employer => {
    employer.firstName === idOrName || employer.lastName === idOrName || employer.id === idOrName
  });
  const findAnimals = findEmployer.responsibleFor.map(animalId => animals.find(animal => animal.id === animalId));
  if(!idOrName) {
    return employees.map(employer => {
      employerResponsibleAnimals[`${employer.firstName} ${employer.lastName}`] = employer.responsibleFor
      .map(animalId => animals.find(animal => animal.id === animalId))
    });
  }

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
