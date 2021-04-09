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
  const arraySaida = [];
  for (let index = 0; index < ids.length; index += 1) {
    arraySaida.push(animals.filter((animal) => animal.id === ids[index]));
  }
  return arraySaida.flat();
}

const animalsOlderThan = (animalName, age) => (
  animals.find((animal) => animal.name === animalName).residents.every((indie) => indie.age > age)
);

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((employee) => (
    employee.firstName === employeeName || employee.lastName === employeeName
  ));
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
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
  let objSaida = {};
  animals.map((animal) => objSaida[animal.name] = animal.residents.length);
  if (!species) return objSaida;
  return objSaida[species];
}

function entryCalculator({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  return ((Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior));
}

// function animalMap({ includeNames, sorted, sex }) {
//   const ne = animals.filter((animal) => animal.location === 'NE');

//   const emptySets = { NE: ne.map((animal) => animal.name) };

//   const namesOn = { NE: [{ [animal.name]: animal.residents.map((resident) => resident.name) }] };
// }

function schedule(dayName) {
  const exit = {};
  const days = Object.keys(hours);
  days.forEach((dia, index) => {
    const closes = hours[dia].close - 12;
    const opens = hours[dia].open;
    if (index === 6) {
      exit[dia] = 'CLOSED';
    } else {
      exit[dia] = `Open from ${opens}am until ${closes}pm`;
    }
  });
  if (!dayName) return exit;
  return { [dayName]: exit[dayName] };
}

function oldestFromFirstSpecies(id) {
  const getAnimal = employees.find((employee) => employee.id === id).responsibleFor[0];
  const population = animals.find((animal) => animal.id === getAnimal).residents;
  const oldest = population.sort((animal1, animal2) => animal2.age - animal1.age);
  return Object.values(oldest[0]);
}

function increasePrices(percentage) {
  const added = (1 + (percentage / 100));
  const values = Object.values(prices);
  const keys = Object.keys(prices);
  values.forEach((value, index) => {
    const newPrice = parseFloat(value * added).toFixed(3);
    const integer = Math.floor(newPrice);
    const decimal = Math.ceil((newPrice - integer) * 100) / 100;
    prices[keys[index]] = integer + decimal;
  });
}

function employeeCoverage(idOrName) {
  const objSaida = {};
  employees.forEach((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    objSaida[fullName] = employee.responsibleFor.map((animalId) => (
      animals.find((animal) => animal.id === animalId).name
    ));
  });
  if (!idOrName) {
    return objSaida;
  }
  const findEmployee = employees.find((employee) => (
    employee.firstName === idOrName || employee.lastName === idOrName || employee.id === idOrName));
  const fullName = `${findEmployee.firstName} ${findEmployee.lastName}`;

  return { [fullName]: objSaida[fullName] };
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
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
