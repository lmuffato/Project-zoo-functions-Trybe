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

const { animals, employees, hours, prices } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, animalAge) {
  const resp = animals.find((anim) => anim.name === animal);
  return resp.residents.every((residentAge) => residentAge.age > animalAge);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((anyManager) => anyManager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(employee);
}

// function animalCount(species) {
//   if (species === undefined) {
//     return animals.reduce((total, current) => {
//       total[current.name] = current.residents.length;
//       return total;
//     }, {});
//   }
//   return animals.find(({ name }) => name === species).residents.length;
// }

//  função implementada baseada na forma feita no repositório do Jodiel - https://github.com/tryber/sd-010-a-project-zoo-functions/pull/106
function entryCalculator(entrants) {
  const {Adult, Senior, Child} = prices;
  if (!entrants || entrants.length === 0) return 0;
  const keys = Object.keys(entrants);
  const value = Object.values(entrants);
  let total = 0;
  keys.forEach((key, index) => {
    if (key === 'Adult') {
      total += value[index] * prices.Adult;
    } else if (key === 'Senior') {
      total += value[index] * prices.Senior;
    } else if (key === 'Child') {
      total += value[index] * prices.Child;
    }
  });
  return total;
}

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // if (!dayName) return hours;
//   console.log(`${key}: 'Open from ${}am until ${}pm' ` {hours.key}
// }

// function oldestFromFirstSpecies(id) {
// identifica responsibleFor do funcionario
// na tabela animals identifica o id correspondente
// e pesquisa nos residents o age máximo e o sexo
// }

// function increasePrices(percentage) {
// pega tabela prices e traz os valores de volta
// price += price * percentage /100
// }

// function employeeCoverage(idOrName) {
// se vazio, traz employees;
// pesquisa id, firstName e lastName e traz responsibleFor
// }

module.exports = {
  entryCalculator,
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
