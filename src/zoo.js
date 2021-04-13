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

/* ITEM vai receber tudo que vem de DATA.ANIMALS,
depois vai verificar se o que foi recebido em IDS
tem algo em comum com o recebido em ITEM,
tudo isso baseando-se pelo ID. */
function animalsByIds(...ids) {
  return data.animals.filter((item) => ids.includes(item.id));
}

/* Vai procurar (FIND) dentro de DATA.ANIMALS o primeiro
elemento na qual a propriedade NAME é igual ao parâmetro "nomeAnimals".
Depois vai verificar se TODAS (EVERY) as idades da propriedade AGE
são maiores que o parâmetro "idade" fornecido pelo teste. */
function animalsOlderThan(nomeAnimal, idade) {
  const verificarAnimal = data.animals.find(({ name }) => name === nomeAnimal);
  return verificarAnimal.residents.every(({ age }) => age > idade);
}

/* Procura no DATA.EMPLOYESS o primeiro elemento onde a
propriedade "fisrtName" OU "lastName" for igual ao
parâmetro EMPLOYESSNAME. */
function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

/* Levando em consideração que os parâmetros "personalInfo" e "associatedWith"
vão enviar respectivamente o que eu preciso (chave e valor), basta
distribuir (Spread operator) dentro de uma nova constante e retornar ela. */
function createEmployee(personalInfo, associatedWith) {
  const novoEmpregado = { ...personalInfo, ...associatedWith };
  return novoEmpregado;
}

/* Acho que tem um erro no DATA.EMPLOYEES ou no TESTE. Depois preciso rever. */
function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

/* A função vai receber vários parâmetros. Alguns parâmetros
como "managers" e "responsibleFor" podem receber mais de um
argumento, portanto são arrays e por isso tem "= []"
depois do nome do parâmetro. */
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const adicionaEmpregado = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(adicionaEmpregado);
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((indexAcumulador, indexAtual) => {
      indexAcumulador[indexAtual.name] = indexAtual.residents.length;
      return indexAcumulador;
    }, {});
  }
  return data.animals.find((item) => species === item.name).residents.length;
}

/* function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
} */

module.exports = {
  /* entryCalculator, */
  /* schedule, */
  animalCount,
  /* animalMap, */
  animalsByIds,
  employeeByName,
  /* employeeCoverage, */
  addEmployee,
  isManager,
  animalsOlderThan,
  /* oldestFromFirstSpecies, */
  /* increasePrices, */
  createEmployee,
};
