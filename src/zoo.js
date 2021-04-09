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

// const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) { // Utilizamos o rest para a função podere receber mais de um parâmetro.
  const animalsReturned = data.animals.filter((animal, index) => animal.id === ids[index]); // Filtramos os animais pelo id, percorrendo suas posições.
  return animalsReturned;
}

function animalsOlderThan(animal, age) {
  const animalToCheck = data.animals.find((resident) => resident.name === animal).residents; // Achamos os animais residentes pelo nome. Aplicamos o every para verificar se todos os elementos do array satisfazem a condição.
  return animalToCheck.every((animalName) => animalName.age > age);
}

function employeeByName(employeeName) {
  const emp = data.employees;
  if (employeeName === undefined) {
    return {};
  }
  return emp.find((eName) => eName.firstName === employeeName || eName.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
}

function isManager(id) {
  const emp = data.employees;
  return emp.find((employee) => employee.managers.includes(id)) !== undefined;
}
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const undefinedSpecie = {};
  if (species === undefined) {
    data.animals.forEach((animal) => {
      undefinedSpecie[animal.name] = animal.residents.length;
    });
    return undefinedSpecie;
  }
  const selectedAnimal = data.animals.find((animalName) => animalName.name === species);
  return selectedAnimal.residents.length;
}
// console.log(animalCount('lions'));

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === { }) {
    return 0;
  }
  const price = data.prices;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return ((price.Adult * Adult) + (price.Child * Child) + (price.Senior * Senior));
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const undefinedDay = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName === undefined) {
    return undefinedDay;
  }
}
console.log(schedule('Monday'));

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
