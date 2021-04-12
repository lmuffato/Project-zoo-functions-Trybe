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

const { animals, employees, prices } = require('./data');
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

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, current) => {
      acc[current.name] = current.residents.length;
      return acc;
    }, {});
  }
  return animals.find(({ name }) => name === species).residents.length;
}

//  função implementada baseada na forma feita no repositório do Nilson - https://github.com/tryber/sd-010-a-project-zoo-functions/pull/80
function entryCalculator(entrants) {
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: adulto, Senior: idoso, Child: criança } = prices;
  return (adulto * Adult) + (idoso * Senior) + (criança * Child);
}

// function animalMap(options) {
//   // seu código aqui
// }

// const days = `${key}: 'Open from ${open}am until ${close}pm' ` {hours.key}
// const zooSchedule = hours.map((day) => {
//   return hours.day;
// });

// function schedule(dayName) {
//   if (!dayName) return hours;
//   zooSchedule.forEach(element =>
//     days(hours.open, hours.close))
// };

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
