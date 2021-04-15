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

const { animals, employees, hours } = data;

function animalsByIds(...ids) {
  const arr = [];
  const selectAnimals = ids.reduce((array, currentValue, index) => {
    const valueId = ids[index];
    const validade = animals.find((search) => search.id === valueId);
    arr.push(validade);
    return arr;
  }, []);
  return selectAnimals;
}

function animalsOlderThan(animal, age) {
  const check = animals.find((currentValue) => currentValue.name === animal);
  const testCheck = check.residents.every((value) => value.age >= age);
  return testCheck;
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') {
    return {};
  }
  if (data.employees.some((value) => value.firstName === employeeName)) {
    return employees.find((value) => value.firstName === employeeName);
  }
  if (data.employees.some((value) => value.lastName === employeeName)) {
    return employees.find((value) => value.lastName === employeeName);
  }
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const idResponsible = employees.find((current) => current.id === id);
  return idResponsible.managers[0] === '9e7d4524-363c-416a-8759-8aa7e50c0992';
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const objectAnimals = {};
  const noParameters = () => animals.reduce((acc, value) => {
    const arrAnimals = value.name;
    const arrNumbers = value.residents.length;
    objectAnimals[arrAnimals] = arrNumbers;
    return objectAnimals;
  }, {});
  const parameters = (nameAnimals) => {
    let numberAnimals = 0;
    animals.find((currentValue) => {
      if (currentValue.name === nameAnimals) {
        numberAnimals = currentValue.residents.length;
      }
      return numberAnimals;
    });
    return numberAnimals;
  };
  return typeof species === 'undefined' ? noParameters() : parameters(species);
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined' || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult: adult = 0, Child: child = 0, Senior: senior = 0 } = entrants;
  const finalPrice = ((adult * 49.99) + (senior * 24.99) + (child * 20.99));
  return finalPrice;
}

function callbackMapNoParameter(arrayKey) {
  const mapObject = {};
  arrayKey.forEach((firstValue) => {
    mapObject[firstValue] = [];
    animals.forEach((secondValue) => {
      if (secondValue.location === firstValue) {
        mapObject[firstValue].push(secondValue.name);
      }
    });
  });
  return mapObject;
}

function callbackMapSortSex(mapLocation, sorted, sex) {
  const temporaryArray = [];
  mapLocation.forEach((secondValue) => {
    const temporaryObject = {};
    const mapTemporary = animals.find(({ name }) => secondValue === name);
    let { residents: mapResidents } = mapTemporary;
    if (sex !== 'false') {
      mapResidents = mapResidents.filter((currentValue) => currentValue.sex === sex);
    }
    const residentNames = mapResidents.map((resident) => resident.name);
    if (sorted === true) {
      residentNames.sort();
    }
    temporaryObject[secondValue] = residentNames;
    temporaryArray.push(temporaryObject);
  });
  return temporaryArray;
}

function callbackMapIncludeNames(mapNames, sorted, sex) {
  const arrayKey = Object.keys(mapNames);
  const mapObject = {};
  arrayKey.forEach((firstValue) => {
    const mapLocation = Object.values(mapNames[firstValue]);
    const temporaryArray = callbackMapSortSex(mapLocation, sorted, sex);
    mapObject[firstValue] = temporaryArray;
  });
  return mapObject;
}

function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex = 'false' } = options;
  let newMapObject;
  newMapObject = callbackMapNoParameter(['NE', 'NW', 'SE', 'SW']);
  if (includeNames === true) {
    newMapObject = callbackMapIncludeNames(newMapObject, sorted, sex);
  }
  return newMapObject;
}

function schedule(dayName) {
  const objectHours = {};
  const daysHours = Object.entries(hours);
  daysHours.forEach((Value) => {
    if (Value[0] !== 'Monday') {
      objectHours[Value[0]] = `Open from ${Value[1].open}am until ${Value[1].close}pm`;
    } else {
      objectHours[Value[0]] = 'CLOSED';
    }
  });
  if (typeof dayName !== 'undefined') {
    const dayObject = {};
    dayObject[dayName] = objectHours[dayName];
    return dayObject;
  }
  return objectHours;
}

function oldestFromFirstSpecies(id) {
  const employeesId = employees.find((employee) => employee.id === id);
  const { responsibleFor } = employeesId;
  const objectAnimal = animals.find((animal) => animal.id === responsibleFor[0]);
  const { residents } = objectAnimal;
  const max = residents.map((value) => value.age);
  max.sort((a, b) => a - b);
  const select = objectAnimal.residents.find((resident) => resident.age === max[max.length - 1]);
  const animalReturn = Object.values(select);
  return animalReturn;
}

function increasePrices(percentage) {
  const pricesKeys = Object.keys(data.prices);
  pricesKeys.forEach((cur) => {
    const number = parseFloat((data.prices[cur] * ((100 + percentage) / 100)).toFixed(3));
    const modifiedNumber = Math.floor(number);
    const aux = Math.ceil((number - modifiedNumber) * 100) / 100;
    data.prices[cur] = modifiedNumber + aux;
  });
}

// function employeeCoverage(idOrName) {
// seu código aqui
// }

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
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
