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

function animalsByIds(ids) {
  const animalsFilterId = data.animals.filter((animal) => {
    const filterId = animal.includes(animal.id);
    return filterId;
  });
  return animalsFilterId;
}

function animalsOlderThan(animal, age) {
  const getAnimals = data.animals.find((animalN) => {
    animalN.name === animal
  });

  const olderThan = getAnimals.residents.every((animalA) => {
    animalA.age >= age
  });
  return olderThan;

}

function employeeByName(employeeName) {
  // seu código aqui
  const employeeFind = data.employees.find((employee) => {
    const employeeFirstName = employee.firstName;
    const employeeLastName = employee.lastName;
    return employeeFirstName === employeeName || employeeLastName === employeeName;
  });
  return employeeFind;

}

function createEmployee(personalInfo, associatedWith) {
  const createFullEmployee = {
    ...personalInfo,
    ...associatedWith,
  };
  return createFullEmployee
}


function isManager(id) {
  const hasManager = data.employees.some((employee) => {
    const validate = employee.managers.includes(id);
    return validate;
  });
  return hasManager;

}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const manager = [managers];
  const responsable = [responsibleFor];
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: manager,
    responsibleFor: responsable,
  };
  return data.employees.push(newEmployee);
}


function animalCount(species) {
  const animalSpeciesEmpty = data.animals.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.residents.length;
    return accumulator;
  }, {});

  return animalSpeciesEmpty[species];
}

function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  const { Adult, Senior, Child } = prices;
  let total = 0;
  const arr = Object.entries(entrants);
  arr.forEach((element) => {
    if (element[0] === 'Adult') {
      total += Adult * element[1];
    }
    if (element[0] === 'Child') {
      total += Child * element[1];
    }
    if (element[0] === 'Senior') {
      total += Senior * element[1];
    }
  });
  return total;
}

// function animalMap(options) {
//  // skipar
// }

function schedule(dayName) {
  
  const dailyObj = {};
  Object.keys(data.hours).forEach((element) => {
    dailyObj[element] = `Open from ${hours[element].open}am until ${(hours[element].close) - 12}pm`;
  });
  dailyObj.Monday = 'CLOSED';
  
  if (dayName === undefined) {
    return dailyObj
  };

  return { 
    [dayName]: dailyObj[dayName]
  };

}

function oldestFromFirstSpecies(id) {
  // seu código aqui

  const animalId = employees.find(element => element.id === id).responsibleFor[0];
  const animalResidents = animals.find(element => element.id === animalId).residents;
  let oldestAnimal = animalResidents[0].age;
  
  animalResidents.forEach((element) => {
    if (element.age > oldestAnimal) {
      oldestAnimal = element;
    }
  });

  const { name, sex, age } = oldestAnimal;
  return [name, sex, age];

 }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

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
