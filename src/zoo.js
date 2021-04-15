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
  return data.animals.filter((specie) => ids.some((id) => id === specie.id) === true);
}

function animalsOlderThan(animal, age) {
  return data.animals.find((element) => element.name === animal)
    .residents.every((animals) => animals.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  if (employeeName) {
    return data.employees.find((employee) => employeeName === employee
      .firstName || employeeName === employee
      .lastName);
  }
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employeeNew = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employeeNew);
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }

  if (species !== undefined) {
    return data.animals.find((animal) => animal.name === species).residents.length;
  }
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { Adult, Senior, Child } = data.prices;
  const { Adult: Bigger = 0, Senior: OldMan = 0, Child: Kid = 0 } = entrants;
  return Adult * Bigger + Senior * OldMan + Child * Kid;
}

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
//   const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Monday} = data.hours;
//   if (!dayName) {
//     return {
//     };
//   }
//   return data.hours;
// }
// console.log(schedule());

function oldestFromFirstSpecies(id) {
  // seu código aqui ta ok
  const employeeSearch = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const animalSearch = data.animals.find((animal) => animal.id === employeeSearch);
  const biggerAge = animalSearch.residents.map((numberAge) => numberAge.age)
    .reduce((acc, curr) => Math.max(acc, curr), []);
  const objectAnimal = animalSearch.residents.find((element) => element.age === biggerAge);
  const { name, sex, age } = objectAnimal;
  return [name, sex, age];
}

const calc = (percentage) => ([key, value]) => [key, value + (value * (percentage * 0.01))];
const functionRound = ([key, value]) => { data.prices[key] = Math.round(value * 100) / 100; };
function increasePrices(percentage) {
  // referencia: https://www.guj.com.br/t/arredondamento-em-javascript/152284/2
  // referencia: https://github.com/tryber/sd-010-a-project-zoo-functions/pull/118/commits/449908023cb120522258232f6565f6a23c5dbeda
  // referencia: https://github.com/tryber/sd-010-a-project-zoo-functions/pull/118
  Object.entries(data.prices)
    .map(calc(percentage)).forEach(functionRound);
  return data.prices;
}

module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  //  animalMap,
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
