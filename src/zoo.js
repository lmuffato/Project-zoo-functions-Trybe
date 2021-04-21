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

const { employees, animals, prices } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return [];
  }
  return animals.filter((specie) => (ids.includes(specie.id)));
}

function animalsOlderThan(animal, age) {
  const findedAnimal = animals.find((specie) => (specie.name === animal));
  return findedAnimal.residents.every((resident) => (resident.age >= age));
}

function employeeByName(name) {
  const employee = employees
    .find((option) => (name === option.firstName || name === option.lastName));
  if (employee === undefined) {
    return {};
  }
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };

  if (newEmployee.managers === undefined) {
    newEmployee.managers = [];
  }
  if (newEmployee.responsibleFor === undefined) {
    newEmployee.responsibleFor = [];
  }
  employees.push(newEmployee);
  return newEmployee;
}

function isManager(id) {
  return employees.some((option) => (option.managers.includes(id)));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  if (newEmployee.managers === undefined) {
    newEmployee.managers = [];
  }
  if (newEmployee.responsibleFor === undefined) {
    newEmployee.responsibleFor = [];
  }
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const allSpecies = {};
    // Usando o forEach para percorrer o array de animais e incluir os nomes das espécies e quantidades no objeto: https://www.w3schools.com/jsref/jsref_foreach.asp
    animals.forEach((animal) => {
      // Incluindo os animais e suas quantidades no objeto: https://gomakethings.com/how-to-add-a-new-item-to-an-object-at-a-specific-position-with-vanilla-js/#:~:text=Create%20a%20new%20object.,that%20to%20the%20new%20object.
      allSpecies[animal.name] = animal.residents.length;
    });
    return allSpecies;
  }
  const specie = animals.find((animal) => (species === animal.name));
  return specie.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants.length === 0) {
    return 0;
  }
  let sumAllEntrants = 0;
  // Como retornar as propriedades de um objeto em um array: https://riptutorial.com/javascript/example/9824/convert-object-s-values-to-array#:~:text=You%20can%20convert%20its%20values,obj%5Bkey%5D%3B%20%7D)%3B%20console.
  const entrantsType = Object.keys(entrants);
  entrantsType.forEach((property) => {
    sumAllEntrants += prices[property] * entrants[property];
  });
  return sumAllEntrants;
}

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
//   return `Open from ${}am until ${}pm`
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui

// array.forEach(employees.responsibleFor => {
//   if (employees.responsibleFor[position] === animals.id) {
//     employees.responsibleFor[position] = animals.id
//   }
// });
// }

module.exports = {
  entryCalculator,
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
