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

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  if (ids === null || ids === undefined) return [];
  return animals.filter((animal, index) => animal.id === ids[index]);
}
// Com a ajuda do plantão do instrutor Eliezer Queiroz e sugestão da colega Carolina Vasconcellos.

function animalsOlderThan(animal, age) {
  return animals.find((oneAnimal) => oneAnimal.name === animal)
    .residents.every((resident) => resident.age >= age);
}
// Solução da função animalsOlderThan compartilhada pela colega Thalita Cecilier, em reunião do grupo de estudo.

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const searchEmployee = employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return searchEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}
// Ideia surgiu a partir de discussão em grupo de estudo das meninas da turma.
// Adaptei a função isManager a partir da solução compartilhada pela colega Thalita Cecilier durante a reunião do grupo.

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

const createAnimalsList = () => {
  const animalList = animals.reduce((obj, animal) => {
    const objt = obj;
    objt[animal.name] = animal.residents.length;
    return obj;
  }, {});
  return animalList;
};
// Função createAnimalsList adaptada da ideia da colega Beatriz Barbosa, conforme discutimos em grupo de estudo

function animalCount(species) {
  if (!species) {
    return createAnimalsList();
  }
  const soughtSpecie = animals.find((animal) => species === animal.name);
  return soughtSpecie.residents.length;
}

function entryCalculator(entrants = {}) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  if (entrants === undefined) return 0;
  const totalAdult = Adult * prices.Adult;
  const totalChild = Child * prices.Child;
  const totalSenior = Senior * prices.Senior;
  return parseFloat((totalAdult + totalChild + totalSenior).toPrecision(5));
}
// Retirei parseFloat das constantes e deixei só no return,
// aderindo à ideia (e sugestão) da colega Heloísa Hackenhaar, conforme discutimos em grupo de estudo

/*
function animalMap(options) {
  // seu código aqui
}
*/
/*
const cronograma = () => {
  // const day = {};
  const days = Object.keys(hours);
  return days;
};
// console.log(Object.values(days));
console.log(cronograma());
*/
/*
function schedule(dayName) {
  if (dayName === undefined) {
    return cronograma();
  }
  // const day = {};
}
*/
/*
const animalsIds = (animalId) => {
  // let arr = [];
  animalId.filter((animal, index) => {
    // animal.name;
    // animal.sex;
    // animal.age;
  });
};
*/
//  retorna um array com nome, sexo e idade do animal mais velho dessa espécie
/*
const desestrutura = () => {
  const residentes = animals[0].residents;
  const ages = residentes[0].age;
  return ages;
};
// console.log(desestrutura());
*/
/*
function oldestFromFirstSpecies(id) {
  // const soughtId = employees.find((employee) => employee.id === id); // encontra o funcionário
  // const speciesId = soughtId.responsibleFor.find((specie) => specie); // localiza o id da primeira espécie
  // const discoverAnimal = animals.find((animal) => animal.id === speciesId); // localiza o animal correspondente ao ID
  // const residents = discoverAnimal.residents.filter((resident) => resident); // localiza os residentes
  // return residents;
}
// console.log(oldestFromFirstSpecies('56d43ba3-a5a7-40f6-8dd7-cbb05082383f')); */

const calculateIncrease = (percent) => 1 + (percent / 100) + 0.00001;

function increasePrices(percentage) {
  const increasePrice = calculateIncrease(percentage);
  prices.Adult = parseFloat((prices.Adult * increasePrice).toPrecision(4));
  prices.Senior = parseFloat((prices.Senior * increasePrice).toPrecision(4));
  prices.Child = parseFloat((prices.Child * increasePrice).toPrecision(4));
}

/*
function employeeCoverage(idOrName) {
  const animalsEmployees = employees.reduce((previousValue, value) => {
    const previous = previousValue;
    const valueItems = value.responsibleFor;
    // const discoverAnimal = animals.filter((animal, index) => animal.id === valueItems[index]);
    previous[`${value.firstName} ${value.lastName}`] = valueItems;
    return previous;
  }, {});
  if (idOrName === undefined) {
    return animalsEmployees;
  }
}
console.log(employeeCoverage());
*/
// Referências:
// http://www.macoratti.net/18/09/js_marr2.htm

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
  // oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
