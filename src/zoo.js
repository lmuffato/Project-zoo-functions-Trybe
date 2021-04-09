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

const { animals, employees, prices } = require('./data');
/* const data = require('./data'); */

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, ages) {
  const whichAnimal = animals.find(({ name }) => name === animal);
  const moradores = whichAnimal.residents;

  return moradores.every(({ age }) => age > ages);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  const callback = ({ firstName, lastName }) => {
    if ((firstName === employeeName) || (lastName === employeeName)) {
      return true;
    }
  };
  return employees.find(callback);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  const myObj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(myObj);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }

  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return Adult * 49.99 + Child * 20.99 + Senior * 24.99;
}

/* function animalMap(options) {
  // seu código aqui
 } */

const info = {
  Tuesday: 'Open from 8am until 6pm',
  Wednesday: 'Open from 8am until 6pm',
  Thursday: 'Open from 10am until 8pm',
  Friday: 'Open from 10am until 8pm',
  Saturday: 'Open from 8am until 10pm',
  Sunday: 'Open from 8am until 8pm',
  Monday: 'CLOSED',
};

function schedule(dayName) {
  const array = [];

  if (!dayName) {
    return info;
  }
  array.push(dayName);
  array.push(info[dayName]);

  return ({ [array[0]]: array[1] });
}

function oldestFromFirstSpecies(ids) {
  const idAnimal = employees.find((employee) => employee.id === ids).responsibleFor[0];
  const whichAnimals = animals.find(({ id }) => id === idAnimal).residents;
  const olderAge = whichAnimals.reduce((bigger, { age }) => ((age > bigger) ? age : bigger), 0);

  const myObj = whichAnimals.find(({ age }) => age === olderAge);

  const { name, sex, age } = myObj;
  return [name, sex, age];
}

console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function increasePrices(percentage) {
  const increase = (100 + percentage) / 100;

  prices.Adult = Math.round(prices.Adult * increase * 100) / 100;
  prices.Senior = Math.round(prices.Senior * increase * 100) / 100;
  prices.Child = Math.round(prices.Child * increase * 100) / 100;

  return prices;
}

/* function employeeCoverage(idOrName) {

} */

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  /* animalMap, */
  animalsByIds,
  employeeByName,
  /* employeeCoverage, */
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
