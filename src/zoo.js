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
  if (ids.length === 0) return [];

  return ids.map((id) => data.animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const animals = data.animals.find((findAnimal) => findAnimal.name === animal).residents;
  return animals.every((eachAnimal) => eachAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const empByFirstName = data.employees.find(((employee) => employee.firstName === employeeName));
  if (empByFirstName) return empByFirstName;
  const empByLastName = data.employees.find(((employee) => employee.lastName === employeeName));
  if (empByLastName) return empByLastName;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

// Refatoração para utilizar some inspirada no código do André Barroso,
// conforme apresentado no fechamento do dia 10 de abril de 2021.
function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    const allSpecies = {};
    data.animals.forEach((animal) => {
      allSpecies[animal.name] = animal.residents.length;
    });
    return allSpecies;
  }

  return data.animals.find((animal) => animal.name === species).residents.length;
}

function hasPeopleCalculation(people) {
  const { Adult, Child, Senior } = people;

  return (Adult ? (Adult * data.prices.Adult) : 0)
    + (Child ? (Child * data.prices.Child) : 0)
    + (Senior ? (Senior * data.prices.Senior) : 0);
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  if (Object.entries(entrants).length === 0) return 0;

  return hasPeopleCalculation(entrants);
}

function animalsByLocation(locations = ['NE', 'NW', 'SE', 'SW']) {
  const output = {};

  locations.forEach((location) => {
    output[location] = data.animals
      .filter((species) => species.location === location)
      .map((spec) => spec.name);
  });

  return output;
}

const findSpeciesByName = (speciesName) => data.animals
  .find(((species) => species.name === speciesName));

const filterResidentsBySex = (specObj, sex = undefined) => {
  if (sex === undefined) return specObj.residents.map((anim) => anim.name);
  return specObj.residents.filter((resident) => resident.sex === sex).map((anim) => anim.name);
};

function addAnimalsNames(regionsList, sorted, sex = undefined) {
  const output = {};
  const animalsEntries = Object.entries(regionsList);
  animalsEntries.forEach((entries) => {
    const [region, animals] = entries;
    animals.forEach((spec) => {
      const specObj = findSpeciesByName(spec);
      let residents = filterResidentsBySex(specObj, sex);
      if (sorted === true) residents = residents.sort();

      if (!output[region]) {
        output[region] = [];
        output[region].push({ [specObj.name]: residents });
      } else {
        output[region].push({ [specObj.name]: residents });
      }
    });
  });
  return output;
}

function animalsNamesByLocation(options) {
  if (options.sex && options.sorted) {
    return addAnimalsNames(animalsByLocation(), options.sorted, options.sex);
  }
  if (options.sorted) return addAnimalsNames(animalsByLocation(), options.sorted);
  if (options.sex) return addAnimalsNames(animalsByLocation(), false, options.sex);
  return addAnimalsNames(animalsByLocation());
}

function animalMap(options) {
  if (!options || options.includeNames !== true) return animalsByLocation();
  if (options.includeNames === true) return animalsNamesByLocation(options);
}

function fullSchedule() {
  const allDays = {};
  Object.keys(data.hours).forEach((weekDay) => {
    if (data.hours[weekDay].open === 0) {
      allDays[weekDay] = 'CLOSED';
    } else {
      const dayHours = data.hours[weekDay];
      allDays[weekDay] = `Open from ${dayHours.open}am until ${dayHours.close - 12}pm`;
    }
  });
  return allDays;
}

function schedule(dayName) {
  if (!dayName) return fullSchedule();

  const singleDayOutput = {};
  const dayHours = data.hours[dayName];
  if (dayHours.open === 0) {
    singleDayOutput[dayName] = 'CLOSED';
  } else {
    singleDayOutput[dayName] = `Open from ${dayHours.open}am until ${dayHours.close - 12}pm`;
  }
  return singleDayOutput;
}

function oldestAnimal(animals) {
  const biggestAge = animals.reduce((previousAnimalAge, currentAnimal) => {
    if (previousAnimalAge > currentAnimal.age) return previousAnimalAge;
    return currentAnimal.age;
  }, animals[0].age);

  const oldest = animals.find((resident) => resident.age === biggestAge);

  return oldest;
}

function oldestFromFirstSpecies(id) {
  const employeeAnimals = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const animalsFromSpecies = animalsByIds(employeeAnimals)[0].residents;

  return Object.values(oldestAnimal(animalsFromSpecies));
}

function increasePrices(percentage) {
  const realPercentage = 1 + percentage / 100;
  Object.keys(data.prices).forEach((price) => {
    data.prices[price] = +((data.prices[price] * realPercentage) + 0.005).toFixed(2);
  });
}

// Sem parâmetros, retorna uma lista de funcionários e os animais pelos quais eles são responsáveis
// Com o id de um funcionário, retorna os animais pelos quais o funcionário é responsável
// Com o primeiro nome de um funcionário, retorna os animais pelos quais o funcionário é responsável
// Com o último nome de um funcionário, retorna os animais pelos quais o funcionário é responsável
function employeeByNameOrID(employeeNameOrID) {
  const empByFirstName = data.employees.find(((emp) => emp.firstName === employeeNameOrID));
  if (empByFirstName) return empByFirstName;
  const empByLastName = data.employees.find(((emp) => emp.lastName === employeeNameOrID));
  if (empByLastName) return empByLastName;
  const empByID = data.employees.find(((emp) => emp.id === employeeNameOrID));
  if (empByID) return empByID;
}

function animalsByName(animalsByID) {
  return animalsByID.map((animal) =>
    data.animals.find((eachAnimal) => eachAnimal.id === animal).name);
}

function allEmployeesAnimals() {
  const allEmployees = {};
  data.employees.forEach((emp) => {
    allEmployees[`${emp.firstName} ${emp.lastName}`] = animalsByName(emp.responsibleFor);
  });

  return allEmployees;
}

function employeeCoverage(idOrName) {
  if (!idOrName) return allEmployeesAnimals();

  const singleEmployee = {};
  const emp = employeeByNameOrID(idOrName);
  singleEmployee[`${emp.firstName} ${emp.lastName}`] = animalsByName(emp.responsibleFor);
  return singleEmployee;
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
