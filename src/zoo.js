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
  const answer = [];
  data.animals.forEach((animal) => {
    ids.forEach((id) => {
      if (id === animal.id) {
        answer.push(animal);
      }
    });
  });
  return answer;
}

function animalsOlderThan(animal, age) {
  const specificAnimal = data.animals.filter((curr) => curr.name === animal);
  const ageTest = specificAnimal[0].residents.every((individual) => individual.age > age);
  return ageTest;
}

function employeeByName(employeeName) {
  const arr = data.employees.filter((person) => person.firstName === employeeName
  || person.lastName === employeeName);
  let obj = arr[0];
  if (typeof obj === 'undefined') {
    obj = {};
  }
  return obj;
}

function createEmployee(personalInfo, associatedWith) {
  let obj = {};
  obj = personalInfo;
  const key1 = associatedWith.managers;
  const key2 = associatedWith.responsibleFor;
  obj.managers = key1;
  obj.responsibleFor = key2;
  return obj;
}

function isManager(id) {
  let answer = false;
  data.employees.forEach((employee) => {
    employee.managers.forEach((manager) => {
      if (manager === id) {
        answer = true;
      }
    });
  });
  return answer;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(obj);
}

function animalCount(species) {
  const obj = {};
  if (!species) {
    data.animals.forEach((animal) => {
      const keyName = animal.name;
      obj[keyName] = animal.residents.length;
    });
    return obj;
  }
  const specifAnimal = data.animals.filter((animal) => animal.name === species);
  return specifAnimal[0].residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const people = data.prices;
  const price = Object.keys(entrants).reduce((acc, client) => (
    acc + people[client] * entrants[client]
  ), 0);
  return price;
}

/*
function animalMap(options) {
  const animal = data.animals;
  if (true) {
    const obj = animal.forEach((curr) => {
      {curr.location}
    })
    return obj;
  }
}

console.log(animalMap());
*/

/*
function schedule(dayName) {
  const days = data.hours
  if (!dayName) {
    const day = Object.entries(days);
    day.forEach()
  }
  return days
}

console.log(schedule());
*/
/*
function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
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
*/
module.exports = {
  animalsByIds,
  animalsOlderThan,
  employeeByName,
  createEmployee,
  isManager,
  addEmployee,
  animalCount,
  entryCalculator,
  // schedule,
};
