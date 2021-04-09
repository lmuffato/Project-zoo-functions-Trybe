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

// FIRST COMMIT <3

const data = require('./data');

function animalsByIds(...ids) {
  if (ids.lenght === 0) return [];
  if (ids.lenght === 1) {
    data.animals.find(({ id }) => id === ids[0]);
  }
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const specie = data.animals.find((creature) => creature.name === animal);
  return specie.residents.every((idade) => idade.age >= age);
}

function employeeByName(employeeName) {
// seu código aqui
  if (!employeeName) {
    return {};
  }
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}
function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employee;
}

function isManager(id) {
  return data.employees.some((item) => item.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // const { id, firstName, lastName } = personalInfo;
  // const { managers, responsibleFor } = associatedWith;
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

// if (species === undefined) return { };
// parâm: data.animals.name
// entrar no data.animals.residents
function animalCount(species) {
  if (!species) {
    const animalObj = data.animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length; return acc;
    }, {});
    return animalObj;
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}
// function entryCalculator(entrants) {
// seu código aqui
// }

// function animalMap(options) {
// seu código aqui
// }

// function schedule(dayName) {
// seu código aqui
// }

// function oldestFromFirstSpecies(id) {
// seu código aqui
// }

// function increasePrices(percentage) {
// seu código aqui
// }

// function employeeCoverage(idOrName) {
//   const funcionario = '${data.employees.firstName}: ${data.employee.responsibleFor}';
//   // const employee = data.employee
//  if (idOrName === undefined) {
//    for (let i =0; i<= employee.lenght === 0; i + 1 ); {
//    const objetoFunc = employees.reduce((cont, funcionario) => {
//    cont[cont.name] = cont.employee.lenght;
//    return cont;
//   }, {});
//  }
// }
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
