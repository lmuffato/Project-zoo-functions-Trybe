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

// const { animals, employees } = data;

function animalsByIds(...ids) {
  if (typeof (ids) === 'undefined') {
    const array = [];
    return array;
  }
  const animais = animals.filter((animal) => ids.includes(animal.id));
  return animais;
}

function animalsOlderThan(animal, agen) {
  // seu código aqui
  return animals.find((anim) => anim.name === animal).residents.every(({ age }) => age > agen);
}

function employeeByName(employeeName) {
  // seu código aqui
  const obj = {};
  if (employeeName === 'undefined') {
    return obj;
  }

  return data.employees.find((name) => 
    name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {...personalInfo, ...associatedWith};
}

function isManager(id) {
  
  return data.employees.find((people) => people.id === id).managers.length <= 1;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
  
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const obj = animals.reduce((acc, animal) => {
      const result = { ...acc };
      result[animal.name] = animal.residents.length;
      return result;
    }, {});
    return obj;
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined) return 0;
  const { Adult, Senior, Child } = data.prices;
  const { Adult: qnt1 = 0 } = entrants;
  const { Senior: qnt2 = 0 } = entrants;
  const { Child: qnt3 = 0 } = entrants;
  return Adult * qnt1 + Senior * qnt2 + Child * qnt3;
}
/*
function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const arrayDays = Object.keys(hours);
  const openHours = Object.values(hours);
  const scheduleObj = {};
  arrayDays.forEach((hour, i) => {
    scheduleObj[hour] = `Open from ${openHours[i].open}am until ${(openHours[i].close) - 12}pm`;
  });
  scheduleObj.Monday = 'CLOSED';
  if (!dayName) {
    return scheduleObj;
  } if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  const asArray = Object.entries(scheduleObj);
  const withDayName = asArray.filter(([key]) => key === dayName);
  const objFiltered = Object.fromEntries(withDayName);
  return objFiltered;
} */

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const buscaFuncionario = employees.find((employee) => employee.id === id).responsibleFor[0];
  const buscaAnimal = animals.find((animal) => animal.id === buscaFuncionario).residents;
  const resultado = buscaAnimal.sort((a, b) => b.age - a.age)[0];
  return [resultado.name, resultado.sex, resultado.age];
}

/*
function increasePrices(percentage) {
  // seu código aqui
  const percent = (1 + (percentage / 100));
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    prices[key] = (Math.round(prices[key] * percent * 100) / 100);
  });
}

function employeeCoverage(idOrName) {
  // seu código aqui
}
*/
module.exports = {
  animalsByIds,
  animalsOlderThan,
  employeeByName,
  createEmployee, 
  isManager,
  addEmployee,
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  // employeeCoverage,
  oldestFromFirstSpecies,
  // increasePrices,
  
};
