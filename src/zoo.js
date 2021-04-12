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
const { prices } = require('./data');
const data = require('./data');

// Requisito 1, 2, 3 e 5 feitos colaborativamente com as colegas: Nathi Zebral, Thalita Cecilier, Debora PAssos, Djaniza Vasques Ferreira e Bia Zidioti. <3
function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

// Inspirado na resolução do NilsonRCS > https://github.com/tryber/sd-010-a-project-zoo-functions/pull/80/files
/* Entende-se que o primeiro passo é criar uma constante que busque
qual dos animais dentro de .data, que tenham seu name igual ao parametro passado.
A segunda etapa, retorna true (every), quando a idade de todos os animais, dos passados como parametro
sejam maior ou igual do que a idade passada como parametro. */
// Feito colaborativamente com as colegas: Nathi Zebral, Thalita Cecilier, Debora PAssos. <3

function animalsOlderThan(animal, age) {
  const animalName = data.animals.find((bixo) => bixo.name === animal);
  return animalName.residents.every((idadeAnimal) => idadeAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((elem) =>
    elem.lastName === employeeName || elem.firstName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers = [], responsibleFor = [] } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

// Inspiração na resolução do Renzo: https://github.com/tryber/sd-010-a-project-zoo-functions/pull/12/commits/1a3a8c3aba8cb38e7d0b28654181a325743eb124
/* Entende-se aqui que o primeiro some passa pelo array de empregados,
acessando cada um deles, no caso o "empregado da vez", nestes, é acessada
a chave managers, e se nesta esta inclusa o id, usado como parametro. */

function isManager(id) {
  return employees.some((empregadoDaVez) => empregadoDaVez.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

// Resolução aprendida com a Beatriz Barbosa, https://github.com/tryber/sd-010-a-project-zoo-functions/pull/10/files
function animalCount(species) {
  // Função sem parâmetro
  const listaAnimal = animals.reduce((acc, item) => {
    acc[item.name] = item.residents.length;
    return acc;
  }, {});

  if (!species) {
    return listaAnimal;
  }
  // Função com parâmetro
  const objetoEspecies = animals.find((item) => item.name === species);
  const ArrayEspecies = objetoEspecies.residents.length;
  return ArrayEspecies;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  // faz a conta para cada idade, usando o parseFloat para arrendodar corretamente
  const adultsPrice = Adult * prices.Adult;
  const childsPrice = Child * prices.Child;
  const seniorsPrice = Senior * prices.Senior;
  return parseFloat((seniorsPrice + adultsPrice + childsPrice).toFixed(2));
}

/* function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
} */

// Inspirada na resolução desenvolvida pela Marília, https://github.com/tryber/sd-010-a-project-zoo-functions/pull/109/files
/* Entende-se que esta função inicia com a definição de uma variavel que armazena o calculo de porcentagem.
Na sequencia, uma nova variavel é definida para armazenar as chaves de prices.
Posteriormente, nesta variavel é aplicado um forEach, em que, para cada chave de price (no caso os grupos etarios)
e aplica a cada um deles o calculo. */
function increasePrices(percentage) {
  const percent = (1 + (percentage / 100));
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    prices[key] = (Math.round(prices[key] * percent * 100) / 100);
  });
}

function employeeCoverage(idOrName) {
  const objectEmployeeResponsibleFor = {};
  // Sem parametro > retorno: lista de funcionarios, e animais pelos quais sao responsaveis
  if (!idOrName) {
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      objectEmployeeResponsibleFor[`${firstName} ${lastName}`] = responsibleFor.map((animalId) =>
        animals.find(({ id }) => animalId === id).name);
    });
    return objectEmployeeResponsibleFor;
  }
  // Nome do funcionario como parametro
  const findEmployee = employees.find((elem) =>
    idOrName === elem.lastName || idOrName === elem.firstName || idOrName === elem.id);
  const fullName = `${findEmployee.firstName} ${findEmployee.lastName}`;
  objectEmployeeResponsibleFor[fullName] = findEmployee.responsibleFor.map((animalId) =>
    animals.find(({ id }) => animalId === id).name);
  return objectEmployeeResponsibleFor;
}
console.log(employeeCoverage('Wilburn'));

module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
