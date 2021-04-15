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
const { employees } = data;

function animalsByIds(...ids) {
  const newArray = [];
  if (ids === undefined) {
    return newArray;
  }
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const getAnimal = animals.filter((currentAnimal) => (currentAnimal.name === animal));
  return getAnimal.every((currentSpecie, index) => (currentSpecie.residents[index].age > age));
}

function employeeByName(employeeName) {
  const defaultArr = {};
  if (employeeName === undefined) {
    return defaultArr;
  }
  return employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployeeArray = { id, firstName, lastName, managers, responsibleFor };
  return newEmployeeArray;
}

function isManager(id) {
  return employees.some((employee, index) => employee.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  if (newEmployee.managers === undefined) {
    newEmployee.managers = [];
  }
  if (newEmployee.responsibleFor === undefined) {
    newEmployee.responsibleFor = [];
  }
  return employees.push(newEmployee);
}

// function animalCount(species) {
//   if (species === undefined) {
//       return animals.reduce((accumulator, currentAnimal) => {
//         const objAnimalId = currentAnimal.name;
//         return accumulator.id = objAnimalId;
//     }, {})
//   };
// }

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

function oldestFromFirstSpecies(id) {
  const resultArray = [];
  const getEmployee = employees.find((employee) => employee.id === id);
  const firstSpecieID = (getEmployee.responsibleFor)[0];
  const getAnimal = animals.filter((animal) => animal.id === firstSpecieID);
  const [ residents ] = getAnimal;
  let olderAnimalAge = residents.residents[0].age;
  const getOlderAnimal = residents.residents.find((residentAnimal) => {
    if (residentAnimal.age > olderAnimalAge) {
      olderAnimalAge = residentAnimal.age;
      return residentAnimal;
    }
  });
  resultArray.push(getOlderAnimal.name, getOlderAnimal.sex, getOlderAnimal.age);
  return resultArray;
}

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
  oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
