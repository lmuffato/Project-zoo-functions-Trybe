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

/*
function isManager(id) {
  const answer = data.employees.forEach((employee) => {
    return employee.managers.some((manager) => manager === id)
  })
  return answer;
}

// console.log(isManager('burlId'));
// console.log(data.employees);

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  })
  return data.employees;
}

console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));
*/

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

console.log(entryCalculator({}));

// (people.Adult * entrants.Adult) + (people.Child * entrants.Child) + (people.Senior * entrants.Senior);
/*
function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

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
  //  isManager,
  //  addEmployee,
  animalCount,
  entryCalculator,
};
