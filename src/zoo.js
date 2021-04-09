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

const { animals, employees, hours, prices } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.some((id) => animal.id === id));
}

function animalsOlderThan(animalName, age) {
  const animalsFiltered = animals.find((animal) => animal.name === animalName).residents;
  return animalsFiltered.every((animal) => animal.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName !== undefined) {
    return employees
      .find((name) => name.firstName === employeeName || name.lastName === employeeName);
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const employeeById = employees.find((employee) => employee.id === id);
  return employees.some((employee) => employee.managers
    .includes(employeeById.name || employeeById.id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species !== undefined) {
    const animalsSpecies = animals.find((animal) => animal.name === species);
    return animalsSpecies.residents.length;
  }
  const animalsCount = {};
  animals.forEach((animal) => {
    animalsCount[animal.name] = animal.residents.length;
  });
  return animalsCount;
}

function entryCalculator(entryPeople) {
  if (entryPeople !== undefined) {
    const { Adult = 0, Child = 0, Senior = 0 } = entryPeople;
    // const { Adult = AdultPrice, Child = ChildPrice, Senior = SeniorPrice} = prices;
    // const sum = Adult * AdultPrice + Child * ChildPrice + Senior * SeniorPrice;
    const sum = Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
    return sum;
  } return 0;
}

// function animalMap(map) {
//   if (map === undefined) {
//     const sortedAnimals = animals.sort((a, b) => (a.location - b.location));
//     return sortedAnimals.map((animal) => {
//       const mapAnimalsByRegion = {};
//       mapAnimalsByRegion[animal.location] = animal.name;
//       return mapAnimalsByRegion;
//     });
//   }
//   const { includeNames = false, sex = 0, sorted = false } = map;
// if () {

// }
// }

const hoursOpen = ({ open, close }) => {
  if (open === 0 || close === 0) {
    return 'CLOSED';
  } return (`Open from ${open}am until ${close - 12}pm`);
};

function schedule(dayName) {
  const dayObj = {};
  if (dayName !== undefined) {
    dayObj[dayName] = hoursOpen(hours[dayName]);
  } else {
    const days = Object.keys(hours);
    days.forEach((day) => {
      dayObj[day] = hoursOpen(hours[day]);
    });
  }
  return dayObj;
}

// function oldestFromFirstSpecies(id) {
//   const animalManagedById = employees.find((employee) => employee.id === id).responsibleFor[0];
//   const animalArray = animals.filter((animal) => (animal.id === animalManagedById));
//   animalArray.forEach(())
// }

/* Arredondamento com duas casas:
https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary */

function increasePrices(percentage) {
  const age = Object.keys(prices);
  age.forEach((agePrice) => {
    prices[agePrice] = (Math.round((prices[agePrice] * (1 + percentage / 100)) * 100)) / 100;
  });
}

function employeeCoverage(idOrName) {
  const employeeCoveraged = {};
  if (idOrName !== undefined) {
    let animalsEmployee;
    const selectedEmployee = employees
      .find((employee) => (employee.id === idOrName
        || employee.firstName === idOrName || employee.lastName === idOrName));
    selectedEmployee.responsibleFor.forEach((animalSelected) => {
      animalsEmployee = animals
        .filter((animal) => animal.id === animalSelected)
        .map((animal) => animal.name);
    });
    const employeeFullName = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
    employeeCoveraged[employeeFullName] = animalsEmployee;
  }
  return employeeCoveraged;
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
  // oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
