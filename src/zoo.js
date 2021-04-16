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

const { prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aquia
  // nenhum parametro? retornar array vazio
  // um unico parametro? retornar o objeto do animal referente ao ID apresentado
  // mais de um parametro? retornar array com todas as especies referentes aos IDs
  const result = ids.map((actualId) => (data.animals.find((animal) => actualId === animal.id)));
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const findAnimal = data.animals.find((actualAnimal) => (actualAnimal.name === animal));
  return findAnimal.residents.every((residents) => (residents.age > age));
}

function employeeByName(employeeName) {
  // seu código aqui
  const Employee = data.employees.find((aEmployeeName) =>
    (aEmployeeName.firstName === employeeName || aEmployeeName.lastName === employeeName));
  if (Employee === undefined) {
    return {};
  }
  return Employee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const { employees } = data;
  const findEmployee = employees.find((employee) => employee.id === id);
  if (findEmployee.managers.length < 2) return true;
  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: [],
    responsibleFor: [],
  };
  if (managers !== undefined) { newEmployee.managers = managers; }
  if (responsibleFor !== undefined) { newEmployee.responsibleFor = responsibleFor; }
  data.employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  const { animals } = data;
  const allAnimalsQuantity = (accumulator, animal) => {
    accumulator[animal.name] = animal.residents.length;
    return accumulator;
  };
  const noParameter = animals.reduce(allAnimalsQuantity, {});
  return (species === undefined) ? noParameter : animals.find(({ name }) =>
    name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  let fullPrice = 0;
  if (entrants === undefined) {
    return 0;
  }
  Object.keys(entrants).forEach((key) => { fullPrice += data.prices[key] * entrants[key]; });
  return fullPrice;
}

function animalMap(options) {
  const baz = options;
  return baz;
}

function schedule(dayName = undefined) {
  // seu código aqui
  const { hours } = data;
  const weekDays = Object.keys(hours);
  const noParameter = weekDays.reduce((accumulator, day) => {
    const { open, close } = hours[day];
    const isOpen = open - close !== 0
      ? `Open from ${open}am until ${close - 12}pm`
      : 'CLOSED';
    return { ...accumulator, ...{ [day]: isOpen } };
  }, {});
  if (!dayName) return noParameter;
  const [date, mensage] = Object.entries(noParameter).find(([_date, _mensage]) =>
    _date === dayName);
  return ({ [date]: mensage });
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const { employees } = data;
  const employee = employees.find((currentEmployee) => (currentEmployee.id === id));
  const animalId = employee.responsibleFor[0];
  const animal = data.animals.find((currentAnimal) => (currentAnimal.id === animalId));
  const ageSorted = animal.residents.sort((ageA, ageB) => ageA.age - ageB.age);
  const olderAnimalIndex = ageSorted.length - 1;
  const olderAnimal = ageSorted[olderAnimalIndex];

  return Object.values(olderAnimal);
}

function increasePrices(percentage) {
  // seu código aqui
  const arrayOptions = Object.keys(prices);
  const porcentagem = 1 + (percentage / 100);
  arrayOptions.forEach((currentValue) => {
    prices[currentValue] = (Math.round((prices[currentValue] * porcentagem) * 100)) / 100;
  });
}

function employeeCoverage(idOrName) {
  const baz = idOrName;
  return baz;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
