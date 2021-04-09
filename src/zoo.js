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

// function animalCount(species) {
//   if (species === undefined) {
//     const undefinedSpecie = data.animals
//       .map((animal) => `${animal.name}: ${(animal.residents).length}`);
//     return undefinedSpecie;
//   }
//   if (species === data.animals.species) {
//     return `${(data.animals.residents).length}`;
//   }
// }
// console.log(animalCount('lions'));

// function entryCalculator(entrants) {
//   let entrantsNumb = {};

// }
// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

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
  // entryCalculator,
  // schedule,
  // animalCount,
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
