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

const findAnimalById = (animalId) => {
  const animal = data.animals.find((dataItem) => dataItem.id === animalId);

  return animal;
};

const findAnimalsById = (animalsIdArray) => {
  const animalsArray = [];

  animalsIdArray.forEach((animalId) => {
    const animal = findAnimalById(animalId);

    animalsArray.push(animal);
  });

  return animalsArray;
};

function animalsByIds(...ids) {
  const animalsIds = ids;

  if (animalsIds.length === 0) {
    return [];
  }

  if (animalsIds.length === 1) {
    const animals = [];
    const animal = findAnimalById(animalsIds[0]);
    animals.push(animal);
    return animals;
  }

  if (animalsIds.length > 1) {
    const animals = findAnimalsById(animalsIds);
    return animals;
  }
}

function animalsOlderThan(animal, age) {
  const specie = data.animals.find((dataItem) => dataItem.name === animal);

  const isMinimalAge = specie.residents.every((resident) => resident.age >= age);

  return isMinimalAge;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  const employee = data.employees.find((employeeItem) =>
    employeeItem.firstName === employeeName || employeeItem.lastName === employeeName);

  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  return {
    id, firstName, lastName, managers, responsibleFor,
  };
}

function isManager(id) {
  const manager = data.employees.find((employee) => employee.id === id);

  if (manager.managers.length < 2) {
    return true;
  }

  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = { id, firstName, lastName, managers, responsibleFor };

  data.employees.push(employee);
}

function animalCount(specieName) {
  let animalsSize = 0;

  if (!specieName) {
    const animals = {};
    data.animals.forEach((animal) => {
      animals[animal.name] = animal.residents.length;
    });

    return animals;
  }

  data.animals.forEach((animal) => {
    if (animal.name === specieName) {
      animalsSize = animal.residents.length;
    }
  });

  return animalsSize;
}

const getTotalValue = (totalAdults = 0, totalChilds = 0, totalSenior = 0) => {
  const adultPrize = data.prices.Adult;
  const childsPrize = data.prices.Child;
  const seniorPrize = data.prices.Senior;

  let total = (totalAdults * adultPrize);
  total += (totalChilds * childsPrize);
  total += (totalSenior * seniorPrize);

  return total;
};

function entryCalculator(entrants) {
  if (!entrants) return 0;

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  const totalValue = getTotalValue(Adult, Child, Senior);

  return totalValue;
}

// Options
function animalMap() {

}

const formatHour = (hour) => hour - 12;

const getHourOfDay = (hour) => {
  const openHour = data.hours[hour].open;
  const closeHour = data.hours[hour].close;

  if (!openHour || !closeHour) return 'CLOSED';

  return `Open from ${openHour}am until ${formatHour(closeHour)}pm`;
};

function schedule(day) {
  if (!day) {
    const scheduleHour = {};
    const scheduleArray = Object.keys(data.hours);

    scheduleArray.forEach(((hour) => {
      scheduleHour[hour] = getHourOfDay(hour);
    }));

    return scheduleHour;
  }

  const daySchedule = {};

  daySchedule[day] = getHourOfDay(day);

  return daySchedule;
}

// id
function oldestFromFirstSpecies(id) {
  const employee = data.employees.find((employeeItem) => employeeItem.id === id);

  const animalSpecie = employee.responsibleFor[0];

  const animals = data.animals.find((animal) => animal.id === animalSpecie);

  const animal = animals.residents.reduce((acc, current) => {
    if (current.age > acc.age) {
      return current;
    }

    return acc;
  });

  const { name, sex, age } = animal;

  return [name, sex, age];
}

// Arredondamento usando como base o código do Renzo Sevilha
// https://github.com/tryber/sd-010-a-project-zoo-functions/pull/12/files
function increasePrices(percentage) {
  const { Adult, Child, Senior } = data.prices;

  const adultPrize = (Math.round(Adult * percentage) + Adult * 100) / 100;
  const childPrize = (Math.round(Child * percentage) + Child * 100) / 100;
  const seniorPrize = (Math.round(Senior * percentage) + Senior * 100) / 100;

  data.prices.Adult = adultPrize;
  data.prices.Child = childPrize;
  data.prices.Senior = seniorPrize;
}

const getEmployeeCoverageList = () => {
  const employees = data.employees.map((employee) => ({
    name: `${employee.firstName} ${employee.lastName}`,
    responsibleFor: employee.responsibleFor,
  }));

  const list = {};

  employees.forEach((employee) => {
    const animals = findAnimalsById(employee.responsibleFor);

    const animalsNames = animals.map((animal) => animal.name);

    list[employee.name] = animalsNames;
  });

  return list;
};

const findEmployeeByIdOrName = (idOrName) => {
  const employee = data.employees.find((employeeItem) => {
    if (employeeItem.id === idOrName) return employeeItem;
    if (employeeItem.firstName === idOrName) return employeeItem;
    if (employeeItem.lastName === idOrName) return employeeItem;

    return false;
  });

  return employee;
};

function employeeCoverage(idOrName) {
  if (!idOrName) {
    const employeeCoverageList = getEmployeeCoverageList();

    return employeeCoverageList;
  }

  const employee = findEmployeeByIdOrName(idOrName);
  const { firstName, lastName, responsibleFor } = employee;
  const name = `${firstName} ${lastName}`;
  const animals = findAnimalsById(responsibleFor).map((animal) => animal.name);
  const employeeCoverageObj = {};
  employeeCoverageObj[name] = animals;
  return employeeCoverageObj;
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
