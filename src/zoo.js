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

const { animals, employees, hours, prices } = data; // Ideia retirada do código do Murilo Gonçalves (Turma 10-A)

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter((animal) =>
    ids.some((id) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(({ name }) =>
    name === animal).residents.every((resident) =>
    resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  return employeeName === undefined ? {}
    : employees.find(({ firstName, lastName }) =>
      employeeName === firstName || employeeName === lastName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
  // seu código aqui
  const managerList = [];
  employees.forEach(({ managers }) => {
    if (managerList.every((manager) =>
      managers.every((managerTest) =>
        manager !== managerTest))) {
      managerList.push(...managers);
    }
  });

  return employees.some((employee) =>
    employee.id === id && (managerList.some((idTeste) => idTeste === employee.id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const finalObj = {};
    animals.forEach(({ name, residents }) => {
      finalObj[name] = residents.length;
    });

    return finalObj;
  }

  return animals.find((animal) =>
    species === animal.name).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined) return 0;

  return Object
    .keys(entrants)
    .reduce((totalPrice, keyPerson) =>
      totalPrice + entrants[keyPerson] * prices[keyPerson], 0);
}

// Requisito 9 - animalMap
const getLocations = () => {
  const locationsObj = {};
  animals.forEach(({ location }) => {
    if (!Object.keys(locationsObj).includes(location)) {
      locationsObj[location] = [];
    }
  });
  return locationsObj;
};

const getSpecies = (locationsObj) => {
  animals.forEach(({ name, location }) => {
    locationsObj[location].push(name);
  });
  return locationsObj;
};

const getNameResidents = ({ sex }, { residents }) => {
  if (sex !== undefined) {
    return residents.filter((resident) =>
      resident.sex === sex).map(({ name }) => name);
  }
  return residents.map(({ name }) => name);
};

function animalMap(options) {
  // seu código aqui
  const locations = getLocations();

  if (options === undefined || !options.includeNames) return getSpecies(locations);

  if (options.includeNames) {
    animals.forEach((animal) => {
      const nameResidents = getNameResidents(options, animal);
      if (options.sorted) {
        locations[animal.location].push({ [animal.name]: nameResidents.sort() });
      } else {
        locations[animal.location].push({ [animal.name]: nameResidents });
      }
    });

    return locations;
  }
}

const showInfo = (day, info) => {
  if (day === 'Monday') {
    info[day] = 'CLOSED';
  } else {
    info[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
  }
}

function schedule(dayName) {
  // seu código aqui
  const info = {};

  if (dayName === undefined) {
    Object.keys(hours).forEach((day) => {
      showInfo(day, info);
      /* if (day === 'Monday') {
        info[day] = 'CLOSED';
      } else {
        info[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
      } */
    });
  } else {
    showInfo(dayName, info);
  }


  /* } else if (dayName === 'Monday') {
    info[dayName] = 'CLOSED';
  } else {
    info[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  } */

  return info;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const firstAnimalId = employees.find((employee) =>
    employee.id === id).responsibleFor[0];

  const findOldest = animals.find(({ id: animalId }) =>
    animalId === firstAnimalId).residents.reduce((oldest, crr) =>
    oldest.age > crr.age ? oldest : crr);

  const { name, sex, age } = findOldest;

  return [name, sex, age];
}

// Requisito 12 - increasePrices
const roundValue = (price) => price = Math.round(price * 100) / 100; // Ideia retirada do código do Lucas Pedroso (Turma 10-A)
const calcNewPrices = (price, perc) => roundValue(price += price * perc * 0.01);

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(prices).forEach((priceKey) =>
    prices[priceKey] = calcNewPrices(prices[priceKey], percentage));
}

// Requisito 13 - employeeCoverage
const getAnimalName = (arrayAnimals) =>
  arrayAnimals.map((animalId) =>
    animals.find(({ id }) =>
      id === animalId).name);

const getEmployee = (info) =>
  employees.find(({ id, firstName, lastName }) =>
    info === firstName || info === lastName || info === id);

const buildObj = ({ firstName, lastName, responsibleFor }, list) => {
  list[`${firstName} ${lastName}`] = getAnimalName(responsibleFor);
  return list;
};

function employeeCoverage(idOrName) {
  // seu código aqui
  const listAnimals = {};

  if (idOrName === undefined) {
    employees.forEach((employee) => buildObj(employee, listAnimals));
    return listAnimals;
  }
  const employee = getEmployee(idOrName);
  return buildObj(employee, listAnimals);
}

console.log(employeeCoverage());

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
