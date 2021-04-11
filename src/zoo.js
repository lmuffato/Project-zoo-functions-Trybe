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

const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
const data = require('./data');

const { animals } = data;

function animalsByIds(...ids) {
  // seu código aqui
  const animalArray = animals.filter((animal) => ids.includes(animal.id));
  return animalArray;
}

function animalsOlderThan(animalName, ageAnimal) {
  // seu código aqui
  const nameAnimal = animals.find((animal) => animalName === animal.name);
  const ageCheck = nameAnimal.residents;
  return ageCheck.every((animal) => ageAnimal <= animal.age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    const emptyObject = {};
    return emptyObject;
  }
  return employees.find((employe) => employe.firstName === employeeName
  || employe.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  // const { managers } = employees;
  const personCheck = employees.filter((employ) => employ.managers.includes(id));
  return personCheck.some(() => id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
} // Consegui entender a lógica de utilizar o reduce e sua criação de objeto através do código do Paulo Henrique!

// function entryCalculator(entrants) {
//   // seu código aqui
//   if (entrants === undefined || Object.keys(entrants).length === 0) {
//     return 0;
//   }

//   const summAdult = (prices.Adult * ((entrants.Adult === undefined) ? 0 : entrants.Adult));
//   const summChild = (prices.Child * ((entrants.Child === undefined) ? 0 : entrants.Child));
//   const summSenior = (prices.Senior * ((entrants.Senior === undefined) ? 0 : entrants.Senior));
//   return summAdult + summChild + summSenior;
// }

// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));
// console.log(entryCalculator({ 'Adult': 1 }));
// console.log(entryCalculator({}));

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
//   const fullSchedule = {};
//   const days = Object.keys(hours);
//   const timeOpen = hours.Tuesday;
//   if (dayName === undefined) {
//     return hours;
//   }
// }

// console.log(schedule());

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const personCheck = employees.find((employ) => employ.id.includes(id));
  const firstSpecie = personCheck.responsibleFor[0];
  const animalsByPerson = animals.find((animal) => animal.id.includes(firstSpecie));
  const oldestAnimal = animalsByPerson.residents.sort((a, b) => a.age - b.age);
  return [oldestAnimal[oldestAnimal.length - 1].name,
    oldestAnimal[oldestAnimal.length - 1].sex,
    oldestAnimal[oldestAnimal.length - 1].age];
}

function increasePrices(percentage) {
  // seu código aqui
  const { Adult, Child, Senior } = prices;
  prices.Adult = parseFloat((Adult + (Math.ceil(Adult * percentage) / 100)).toFixed(2));
  prices.Child = parseFloat((Child + (Math.ceil(Child * percentage) / 100)).toFixed(2));
  prices.Senior = parseFloat((Senior + (Math.ceil(Senior * percentage) / 100)).toFixed(2));
  return prices;
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
//   if (idOrName === undefined) return employees.filter((employee) employee.id && employee.);
// }

module.exports = {
  // entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
