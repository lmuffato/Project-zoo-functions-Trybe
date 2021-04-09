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

const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.some((id) => id === animal.id));
}

function animalsOlderThan(animal, age) {
  const selectedAnimals = animals.find((resident) => resident.name === animal).residents;
  return selectedAnimals.every((name) => name.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((employee) => employeeName === employee.firstName
    || employeeName === employee.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  let result = false;
  employees.forEach((employee) => {
    employee.managers.forEach((manager) => {
      if (manager === id) {
        result = true;
      }
    });
  });
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let result = {};
  if (species === undefined) {
    animals.forEach((animal) => {
      const { name } = animal;
      result[name] = animal.residents.length;
    });
  } else {
    result = animals.find((animal) => animal.name === species).residents.length;
  }
  return result;
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const totalAdult = Adult * prices.Adult;
  const totalChild = Child * prices.Child;
  const totalSenior = Senior * prices.Senior;
  return totalAdult + totalChild + totalSenior;
}

// const getLocationsKeys = () => {
//   const object = {};
//   animals.forEach((animal) => {
//     const { location } = animal;
//     object.
//   });
//   return object;
// }

// function animalMap(options) {
//   const result = {};
//   const animalNames = [];
//   const keys = getLocationsKeys();
//   console.log(getLocationsKeys());
//   // console.log(keys);
//   // const keys = Object.keys(result);
//   // console.log(keys);
//   if (options === undefined) {
//     // result[location] = animal.name;
//   }
//   return result;
// }
// console.log(animalMap());

const getScheduleDay = (day) => {
  const openTime = hours[day].open;
  const closingTime = hours[day].close;
  if (openTime === 0 && closingTime === 0) return 'CLOSED';
  return `Open from ${openTime}am until ${closingTime - 12}pm`;
};

function schedule(dayName) {
  const result = {};
  const days = Object.keys(hours);
  if (dayName === undefined) {
    days.forEach((day) => {
      result[day] = getScheduleDay(day);
    });
  } else {
    result[dayName] = getScheduleDay(dayName);
  }
  return result;
}
function oldestFromFirstSpecies(id) {
  const firstSpecie = employees.find((employee) => employee.id === id).responsibleFor[0];
  const resident = animals.find((animal) => animal.id === firstSpecie)
    .residents
    .sort((a, b) => (b.age) - (a.age))[0];
  const { name, sex, age } = resident;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const increase = (percentage / 100) + 1;
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    const number = prices[key] * increase;
    const result = Math.round(number * 100) / 100;
    prices[key] = result;
  });
  return prices;
}

function getAnimals(array) {
  return array.map((animalId) => animals.find((animal) => animal.id === animalId).name);
}

function employeeCoverage(idOrName) {
  const result = {};
  if (idOrName !== undefined) {
    const person = employees.find((employee) => idOrName === employee.id
      || idOrName === employee.firstName
      || idOrName === employee.lastName);
    const fullName = `${person.firstName} ${person.lastName}`;
    const animalsResponsible = person.responsibleFor;
    const animalsNames = getAnimals(animalsResponsible);
    result[fullName] = animalsNames;
  } else {
    employees.map((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      const animalsResponsible = employee.responsibleFor;
      const animalsNames = getAnimals(animalsResponsible);
      result[fullName] = animalsNames;
    });
  }
  return result;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
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
