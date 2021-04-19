/* eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
] */

const data = require('./data');

function animalsByIds(...ids) {
  const { animals } = data;
  if (ids.length !== 0) {
    return ids.map((animalById) => animals.find((animal) => animal.id === animalById));
  }
  return ids;
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  const old = animals.find((animal2) => (animal2.name === animal)).residents;
  const trueOrFalse = old.filter((ages) => (ages.age <= age));
  if (trueOrFalse.length > 0) {
    return false;
  }
  return true;
}

function employeeByName(employeeName) {
  const { employees } = data;
  if (employeeName === undefined) {
    return {};
  }
  const thereIs = employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return thereIs;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  const { employees } = data;
  const trueOrFalse = employees.find((element) =>
    element.managers.find((ids) => ids === id));
  if (trueOrFalse !== undefined) {
    return true;
  }
  return false;
}

function addEmployee(id1, firstName1, lastName1, managers1, responsibleFor1) {
  const firstPart = { id: id1, firstName: firstName1, lastName: lastName1 };
  const secPart = { managers: managers1, responsibleFor: responsibleFor1 };
  if (managers1 === undefined) {
    const man = [];
    secPart.managers = man;
  }
  if (responsibleFor1 === undefined) {
    const res = [];
    secPart.responsibleFor = res;
  }
  const newEmployee = createEmployee(firstPart, secPart);
  const { employees } = data;
  employees.push(newEmployee);
  return employees;
}

function animalCount(species) {
  const { animals } = data;
  const toLower = species;
  if (toLower === undefined) {
    const animal = {};
    Object.keys(animals).forEach((key) => {
      const { residents } = animals[key];
      const newKey = animals.map((value) => value.name)[key];
      animal[newKey] = Object.entries(residents).length;
    });
    return animal;
  }
  const res = animals.find((acc) => (acc.name === toLower ? acc : 0)).residents;
  return Object.entries(res).length;
}

function entryCalculator(entrants) {
  const { prices } = data;
  if (entrants === undefined) {
    return 0;
  }
  const sumValues = Object.entries(entrants).reduce((acc, [key, value]) =>
    acc + (prices[key] * value), 0);
  return sumValues;
}

function animalMap(options) {
  return options;
}

function scheduleSupport() {
  const { hours } = data;
  const closed = 'CLOSED';
  Object.keys(hours).forEach((day) => {
    const { open, close } = hours[day];
    hours[day] = `Open from ${open}am until ${close - 12}pm`;
    if (open === 0 && close === 0) {
      hours[day] = closed;
    }
  });
  return hours;
}
function schedule(dayName) {
  const { hours } = data;
  const closed = 'CLOSED';
  if (dayName === undefined) {
    return scheduleSupport();
  }
  if (dayName === 'Monday') {
    return { [dayName]: closed };
  }
  const aboutDay = Object.entries(hours).filter(([day]) => day === dayName)[0];
  console.log(aboutDay);
  const an = { [aboutDay[0]]: `Open from ${aboutDay[1].open}am until ${aboutDay[1].close - 12}pm` };
  return an;
}

function oldestFromFirstSpecies(id) {
  const { animals } = data;
  const { employees } = data;
  const responsables = employees.find((resp) => (resp.id === id ? resp.responsibleFor : undefined))
    .responsibleFor[0];
  const selected = animals.find((sel) => sel.id === responsables).residents;
  const oldiest = selected.reduce((old, acc) => (acc.age > old.age ? acc : old));
  return Object.values(oldiest);
}

function increasePrices(percentage) {
  const { prices } = data;
  const index = (parseFloat(percentage) / 100) + 1;
  let newPrice = 0;
  Object.keys(prices).forEach((i) => {
    newPrice = Math.ceil((prices[i] * index) * 100) / 100;
    prices[i] = newPrice;
  });
  return prices;
}

function employeeCoverage(idOrName) {
  const { employees } = data;
  const { animals } = data;
  const obj = {};
  if (idOrName === undefined || idOrName === '') {
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      const Name = `${firstName} ${lastName}`;
      const animal = responsibleFor.map((animalId) =>
        animals.find(({ id }) => animalId === id).name);
      obj[Name] = animal;
    });
    return obj;
  }
  const employeeObj = {};
  const names = employees.find((r) =>
    (r.id === idOrName || r.firstName === idOrName || r.lastName === idOrName));
  const animalss = names.responsibleFor.map((value) => animals.find(({ id }) => value === id).name);
  employeeObj[`${names.firstName} ${names.lastName}`] = animalss;
  return employeeObj;
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
