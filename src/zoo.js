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

function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.some(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const result = data.animals.find(especie => especie.name === animal);
  return result.residents.every(residente => residente.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const dataE = data.employees;
  const rst = dataE.find(pos => pos.firstName === employeeName || pos.lastName === employeeName);
  return rst;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  function isManegerHere(employe, compareID) {
    return employe.managers.some(manegerId => manegerId === compareID);
  }
  return data.employees.some(employe => isManegerHere(employe, id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor };
  data.employees.push(newEmployee);
}

function animalCount(species) {
}

function entryCalculator(entrants = 0) {
  const pricesData = data.prices;
  const pricesCategories = Object.keys(pricesData);
  const totalPrice = pricesCategories.reduce((accumulator, priceCategory) => {
    const priceToAdd =
    entrants[priceCategory] ? entrants[priceCategory] * pricesData[priceCategory] : 0;
    const priceToPay = accumulator + priceToAdd;
    return priceToPay;
  }, 0);
  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const days = {};
  Object.keys(data.hours).forEach((day) => {
    if (day !== 'Monday') {
      days[day] = `Open from ${data.hours[day].open}am until ${(data.hours[day].close) - 12}pm`;
    } else {
      days[day] = 'CLOSED';
    }
  });
  if (!dayName) {
    return days;
  }
  return { [dayName]: days[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employeeData = data.employees.find(employee => employee.id === id);
  const firstAnimalID = employeeData.responsibleFor[0];
  const animalResidents = data.animals.find(animal => animal.id === firstAnimalID).residents;
  const oldestAnimalAge = animalResidents.reduce((accumulator, resident) =>
    ((resident.age > accumulator) ? resident.age : accumulator), 0);
  const oldestAnimalResident = animalResidents.find(animal => animal.age === oldestAnimalAge);
  const { name, sex, age } = oldestAnimalResident;
  const returnData = [name, sex, age];
  return returnData;
}

function increasePrices(percentage) {
  const pricesOptions = Object.keys(data.prices);
  const priceRateToChange = 1 + (percentage / 100);
  pricesOptions.forEach(priceOption =>
  (data.prices[priceOption] =
    (Math.round((data.prices[priceOption] * priceRateToChange) * 100)) / 100));
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
// Playground functions foi legal né? Pra mim, foi.
// SXNzbyBuw6NvIMOpIHVtYSBzZW5oYS4=
// 70 61 73 74 65 62 69 6e 2e 63 6f 6d 2f 6b 58 39 79 36 57 55 61
