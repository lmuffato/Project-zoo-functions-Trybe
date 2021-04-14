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

function animalsByIds(...ids) {
  return ids.map((idParam) => data.animals.find((animal) => animal.id === idParam));
}

function animalsOlderThan(animal, age) {
  const animalObject = data.animals.find((el) => el.name === animal);
  return animalObject.residents.every((resident) => resident.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  let result = false;
  data.employees.forEach((employee) => {
    if (employee.managers.includes(id)) result = true;
  });
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  const animalCountObject = {};
  data.animals.forEach((animal) => {
    animalCountObject[animal.name] = animal.residents.length;
  });

  if (!species) return animalCountObject;
  return animalCountObject[species];
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  return Object.keys(entrants).reduce((accum, ageGroup) => {
    const newValue = data.prices[ageGroup] * entrants[ageGroup];
    return accum + newValue;
  }, 0);
}

// funcoes auxiliares para animalMap
const animalByName = (animalName) => data.animals.find((animal) => animal.name === animalName);

const speciesToResidentsNames = (animalName, sorted = false, sexFilter) => {
  let arrayOfResidents = animalByName(animalName).residents;
  if (sexFilter !== undefined) {
    arrayOfResidents = arrayOfResidents.filter((resident) => resident.sex === sexFilter);
  }
  if (sorted) return arrayOfResidents.map((resident) => resident.name).sort();
  return arrayOfResidents.map((resident) => resident.name);
};

const includeNames = (mapObject, sorted = false, sex) => {
  const regions = Object.keys(mapObject);
  // Comportamento para os parametro includeNames=true e sorted=true
  const mapObjectWithNames = {};
  regions.forEach((region) => {
    mapObjectWithNames[region] = mapObject[region].map((animal) => {
      const listOfIndividuals = speciesToResidentsNames(animal, sorted, sex);
      return { [animal]: listOfIndividuals };
    });
  });
  return mapObjectWithNames;
};

function animalMap(options) {
  const animalMapObject = data.animals.reduce((accum, animal) => {
    if (Object.keys(accum).includes(animal.location)) {
      accum[animal.location].push(animal.name);
    } else {
      Object.assign(accum, { [animal.location]: [animal.name] });
    }
    return accum;
  }, {});

  if (!options || !options.includeNames) return animalMapObject;
  return includeNames(animalMapObject, options.sorted, options.sex);
}

function schedule(dayName) {
  const scheduleObject = Object.keys(data.hours).reduce((accum, weekDay) => {
    const openTime = data.hours[weekDay].open;
    const closeTime = data.hours[weekDay].close - 12;
    const weekDayObject = { [weekDay]: `Open from ${openTime}am until ${closeTime}pm` };
    return Object.assign(accum, weekDayObject);
  }, {});

  scheduleObject.Monday = 'CLOSED';

  if (!dayName) return scheduleObject;
  return { [dayName]: scheduleObject[dayName] };
}

function oldestFromFirstSpecies(id) {
  const firstAnimalId = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const firstAnimalObject = animalsByIds(firstAnimalId)[0];
  const oldestAnimal = firstAnimalObject.residents.sort((a, b) => b.age - a.age)[0];

  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach((ageGroup) => {
    data.prices[ageGroup] *= (1 + percentage / 100);
    data.prices[ageGroup] = Math.round(data.prices[ageGroup] * 100) / 100;
  });
}

// Funcao para encontrar o objeto do funcionario a partir do id
const employeeById = (id) => data.employees.find((emp) => emp.id === id);

// funcao para encontrar o fullname do funcionario a partir de nome ou id
const getEmployeeFullName = (idOrNameParam) => {
  let employee;
  if (idOrNameParam.length === 36) {
    employee = employeeById(idOrNameParam);
  }

  if (idOrNameParam.length !== 36 && idOrNameParam !== undefined) {
    employee = employeeByName(idOrNameParam);
  }

  return `${employee.firstName} ${employee.lastName}`;
};

function employeeCoverage(idOrName) {
  const allEmployeesCoverage = data.employees.reduce((accum, emp) => {
    const animalNames = emp.responsibleFor.map((animalId) => animalsByIds(animalId)[0].name);
    const employeeCoverageObject = { [`${emp.firstName} ${emp.lastName}`]: animalNames };
    return Object.assign(accum, employeeCoverageObject);
  }, {});

  if (!idOrName) return allEmployeesCoverage;
  return { [getEmployeeFullName(idOrName)]: allEmployeesCoverage[getEmployeeFullName(idOrName)] };
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
