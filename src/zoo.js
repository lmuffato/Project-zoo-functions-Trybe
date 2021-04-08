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
  const { animals } = data;
  const arr = animals.filter((item) => ids.includes(item.id));
  return arr;
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  const arr = animals.find((item) => item.name === animal);
  return arr.residents.every((item) => item.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const { employees } = data;
  const obj = employees.find((item) => {
    const first = item.firstName;
    const second = item.lastName;
    return first === employeeName || second === employeeName;
  });
  return obj;
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
  const employee = data.employees.find((item) => item.id === id);
  return employee.managers.length <= 1;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species = undefined) {
  const { animals } = data;
  if (species === undefined) {
    // o codigo da função seguinte foi baseado em: https://github.com/eslint/eslint/issues/8581
    const obj = animals.reduce((acumulat, animal) => {
      const acumulator = { ...acumulat };
      acumulator[animal.name] = animal.residents.length;
      return acumulator;
    }, {});
    return obj;
  }
  const arr = animals.find((item) => item.name === species);
  return arr.residents.length;
}

function entryCalculator(visitors) {
  const { prices } = data;
  if (visitors === undefined) {
    return 0;
  }
  let sum = 0;
  const arr = Object.keys(visitors);
  arr.forEach((item) => {
    let price = (prices[item] * visitors[item]);
    price = Number(price.toPrecision(4));
    sum += price;
  });
  return sum;
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const { hours } = data;
  const convertor = { 18: 6, 20: 8, 22: 10 };
  const hoursKeys = Object.keys(hours);
  if (dayName === undefined) {
    const arr = hoursKeys.reduce((acu, item) => {
      const acumulator = { ...acu };
      acumulator[item] = `Open from ${hours[item].open}am until ${convertor[hours[item].close]}pm`;
      acumulator.Monday = 'CLOSED';
      return acumulator;
    }, {});
    return arr;
  }
  if (hours[dayName].close === 0 && hours[dayName].open === 0) {
    return { [dayName]: 'CLOSED' };
  }
  const day = hours[dayName];
  return { [dayName]: `Open from ${day.open}am until ${convertor[day.close]}pm` };
}

function oldestFromFirstSpecies(id) {
  const { employees } = data;
  const person = employees.find((item) => item.id === id);
  const { animals } = data;
  const cared = animals.find((item) => person.responsibleFor[0] === item.id);
  const { residents } = cared;
  const oldest = residents.reduce((acumulator, nextItem) => {
    let acumulatorX = acumulator;
    if (acumulatorX.age < nextItem.age) {
      acumulatorX = nextItem;
    }
    return acumulatorX;
  });
  const arr = [];
  arr.push(oldest.name);
  arr.push(oldest.sex);
  arr.push(oldest.age);
  return arr;
}

function increasePrices(percentage) {
  const Realpercent = percentage / 100;
  const { prices } = data;
  const { Adult } = prices;
  const { Senior } = prices;
  const { Child } = prices;
  const newAdult = Number((Adult + Number((Adult * Realpercent).toPrecision(4))).toPrecision(4));
  // as equações seguintes foram baseadas em: https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8
  const newSenior = Math.round((Senior + (Senior * Realpercent)) * 100) / 100;
  const newChild = Math.round((Child + (Child * Realpercent)) * 100) / 100;
  prices.Adult = newAdult;
  prices.Child = newChild;
  prices.Senior = newSenior;
}

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
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
