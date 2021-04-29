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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter((animal) => ids.find((id) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const container = data.animals.find((animalS) => animalS.name === animal);
  return container.residents.every((animalResident) => animalResident.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const e = data.employees;
  const name = e.find((emp) => emp.firstName === employeeName || emp.lastName === employeeName);
  return name;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(addNewEmployee);
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((accumulator, animal) => {
      accumulator[animal.name] = animal.residents.length;
      return accumulator;
    }, {});
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  return (!entrants || Object.keys(entrants).length === 0) ? 0
    : Object.keys(entrants).reduce((accumulator, option) => {
      const price = data.prices[option] * entrants[option];
      const pay = accumulator + price;
      return pay;
    }, 0);
}

//  function animalMap(options) {
//  }

function schedule(dayName) {
  const obj = {};
  Object.keys(data.hours).forEach((day) => {
    if (day !== 'Monday') {
      obj[day] = `Open from ${data.hours[day].open}am until ${(data.hours[day].close) - 12}pm`;
    } else {
      obj[day] = 'CLOSED';
    }
  });
  return dayName ? { [dayName]: obj[dayName] } : obj;
}

function oldestFromFirstSpecies(id) {
  const specieId = data.employees.find((ids) => ids.id === id).responsibleFor[0];
  const animalResidents = data.animals.find((ids) => ids.id === specieId).residents;
  const specie = animalResidents.sort((a, b) => b.age - a.age)[0];

  return [specie.name, specie.sex, specie.age];
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = data.prices;
  data.prices.Adult = Math.ceil(Adult * ((percentage) + 100)) / 100;
  data.prices.Child = Math.ceil(Child * ((percentage) + 100)) / 100;
  data.prices.Senior = Math.ceil(Senior * ((percentage) + 100)) / 100;
}

function employeeCoverage(idOrName) {
  const allEmp = {};
  if (!idOrName) {
    const empAndAnimal = employees.map((employee) => employee.responsibleFor
      .map((animalEmp) => animals
        .find((animal) => animal.id === animalEmp).name));
    employees.forEach(({ firstName, lastName }, index) => {
      allEmp[`${firstName} ${lastName}`] = empAndAnimal[index];
    });
    return allEmp;
  }
  const aEmp = employees.find((employee) => employee.id === idOrName
  || employee.firstName === idOrName
  || employee.lastName === idOrName);
  return { [`${aEmp.firstName} ${aEmp.lastName}`]: aEmp.responsibleFor.map((animalEmp) => animals
    .find((animal) => animal.id === animalEmp).name) };
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  //  animalMap,
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
