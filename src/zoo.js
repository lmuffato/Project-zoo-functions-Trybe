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

const { animals, employees } = require('./data');
// const data = require('./data');

// found about .includes at https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// Desenvolvido com ajuda das colegas Nathalia Zerbal, Debora Passos, Heloisa Hackenhaar, Djaniza Vasques, Bia Zidioti, Maria Luiza, Marilia, Carol Bitencourt, Priscila Scapin, Beatriz Barbosa, Wanderson Sales

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find((elAnimal) => elAnimal.name === animal)
    .residents.every((resident) => (resident.age >= age));
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((name) => name === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    const animalObj = animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length; return acc;
    }, {});
    return animalObj;
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

// function entryCalculator(entrants) {
//   // seu código aqui
// }

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
