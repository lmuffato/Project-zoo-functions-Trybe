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

const { animals } = require('./data');
const { employees } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  let selectedAnimals = []; // lanca array vazio
  // filtra animais por ids recebidos por paramento
  ids.forEach((id) => {
    selectedAnimals = [...selectedAnimals, ...animals.filter((animal) => {
      if (animal.id === id) return true;
      return false;
    })];
  });
  //  retorna selectedAnimals apos atribuir todos animais filtrados por id
  return selectedAnimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // Busca os animais a partir do nome de uma especie recebida por parametro
  // find() / every ()
  const animalBySpecies = animals.find(({ name }) => name === animal);

  // verificar idades
  // verificar se todos os animais daquela especie tem uma idade minima que foi recebida por parametro
  // forEach() / every() => retorna um booleano
  return animalBySpecies.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  // sem parametros retorna um objeto vazio {}
  if (!employeeName) {
    return {};
  }
  // quando provido o primeiro nome do funcionario, retorna o objeto do funcionario
  return employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  // - O parâmetro `personalInfo` recebe um objeto que contém o `id`, o `firstName` e o `lastName`
  // - O parâmetro `associatedWith` recebe um objeto que contém dois array: `managers` e `responsibleFor`
  // - Cria um novo colaborador a partir de objetos contendo `informações pessoais` e `gerentes e animais gerenciados`.
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  // verifica de o id passado por parametro é de algum gerente
  const manager = employees.some((employee, index) => employee.managers[index] === id);
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  // sem parametros deve retornar um objeto com todos os animais e a quantidade de cada especie.
  // construir o objeto com todos animais
  // reduce com inicialValue = {}
  const allAnimals = animals.reduce((acc, currentAnimal) => {
    acc[currentAnimal.name] = currentAnimal.residents.length;
    return acc;
  }, {});
  // se recebermos o nome da especie , devemos retornar a quantidade de animais dessa especie.
  if (species) {
    return allAnimals[species];
  }
  return allAnimals;
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
