const data = require('./data');

function convertHourToAmPm(hour) {
  return hour > 12 ? `${hour - 12}pm` : `${hour}am`;
}

function formatMessageOpenClose(openHour, closedHour) {
  if (openHour === 0 && closedHour === 0) return 'CLOSED';

  const open = convertHourToAmPm(openHour);
  const close = convertHourToAmPm(closedHour);
  return `Open from ${open} until ${close}`;
}

function getAllEmployees() {
  return data.employees;
}

function getEmployeeById(id) {
  return data.employees.find((employee) => employee.id === id);
}

function getEmployee(idOrFirstOrLastName) {
  const idNameExists = data.employees.some((employee) => employee.id === idOrFirstOrLastName);
  const firstNameExists = data.employees
    .some((employee) => employee.firstName === idOrFirstOrLastName);
  const lastNameExists = data.employees
    .some((employee) => employee.lastName === idOrFirstOrLastName);

  if (idNameExists) {
    return data.employees.find((employee) => employee.id === idOrFirstOrLastName);
  }
  if (firstNameExists) {
    return data.employees.find((employee) => employee.firstName === idOrFirstOrLastName);
  }
  if (lastNameExists) {
    return data.employees.find((employee) => employee.lastName === idOrFirstOrLastName);
  }
  return {};
}

function employeeExists(idOrName) {
  return data.employees
    .some((employee) => employee.id === idOrName
      || employee.firstName === idOrName
      || employee.lastName === idOrName);
}

function getAnimalById(id) {
  return data.animals.find((animal) => animal.id === id);
}

function getAnimalsByEmployeeId(employeeId) {
  return getEmployeeById(employeeId).responsibleFor;
}

function getResidentsNameByAnimal(animal, sort = false) {
  return sort ? animal.residents.map((resident) => resident.name).sort()
    : animal.residents.map((resident) => resident.name);
}

function filterResidentsNameBySex(animal, sex, sort) {
  return sort ? animal.residents
    .filter((resident) => resident.sex === sex).map((a) => a.name).sort()
    : animal.residents
      .filter((resident) => resident.sex === sex).map((a) => a.name);
}

function getAllAnimalsNameByEmployee(id) {
  const animalsNames = [];
  getEmployeeById(id)
    .responsibleFor
    .forEach((animalId) => {
      animalsNames.push(getAnimalById(animalId).name);
    });
  return animalsNames;
}

function getAllAnimalsNameOrderLocation(locations = ['NE', 'NW', 'SE', 'SW']) {
  const animalsObj = {};
  locations.forEach((location) => {
    const animals = data.animals.filter((animal) => animal.location === location);
    animalsObj[location] = [];
    animals.forEach((animal) => {
      animalsObj[location].push(animal.name);
    });
  });
  return animalsObj;
}

function getAllAnimalsItemsNamesOrderLocation(sort, locations = ['NE', 'NW', 'SE', 'SW']) {
  const animalsObj = {};
  locations.forEach((location) => {
    const animals = data.animals.filter((animal) => animal.location === location);
    animalsObj[location] = [];
    animals.forEach((animal) => {
      const animalObj = {};
      animalObj[animal.name] = getResidentsNameByAnimal(animal, sort);
      animalsObj[location].push(animalObj);
    });
  });
  return animalsObj;
}

function getAnimalsItemsNameBySex(sex, sort = false, locations = ['NE', 'NW', 'SE', 'SW']) {
  const animalsObj = {};
  locations.forEach((location) => {
    const animals = data.animals.filter((animal) => animal.location === location);
    animalsObj[location] = [];
    animals.forEach((animal) => {
      const animalObj = {};
      animalObj[animal.name] = filterResidentsNameBySex(animal, sex, sort);
      animalsObj[location].push(animalObj);
    });
  });
  return animalsObj;
}

function animalsByIds(...ids) {
  const animals = [];
  ids.forEach((id) => {
    animals.push(data.animals.find((animal) => animal.id === id));
  });
  return animals;
}

function animalsOlderThan(species, age) {
  const { residents } = data.animals.find((animal) => species === animal.name);
  return residents.every((animal) => animal.age > age);
}

function employeeByName(employeeName) {
  const employeeResult = data.employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return employeeResult !== undefined ? employeeResult : {};
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.find((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    const animals = {};
    data.animals
      .forEach((animal) => {
        animals[animal.name] = animal.residents.length;
      });
    return animals;
  }
  const { residents } = data.animals.find((animal) => animal.name === species);
  return residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length <= 0) return 0;
  const entrantsKeys = Object.keys(entrants);
  let totalValue = 0;
  entrantsKeys.forEach((entrantKey) => {
    totalValue += data.prices[entrantKey] * entrants[entrantKey];
  });
  return totalValue;
}

function animalMap(options = {}) {
  if (Object.keys(options).length <= 0) return getAllAnimalsNameOrderLocation();
  if (options.includeNames === true) {
    if (options.sex !== undefined) return getAnimalsItemsNameBySex(options.sex, options.sorted);
    return getAllAnimalsItemsNamesOrderLocation(options.sorted);
  }
  if (options.sex !== undefined) return getAllAnimalsNameOrderLocation();
}

function schedule(dayName) {
  if (dayName === undefined) {
    const hourskeys = Object.keys(data.hours)
      .sort();
    const weekSchedule = {};
    hourskeys
      .forEach((day) => {
        weekSchedule[day] = formatMessageOpenClose(data.hours[day].open, data.hours[day].close);
      });
    return weekSchedule;
  }
  const day = {};
  day[dayName] = formatMessageOpenClose(data.hours[dayName].open, data.hours[dayName].close);
  return day;
}

function oldestFromFirstSpecies(id) {
  let animal = getAnimalsByEmployeeId(id)[0];
  animal = getAnimalById(animal);
  const residentOld = animal.residents.sort((a, b) => b.age - a.age)[0];
  return Object.values(residentOld);
}

function increasePrices(percentage) {
  return `${percentage}`;
}

function employeeCoverage(idOrName) {
  const employeesObj = {};
  if (idOrName === undefined) {
    getAllEmployees()
      .forEach((employee) => {
        const key = `${employee.firstName} ${employee.lastName}`;
        employeesObj[key] = getAllAnimalsNameByEmployee(employee.id);
      });
    return employeesObj;
  }
  if (employeeExists(idOrName)) {
    const employee = getEmployee(idOrName);
    const key = `${employee.firstName} ${employee.lastName}`;
    employeesObj[key] = getAllAnimalsNameByEmployee(employee.id);
    return employeesObj;
  }
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
