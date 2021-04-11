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
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const species = animals.find((especies) => especies.name === animal).residents;
  return species.every((oldAnimal) => oldAnimal.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees
    .find(({ firstName, lastName }) => firstName
      .includes(employeeName) || lastName.includes(employeeName));
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
  return employees.some(({ managers }, i) => managers[i] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return animals.find((animal) => species === animal.name).residents.length;
} // Agradecimento ao colega Anderson Nascimento que ajudou na solução deste requisito.

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) return 0;

  const people = Object.entries(entrants);
  return people.map(([chave, valor]) => valor * prices[chave]).reduce((acc, curr) => acc + curr);
} // Obtive ajuda do Luan Ramalho neste código.

// function animalMap(options) {
//   // seu código aqui
// }
const mensagem = (open, close) => (
  open === 0 && close === 0 ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`);
function schedule(dayName) {
  const { hours } = data;
  const obj = {};

  Object.entries(hours).forEach(([day, { open, close }]) => {
    obj[day] = mensagem(open, close);
  });
  if (!dayName) return obj;
  return { [dayName]: obj[dayName] };
}
// Recebi ajuda dos amigos, Adelino, Gabriel, Rafael Medeiros, Murilo e Lucas Lara em um plantão no sábado.

function oldestFromFirstSpecies(funcionario) {
  const responsabilidade = employees.find(({ id }) => id === funcionario).responsibleFor;

  const animal = animals.find(({ id }) => id === responsabilidade[0]);
  const { residents } = animal;
  residents.sort((a, b) => b.age - a.age);

  return Object.values(residents[0]);
} // Obtive ajuda do colega Adelino e Rafael Ribeiro.

function increasePrices(percentage) {
  Object.keys(prices).forEach((key) => {
    prices[key] = parseFloat((prices[key] * (percentage / 100 + 1) + 0.005).toFixed(2));
  });
} // Obtive ajuda dos colegas Tiago Santos, Rafael Medeiros e Victor.

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
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
