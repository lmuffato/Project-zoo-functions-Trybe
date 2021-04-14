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

const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const animais = data.animals;// ou const { animais } = data;
  return animais.filter((animal) => ids.some((id) => id === animal.id));
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  return animals.find((animalZoo) => animalZoo.name === animal)
    .residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  // const { employees } = data;
  if (!employeeName) {
    return {};
  }
  return employees.find((name) =>
    name.firstName === employeeName || name.lastName === employeeName);
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
  // const { employees } = data;
  return employees.some(({ managers }) => managers.indexOf(id) !== -1);// se existe em cada index o id
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // const { employees } = data;
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return employees;
}

function animalCount(species) {
  const { animals } = data;
  if (!species) {
    const animaisPopulacao = {};
    animals.forEach(({ name, residents }) => {
      animaisPopulacao[name] = residents.length;// para cada 'name/chave' recebe o valor/quantidade de 'residents/index'
    });
    return animaisPopulacao;
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  const { prices } = data;
  if (!entrants) {
    return 0;
  }
  return Object.keys(entrants)
    .reduce((acc, current) =>
      acc + (entrants[current] * prices[current]), 0);// acc = 0; entrants[current] = quantidadePessoasEntram , prices[current] = presoEntrada
}

/* function animalMap(options) {
  // seu código aqui
} */

function schedule(dayName) {
  const { hours } = data;
  const dias = Object.keys(hours);
  const agendaSemanal = {};
  dias.forEach((dia, index) => {
    const abertura = hours[dia].open;
    const fechamento = hours[dia].close - 12;
    if (index === 6) {
      agendaSemanal[dia] = 'CLOSED';
    } else {
      agendaSemanal[dia] = `Open from ${abertura}am until ${fechamento}pm`;
    }
  });
  if (!dayName) return agendaSemanal;
  return { [dayName]: agendaSemanal[dayName] };
}

/* function oldestFromFirstSpecies(id) {
  const { animals } = data;
  const { employees } = data;
  //retorna um array com nome, sexo e idade do animal mais velho dessa espécie'
  const idAnimais = employees.find((employee) => employee.id === id).responsibleFor[0]
  //return idAnimais;
  const animalMonitorado = animals.filter((animal) => animal.id === idAnimais)
  //return animalMonitorado;
  return animalMonitorado.map((animal) => animal.residents)
}

console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992')); */
// stephanieId ['Vicky', 'female', 12]
// console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));
// ['Margherita', 'female', 10]

function increasePrices(percentage) {
  const { prices } = data;
  const propriedades = Object.keys(prices);
  const percentual = (percentage / 100) + 1;
  propriedades.forEach((propriedade) => {
    const valorAlterado = prices[propriedade] * percentual;
    prices[propriedade] = Math.round(valorAlterado * 100) / 100;// ele tá multiplicando por 100 e dividindo por 100 - para arredondar o valor mais proximo para cima;
  });
  return prices;
}

/* function employeeCoverage(idOrName) {
  // seu código aqui
} */

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
  // oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
