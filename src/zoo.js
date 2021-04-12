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
const { employees } = require('./data');
const { animals } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');

function animalsByIds(...ids) {
  const animalID = ids.map((id) => {
    const animalSearch = animals.find((animal) => animal.id === id);
    return animalSearch;
  });
  return animalID;
}

function animalsOlderThan(animalName, age) {
  const especies = animals.find((animal) => animal.name === animalName);
  const especiesResidents = especies.residents;
  const especiesResidentsAge = especiesResidents.every((especie) => especie.age >= age);
  return especiesResidentsAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const searchEmployee = employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
  return searchEmployee;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
}

function isManager(id) {
  let boolCheckManager = false;
  employees.forEach((employee) => {
    const manager = employee.managers;
    const checkManager = manager.some((personID) => personID === id);
    if (checkManager === true) {
      boolCheckManager = true;
    }
  });
  return boolCheckManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const allAnimals = {};
    animals.forEach((animal) => {
      allAnimals[animal.name] = animal.residents.length;
    });
    return allAnimals;
  }
  const searchSpecies = animals.find((animal) => animal.name === species);
  return searchSpecies.residents.length;
}
function checkAndCalculate(arrayRealEntrants, entrants) {
  let totalPrice = 0;
  if (arrayRealEntrants.some((entrant) => entrant === entrants.Adult)) {
    totalPrice += entrants.Adult * prices.Adult;
  }
  if (arrayRealEntrants.some((entrant) => entrant === entrants.Child)) {
    totalPrice += entrants.Child * prices.Child;
  }
  if (arrayRealEntrants.some((entrant) => entrant === entrants.Senior)) {
    totalPrice += entrants.Senior * prices.Senior;
  }
  return totalPrice;
}

function entryCalculator(entrants) {
  let totalPrice = 0;
  if (entrants === undefined) {
    return totalPrice;
  }
  if (Object.keys(entrants).length === 0) {
    return totalPrice;
  }
  const arrayEntrants = Object.values(entrants);
  const arrayRealEntrants = arrayEntrants.filter((entrant) => entrant !== undefined);
  totalPrice += checkAndCalculate(arrayRealEntrants, entrants);
  return totalPrice;
}
function noParameterMap(locations) {
  const result = {};
  locations.forEach((location) => {
    const arrayAnimal = animals.filter((animal) => animal.location === location);
    const arrayAnimalLocation = [];
    arrayAnimal.forEach((animal) => arrayAnimalLocation.push(animal.name));
    result[location] = arrayAnimalLocation;
  });
  return result;
}
function sortedNames(op, array) {
  if (op.sorted === true) {
    array.sort();
  }
  return array;
}
function residentsSex(resident, op) {
  if (op.sex === undefined) {
    return true;
  }
  if (resident.sex === op.sex) {
    return true;
  }
  return false;
}
function filteredAnimal(filterAnimal, op, loc) {
  if (filterAnimal.location === loc) {
    const checkResidentsSex = filterAnimal.residents
      .filter((resident) => residentsSex(resident, op) === true);
    const residentsNames = checkResidentsSex.map((resident) => resident.name);
    const sortArray = sortedNames(op, residentsNames);
    return sortArray;
  }

  return 1;
}

function include(locations, includeNamesObj, options) {
  const newObj = {};
  locations.forEach((loc) => {
    Object.values(includeNamesObj).forEach((arrAnimal) => {
      const newArray = [];
      arrAnimal.forEach((animal) => {
        const filterAnimal = animals.find((animalObj) => animalObj.name === animal);
        if (filteredAnimal(filterAnimal, options, loc) !== 1) {
          const newObjAux = {};
          newObjAux[animal] = filteredAnimal(filterAnimal, options, loc);
          newArray.push(newObjAux);
          newObj[loc] = newArray;
        }
      });
    });
  });
  return newObj;
}
function option(choose) {
  let flag;
  if (choose === undefined) {
    flag = 0;
    return flag;
  }
  if (choose.includeNames === true) {
    flag = 1;
    return flag;
  }
  return 2;
}

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  const includeNamesObj = noParameterMap(locations);
  const flag = option(options);
  if (flag === 1) {
    return include(locations, includeNamesObj, options);
  }
  return noParameterMap(locations);
}
function writeMsg(dayHours) {
  if (dayHours.open === 0) {
    return 'CLOSED';
  }
  return `Open from ${dayHours.open}am until ${dayHours.close - 12}pm`;
}
function schedule(dayName) {
  const objMsg = {};
  const arrayDays = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
  if (dayName === undefined) {
    arrayDays.forEach((day) => {
      const dayHours = hours[day];
      objMsg[day] = writeMsg(dayHours);
    });
    return objMsg;
  }
  arrayDays.forEach((day) => {
    if (day === dayName) {
      const dayHours = hours[day];
      objMsg[day] = writeMsg(dayHours);
    }
  });
  return objMsg;
}
console.log(schedule('Monday'));
/* function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}
 */
module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
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
