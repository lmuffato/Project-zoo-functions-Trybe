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
// if (map !== undefined) {
//   const { includeNames = false, sex = 0, sorted = false } = map;
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

function oldestFromFirstSpecies(id) {
  const animalManagedById = employees.find((employee) => employee.id === id).responsibleFor[0];
  const animalArray = animals.find((animal) => (animal.id === animalManagedById)).residents;
  let oldest = animalArray[0];
  animalArray.forEach((animal) => {
    if (oldest.age < animal.age) {
      oldest = animal;
    }
  });
  return Object.values(oldest);
}
oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992');

function increasePrices(percentage) {
  const age = Object.keys(prices);
  age.forEach((agePrice) => {
    /* Arredondamento com duas casas:
  https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary */
    prices[agePrice] = (Math.round((prices[agePrice] * (1 + percentage / 100)) * 100)) / 100;
  });
}

const findAnimals = (employee) => {
  const animalArray = [];
  employee.responsibleFor.forEach((animalResponsible) => {
    animals.forEach((animal) => {
      if (animalResponsible === animal.id) {
        animalArray.push(animal.name);
      }
    });
  });
  return animalArray;
};

function employeeCoverage(idOrName) {
  const employeeCoverageAnimals = {};
  if (idOrName !== undefined) {
    const employeeSelected = employees
      .find((employee) => (employee.firstName === idOrName
        || employee.lastName === idOrName
        || employee.id === idOrName));
    const employeeSelectedName = `${employeeSelected.firstName} ${employeeSelected.lastName}`;
    employeeCoverageAnimals[employeeSelectedName] = findAnimals(employeeSelected);
    return employeeCoverageAnimals;
  }
  employees.forEach((employee) => {
    const employeeSelectedName = `${employee.firstName} ${employee.lastName}`;
    employeeCoverageAnimals[employeeSelectedName] = findAnimals(employee);
  });
  return employeeCoverageAnimals;
}
console.log(employeeCoverage());
// console.log(employeeCoverage('Emery'));
// const employeeCoveraged = {};
//   if (idOrName !== undefined) {
//     let animalsEmployee;
//     const selectedEmployee = employees
//       .find((employee) => (employee.id === idOrName
//         || employee.firstName === idOrName || employee.lastName === idOrName));
//     selectedEmployee.responsibleFor.forEach((animalSelected) => {
//       animalsEmployee = animals
//         .filter((animal) => animal.id === animalSelected)
//         .map((animal) => animal.name);
//     });
//     const employeeFullName = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
//     employeeCoveraged[employeeFullName] = animalsEmployee;
//     console.log(animalsEmployee);
//   }
//   return employeeCoveraged;

// Second Try

// const employeeAnimalsResponsible = () => {
//   const obj = {};
//   employees.forEach((employee) => {
//     const employeeAnimals = animals.filter((animal) => employee.responsibleFor
//       .includes(animal.id));
//     const animalsNames = [];
//     employeeAnimals.forEach((animal) => animalsNames.push(animal.name));
//     obj[`${employee.firstName} ${employee.lastName}`] = animalsNames;
//   });
//   return obj;
// };

// Employee Coverage

// const obj = {};
// if (idOrName !== undefined) {
//   const selectedEmployee = employees
//     .find((employee) => (employee.id === idOrName
//       || employee.firstName === idOrName
//       || employee.lastName === idOrName));
//   const name = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
//   const employeeAnimals = animals.filter((animal) => selectedEmployee.responsibleFor
//     .includes(animal.id));
//   const animalsNames = [];
//   console.log(employeeAnimals);
//   employeeAnimals.forEach((animal) => animalsNames.push(animal.name));
//   obj[name] = animalsNames;
//   return obj;
// }
// return employeeAnimalsResponsible();

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
