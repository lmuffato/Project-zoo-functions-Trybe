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

const { animals } = data;

function animalsByIds(...ids) {
  // seu código aqui
  const arr = [];
  data.animals.forEach((animal) => {
    const equal = ids.some((id) => id === animal.id);
    if (equal === true) arr.push(animal);
  });
  return arr;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const obj = data.animals.filter((element) => element.name === animal)[0];
  return obj.residents.every((elemento) => elemento.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return data.employees
    .filter((employer) => employer.firstName === employeeName
    || employer.lastName === employeeName)[0];
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some((employ) => employ.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function countArrayAnimals() {
  const numberAnimals = animals.map(({ name, residents }) => {
    const obj = {};
    obj[name] = residents.length;
    return obj;
  });
  return numberAnimals;
}

function reduceAnimals() {
  return countArrayAnimals().reduce((acc, element) => {
    const [keyName] = Object.keys(element);
    const [valueNumberOfAnimals] = Object.values(element);
    acc[keyName] = valueNumberOfAnimals;
    return acc;
  }, {});
}

function animalCount(species) {
  // seu código aqui
  let animalNumbers = reduceAnimals();
  animals.forEach((animal, index) => {
    if (animal.name === species) {
      animalNumbers = countArrayAnimals()[index][species];
    }
  });
  return animalNumbers;
}

console.log(animalCount('lions'));

/*
function entryCalculator(entrants) {
  // seu código aqui
}

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
*/

module.exports = {
  //  entryCalculator,
  //  schedule,
  animalCount,
  //  animalMap,
  animalsByIds,
  employeeByName,
  //  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  //  oldestFromFirstSpecies,
  //  increasePrices,
  createEmployee,
};
