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

function getAllAnimalsNameByEmployee(id) {
  const animalsNames = [];
  getEmployeeById(id)
    .responsibleFor
    .forEach((animalId) => {
      animalsNames.push(getAnimalById(animalId).name);
    });
  return animalsNames;
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

function animalMap(options) {
  return `${options}`;
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
  return `${id}`;
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
