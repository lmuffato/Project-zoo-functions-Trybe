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

  return animals.reduce((obj, animal) => {
    obj[animal.name] = animal.residents.length;
    return obj;
  }, {});
}

// function entryCalculator(entryPeople) {
//   if (entryPeople !== undefined) {
//     const { Adult = 0, Child = 0, Senior = 0 } = entryPeople;
//     const sum = Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
//     return sum;
//   } return 0;
// }

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
    for (let day in hours) {
      dayObj[day] = hoursOpen(hours[day]);
    }
  }
  return dayObj;
}
console.log(schedule());
// function oldestFromFirstSpecies(id) {
//   const animalManagedById = employees.find((employee) => employee.id === id).responsibleFor[0];
//   const animalArray = animals.filter((animal) => (animal.id === animalManagedById));
//   animalArray.forEach(())
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  // entryCalculator,
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
