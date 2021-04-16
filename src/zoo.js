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
  const result = ids.map(actualId => data.animals.find(animal => actualId === animal.id));
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const findAnimal = data.animals.find(actualAnimal => actualAnimal.name === animal);
  return findAnimal.residents.every(residents => residents.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  const Employee = data.employees.find(aEmployeeName => aEmployeeName.firstName === employeeName
    ||
    aEmployeeName.lastName === employeeName);
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
  const manager = data.employees.find(employeeId =>
    employeeId.managers.find(currentValue => currentValue === id) === id);
  if (manager === undefined) {
    return false;
  }
  return true;
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

function animalCount(species = undefined) {
  // seu código aqui
  const list = {};
  if (species === undefined) {
    data.animals.forEach((currentValue) => {
      list[currentValue.name] = currentValue.residents.length;
    });
    return list;
  }
  return data.animals.find(currentValue => currentValue.name === species).residents.length;
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
  // seu código aqui
}

function schedule(dayName = undefined) {
  // seu código aqui
  const { hours } = data;
  const days = Object.keys(hours);
  const cronogram = {};
  days.forEach((day) => {
    if (day === 'Monday') {
      cronogram[day] = 'CLOSED';
    } else {
      const open = hours[day].open;
      const close = hours[day].close - 12;
      cronogram[day] = `Open from ${open}am until ${close}pm`;
    }
    return cronogram;
  });
  if (dayName === undefined) {
    return cronogram;
  }
  return { [dayName]: cronogram[dayName] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const { employees } = data;
  const employee = employees.find(currentEmployee => currentEmployee.id === id);
  const animalId = employee.responsibleFor[0];
  const animal = data.animals.find(currentAnimal => currentAnimal.id === animalId);
  const ageSorted = animal.residents.sort(function (ageA, ageB) { return ageA.age - ageB.age; });
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
  // seu código aqui
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
