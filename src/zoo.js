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

const { animals } = data;

function animalsByIds(...ids) {
  const arr = animals.filter((item) => ids.includes(item.id));
  return arr;
}

function animalsOlderThan(animal, age) {
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

const arrLocations = [];
animals.forEach((animal) => arrLocations.push(animal.location));
const onlyNames = (arr) => {
  const returned = {};
  arr.forEach((location) => {
    const locatedAnimals = animals.filter((item) => item.location === location);
    const list = [];
    locatedAnimals.forEach((item) => list.push(item.name));
    returned[location] = list;
  });
  return returned;
};

const named = (arr) => {
  const returned = {};
  arr.forEach((location) => {
    returned[location] = [];
    const locatedAnimals = animals.filter((item) => item.location === location);
    locatedAnimals.forEach((item) => {
      const list = [];
      item.residents.forEach((resident) => list.push(resident.name));
      returned[location].push({ [item.name]: list });
    });
  });
  return returned;
};

const namedSort = (arr) => {
  const returned = {};
  arr.forEach((location) => {
    returned[location] = [];
    const locatedAnimals = animals.filter((item) => item.location === location);
    locatedAnimals.forEach((item) => {
      const list = [];
      item.residents.forEach((resident) => list.push(resident.name));
      returned[location].push({ [item.name]: list.sort() });
    });
  });
  return returned;
};
const listedMales = [];
const listedFemales = [];
animals.forEach((group) => group.residents.forEach((animal) => {
  if (animal.sex === 'male') listedMales.push(animal.name);
  else listedFemales.push(animal.name);
}));
console.log(listedFemales);
const isMaleSorted = (arr) => {
  const returned = {};
  arr.forEach((location) => {
    returned[location] = [];
    const locatedAnimals = animals.filter((item) => item.location === location);
    locatedAnimals.forEach((item) => {
      const list = [];
      item.residents.forEach((resident) => {
        if (listedMales.includes(resident.name)) list.push(resident.name);
      });
      returned[location].push({ [item.name]: list.sort() });
    });
  });
  return returned;
};

const isFemaleSorted = (arr) => {
  const returned = {};
  arr.forEach((location) => {
    returned[location] = [];
    const locatedAnimals = animals.filter((item) => item.location === location);
    locatedAnimals.forEach((item) => {
      const list = [];
      item.residents.forEach((resident) => {
        if (listedFemales.includes(resident.name)) list.push(resident.name);
      });
      returned[location].push({ [item.name]: list.sort() });
    });
  });
  return returned;
};

const isMale = (arr) => {
  const returned = {};
  arr.forEach((location) => {
    returned[location] = [];
    const locatedAnimals = animals.filter((item) => item.location === location);
    locatedAnimals.forEach((item) => {
      const list = [];
      item.residents.forEach((resident) => {
        if (listedMales.includes(resident.name)) list.push(resident.name);
      });
      returned[location].push({ [item.name]: list });
    });
  });
  return returned;
};

const isFemale = (arr) => {
  const returned = {};
  arr.forEach((location) => {
    returned[location] = [];
    const locatedAnimals = animals.filter((item) => item.location === location);
    locatedAnimals.forEach((item) => {
      const list = [];
      item.residents.forEach((resident) => {
        if (listedFemales.includes(resident.name)) list.push(resident.name);
      });
      returned[location].push({ [item.name]: list });
    });
  });
  return returned;
};

const chekSexSorted = (obj) => {
  if (obj === 'male') return isMaleSorted(arrLocations);
  if (obj === 'female') return isFemaleSorted(arrLocations);
  return namedSort(arrLocations);
};

const chekSexNoSorted = (obj) => {
  if (obj === 'female') return isFemale(arrLocations);
  if (obj === 'male') return isMale(arrLocations);
  return named(arrLocations);
};

const finaleX = ({ includeNames = true, sorted = false, sex = '' }) => {
  if (sorted) {
    return chekSexSorted(sex);
  }
  return chekSexNoSorted(sex);
};

function animalMap(obj) {
  if (obj === undefined || obj.includeNames === false || obj.includeNames === undefined) {
    return onlyNames(arrLocations);
  }
  return finaleX(obj);
}

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

function employeeCoverage(idOrName) {
  const { employees } = data;
  if (idOrName === undefined) {
    const allNAmes = employees.reduce((acm, item) => {
      const acumulator = { ...acm };
      const caredId = item.responsibleFor;
      const list = [];
      caredId.forEach((id) => list.push(animals.find((subId) => subId.id === id).name));
      acumulator[`${item.firstName} ${item.lastName}`] = list;
      return acumulator;
    }, {});
    return allNAmes;
  }
  const employee = employees.find((personal) => Object.values(personal).includes(idOrName));
  const employeeIds = employee.responsibleFor;
  const listed = [];
  employeeIds.forEach((ids) => listed.push(animals.find((subId) => subId.id === ids).name));
  return { [`${employee.firstName} ${employee.lastName}`]: listed };
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
