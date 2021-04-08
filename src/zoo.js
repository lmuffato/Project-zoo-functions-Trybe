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
  const { animals } = data;
  const arr = animals.filter((item) => ids.includes(item.id));
  return arr;
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  const arr = animals.find((item) => item.name === animal);
  return arr.residents.every((item) => item.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const { employees } = data;
  const obj = employees.find((item) => {
    const first = item.firstName;
    const second = item.lastName;
    return first === employeeName || second === employeeName;
  });
  return obj;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const employee = data.employees.find((item) => item.id === id);
  return employee.managers.length <= 1;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species = undefined) {
  const { animals } = data;
  if (species === undefined) {
    // o codigo da função seguinte foi baseado em: https://github.com/eslint/eslint/issues/8581
    const obj = animals.reduce((acumulat, animal) => {
      const acumulator = { ...acumulat };
      acumulator[animal.name] = animal.residents.length;
      return acumulator;
    }, {});
    return obj;
  }
  const arr = animals.find((item) => item.name === species);
  return arr.residents.length;
}

function entryCalculator(visitors) {
  const { prices } = data;
  if (visitors === undefined) {
    return 0;
  }
  let sum = 0;
  const arr = Object.keys(visitors);
  arr.forEach((item) => {
    let price = (prices[item] * visitors[item]);
    price = Number(price.toPrecision(4));
    sum += price;
  });
  return sum;
}

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
