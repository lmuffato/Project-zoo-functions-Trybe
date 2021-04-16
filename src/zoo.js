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
const { hours } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  const filteredById = animals.filter((animal, index) => (animal.id === ids[index]));
  return filteredById;
}

function animalsOlderThan(animal, age) {
  // Esta função, a partir do nome de uma espécie e uma idade mínima, verifica se todos os animais daquela espécie possuem a idade mínima especificada
  const selectedAnimal = animals.find((eachAnimal) => eachAnimal.name === animal);
  const checkAges = selectedAnimal.residents.every((resident) => (resident.age >= age));
  return checkAges;
}

function employeeByName(employeeName) {
  // Sem parâmetros, retorna um objeto vazio
  // Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  // Quando provido o último nome do funcionário, retorna o objeto do funcionário
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((employee) => (
    (employee.firstName === employeeName || employee.lastName === employeeName)));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const param = (prev, curr) => {
      const fix = prev;
      fix[curr.name] = curr.residents.length;
      return fix;
    };
    return animals.reduce(param, {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
}
// const allSpecies = animals.map((animal) => `${animal.name}: ${animal.residents.length}`);
// console.log(animals.reduce((prev, curr) => { prev[curr.name] = curr.residents.length; return prev;}, {}));

function entryCalculator({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  // A partir da quantidade de visitantes e a faixa etária de cada um, esta função é responsável por retornar o preço total a ser cobrado
  // Observações técnicas
  // O parâmetro entrants recebe um objeto que contém as chaves Adult, Child e Senior, com suas respectivas quantidades de pessoas
  // O que será avaliado
  // Retorna 0 se nenhum argumento for passado
  // Retorna 0 se um objeto vazio for passado
  // Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
  return Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
}

// function animalMap(options) {
// seu código aqui
// }

function schedule(dayName) {
  const opSchedule = {};
  const weekDays = Object.values(hours);
  weekDays.forEach((day, index) => {
    const opTime = Object.keys(hours)[index];
    const hour = weekDays[index];
    Object.assign(opSchedule, { [opTime]: `Open from ${hour.open}am until ${hour.close - 12}pm` });
  });
  Object.assign(opSchedule, { Monday: 'CLOSED' });
  return (dayName !== undefined ? { [dayName]: opSchedule[dayName] } : opSchedule);
}
// console.log(schedule('Monday'));
// console.log(schedule('Tuesday'));
// console.log(schedule());
// console.log(schedule('asdasd'));

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
  // increasePrices,
  createEmployee,
};
