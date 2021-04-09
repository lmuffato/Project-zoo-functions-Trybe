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
  const arr = [];
  ids.forEach((element) => {
    arr.push(data.animals.find((animal) => element === animal.id));
  });
  return arr;
}

function animalsOlderThan(animal, age) {
  const ageArr = [];
  const obj = data.animals.find((bicho) => bicho.name === animal);
  obj.residents.forEach((resident) => {
    ageArr.push(resident.age);
  });
  return ageArr.every((idade) => idade >= age);
}

function employeeByName(employeeName) {
  const obj = data.employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return (obj !== undefined ? obj : {});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const employe = data.employees.find((employee) => employee.id === id);
  return employe.managers.some((manager) => manager === '9e7d4524-363c-416a-8759-8aa7e50c0992');
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  const employee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(employee);
}

function animalCount(species) {
  const obj = {};
  data.animals.forEach((animal) => {
    Object.assign(obj, { [animal.name]: animal.residents.length });
  });
  return (species !== undefined ? obj[species] : obj);
}

function entryCalculator({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  const { Adult: priceAdult, Senior: priceSenior, Child: priceChild } = data.prices;
  const total = (Adult * priceAdult) + (Child * priceChild) + (Senior * priceSenior);
  return total;
}

const zooMap = () => ({
  NE: data.animals.filter((animal) => animal.location === 'NE').map((animal) => animal.name),
  NW: data.animals.filter((animal) => animal.location === 'NW').map((animal) => animal.name),
  SE: data.animals.filter((animal) => animal.location === 'SE').map((animal) => animal.name),
  SW: data.animals.filter((animal) => animal.location === 'SW').map((animal) => animal.name),
});

const getResidents = (name) => {
  const anim = data.animals.find((animal) => animal.name === name);
  return anim.residents.map((resident) => resident.name);
};

const onlyMale = (name) => {
  const anim = data.animals.find((animal) => animal.name === name);
  const end = [];
  anim.residents.forEach((resident) => {
    if (resident.sex === 'male') {
      end.push(resident.name);
    }
  });
  return end;
};

const onlyFemale = (name) => {
  const anim = data.animals.find((animal) => animal.name === name);
  const end = [];
  anim.residents.forEach((resident) => {
    if (resident.sex === 'female') {
      end.push(resident.name);
    }
  });
  return end;
};
const regular = (endObj, funcao) => {
  const key = Object.keys(endObj);
  const value = Object.values(endObj);
  const newValue = value.map((names) => names.map((name) => ({ [name]: [funcao(name)] })));
  const obj = {};
  for (let index = 0; index < key.length; index += 1) {
    const element = key[index];
    Object.assign(obj, { [element]: newValue[index] });
  }
  return obj;
};

const regularSort = (endObj, funcao) => {
  const key = Object.keys(endObj);
  const value = Object.values(endObj);
  const newValue = value.map((names) => names.map((name) => ({ [name]: [funcao(name).sort()] })));
  const obj = {};
  for (let index = 0; index < key.length; index += 1) {
    const element = key[index];
    Object.assign(obj, { [element]: newValue[index] });
  }
  return obj;
};

const namesTrueSortedUndefined = (endObj, sex) => {
  if (sex === undefined) {
    return regular(endObj, getResidents);
  } if (sex === 'male') {
    return regular(endObj, onlyMale);
  } if (sex === 'female') {
    return regular(endObj, onlyFemale);
  }
};

const namesTrue = (endObj, sex) => {
  if (sex === undefined) {
    return regularSort(endObj, getResidents);
  } if (sex === 'male') {
    return regularSort(endObj, onlyMale);
  } if (sex === 'female') {
    return regularSort(endObj, onlyFemale);
  }
};

const define = (endObj, sorted, sex) => {
  if (sorted === undefined) {
    return namesTrueSortedUndefined(endObj, sex);
  } if (sorted === true) {
    return namesTrue(endObj, sex);
  }
};

function animalMap(options) {
  const endObj = zooMap();
  if (options === undefined) {
    return endObj;
  } const { includeNames, sorted, sex } = options;
  if (includeNames === true) {
    return define(endObj, sorted, sex);
  }
  return endObj;
}

const hour = (value) => (value <= 12 ? `${value}am` : `${value - 12}pm`);

function schedule(dayName) {
  const obj = {};
  const keys = Object.keys(data.hours);
  const values = Object.values(data.hours);
  for (let index = 0; index < keys.length - 1; index += 1) {
    const day = keys[index];
    const hours = values[index];
    Object.assign(obj, { [day]: `Open from ${hour(hours.open)} until ${hour(hours.close)}` });
  }
  Object.assign(obj, { Monday: 'CLOSED' });
  return (dayName !== undefined ? { [dayName]: obj[dayName] } : obj);
}

function oldestFromFirstSpecies(id) {
  const employe = data.employees.find((employee) => employee.id === id);
  const anim = data.animals.find((animal) => animal.id === employe.responsibleFor[0]);
  const old = anim.residents.reduce((oldest, resident) =>
    (resident.age > oldest.age ? resident : oldest));
  return [old.name, old.sex, old.age];
}

function increasePrices(percentage) {
  const increase = (1 + (percentage / 100));
  const { Adult, Senior, Child } = data.prices;
  data.prices = {
    Adult: Math.round(100 * (Adult * increase)) / 100,
    Senior: Math.round(100 * (Senior * increase)) / 100,
    Child: Math.round(100 * (Child * increase)) / 100,
  };
}

const idToSpecie = (array) => {
  const arr = [];
  array.forEach((element) => {
    arr.push(data.animals.find((animal) => animal.id === element).name);
  });
  return arr;
};

const employeeAnimals = () => {
  const obj = {};
  data.employees.forEach((employee) => {
    Object.assign(obj, { [`${employee.firstName} ${employee.lastName}`]:
    idToSpecie(employee.responsibleFor) });
  });
  return obj;
};

const ifUndefined = (obj, idOrName) => {
  const employe = data.employees.find((employee) => employee.id === idOrName
  || employee.firstName === idOrName || employee.lastName === idOrName);
  const name = `${employe.firstName} ${employe.lastName}`;
  return { [name]: obj[name] };
};

function employeeCoverage(idOrName) {
  const obj = employeeAnimals();
  return (idOrName === undefined ? obj : ifUndefined(obj, idOrName));
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
