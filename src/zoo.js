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

const { animals, employees, hours, prices } = data;

const animalsByIds = (...ids) => ids.map((id) => animals
  .find(({ id: idAnimal }) => idAnimal === id));

const animalsOlderThan = (animal, age) => animals
  .find((el) => el.name === animal).residents
  .every((res) => res.age >= age);

const employeeByName = (employeeName = false) => (employeeName
  ? employees.find((employee) => employee.firstName === employeeName
    || employee.lastName === employeeName)
  : {});

const createEmployee = ({ id, firstName, lastName } = {}, { managers, responsibleFor } = {}) => {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
  return employeeByName(firstName);
};

const isManager = (id) => employees.some((employee) => employee.managers.some((emp) => emp === id));

const addEmployee = (
  id, firstName, lastName, managers = [], responsibleFor = [],
) => employees.push({ id, firstName, lastName, managers, responsibleFor });

const animalCount = (species = false) => {
  const obj = {};
  if (species) {
    return animals.find((animal) => animal.name === species).residents
      .reduce((acc) => acc + 1, 0);
  }
  animals.forEach((animal) => {
    const qtdAnimals = animal.residents.reduce((acc) => acc + 1, 0);
    obj[animal.name] = qtdAnimals;
  });
  return obj;
};

const entryCalculator = (entrant = false) => {
  const { Adult = 0, Child = 0, Senior = 0 } = entrant;
  return !entrant || entrant === {}
    ? 0
    : (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
};

const withoutArgs = () => {
  let obj = {};
  const regions = animals.map((animal) => animal.location);
  regions.forEach((region) => {
    const listAnimals = animals
      .filter((animal) => animal.location === region).map((animal) => animal.name);
    obj = { ...obj, ...{ [region]: listAnimals } };
  });
  return obj;
};

const withName = () => {
  let obj = {};
  const locations = animals.reduce((acc, cur) => (acc.includes(cur.location)
    ? acc : acc.concat(cur.location)), []);
  locations.forEach((location) => {
    const content = animals.filter(({ location: loc }) => loc === location)
      .map((animal) => ({ [animal.name]: animal.residents
        .map((ind) => ind.name) }));
    obj = { ...obj, ...{ [location]: content } };
  });
  return obj;
};

const orderObjectByName = (myObj, includeNames = false, sorted) => {
  let objOrdened;
  if (includeNames && sorted) {
    Object.keys(myObj).forEach((region) => {
      myObj[region].forEach((animal) => {
        objOrdened = animal;
        Object.keys(animal).forEach((objKey) => {
          objOrdened[objKey] = objOrdened[objKey].sort();
        });
      });
    });
  }
};

const sexComplement = (myObj, region, sorted, sex) => {
  myObj[region].forEach((animal) => {
    const onlySex = animal;
    const nameAnimal = Object.keys(animal)[0];
    let selectOnlySex = animals.filter(({ name }) => name === nameAnimal)
      .map((an) => an.residents)[0]
      .filter((resident) => resident.sex === sex)
      .map((resident) => resident.name);
    selectOnlySex = sorted
      ? selectOnlySex.sort()
      : selectOnlySex;
    onlySex[nameAnimal] = selectOnlySex;
  });
};

const showSex = (myObj, includeNames = false, sex = false, sorted) => {
  if (sex && includeNames) {
    Object.keys(myObj).forEach((region) => {
      sexComplement(myObj, region, sorted, sex);
    });
  }
};

// Referência: Murilo Gonçalves -> Pull #108
// Estudei bastante o código do Murilo para resolver essa questão,
// conforme o link a seguir:
// https://github.com/tryber/sd-010-a-project-zoo-functions/pull/108/
const animalMap = (options = false) => {
  const includeNames = !!options.includeNames;
  const sorted = !!options.sorted;
  const sex = options.sex ? options.sex : null;
  let obj = {};

  if (includeNames) {
    obj = withName();
  } else {
    return withoutArgs();
  }
  orderObjectByName(obj, includeNames, sorted);
  showSex(obj, includeNames, sex, sorted);
  return obj;
};

const hourAmericanFormat = (hour) => (hour < 12 ? `${hour}am` : `${hour - 12}pm`);

const generateObjSchedule = (day, obj) => {
  const phrase1 = `Open from ${hourAmericanFormat(hours[day].open)}`;
  const phrase2 = ` until ${hourAmericanFormat(hours[day].close)}`;
  let fullPhrase = phrase1 + phrase2;
  if (hours[day].open === 0 && hours[day].close === 0) {
    fullPhrase = 'CLOSED';
  }
  return { ...obj, [day]: fullPhrase };
};

const scheduleWithoutArgs = () => {
  let obj = {};
  Object.keys(hours).forEach((day) => {
    obj = { ...obj, ...generateObjSchedule(day) };
  });
  return obj;
};

const scheduleWithArg = (dayname) => {
  let obj = {};
  obj = generateObjSchedule(dayname);
  return obj;
};

const schedule = (dayName = false) => (!dayName
  ? scheduleWithoutArgs() : scheduleWithArg(dayName));

const oldestFromFirstSpecies = (id = false) => {
  const idFunc = employees.find((employee) => employee.id === id).responsibleFor[0];
  return Object.values(animals.find((animal) => animal.id === idFunc).residents
    .sort((a, b) => b.age - a.age)[0]);
};

const increasePrices = (percentage) => {
  Object.keys(prices).forEach((categoryPrice) => {
    let newValue = parseFloat(prices[categoryPrice]);
    const add = newValue * (percentage / 100);
    newValue += add;
    prices[categoryPrice] = parseFloat(newValue.toFixed(0))
      + Math.ceil(((newValue - parseFloat(newValue.toFixed(0))) * 100)) / 100;
  });
};

const getAnimalsByIdEmployee = (id) => employees
  .find(({ id: idEmp }) => idEmp === id).responsibleFor
  .map((idAnimals) => animals
    .find((animal) => animal.id === idAnimals).name);

const getEmp = (idOrName) => employees
  .find(({ id, firstName, lastName }) => id === idOrName
    || firstName === idOrName || lastName === idOrName);

const employeeCoverage = (idOrName = false) => {
  if (!idOrName) {
    let obj = {};
    const ids = employees.map(({ id }) => id);
    ids.forEach((actualId) => {
      const { firstName, lastName } = employees.find((employee) => employee.id === actualId);
      obj = { ...obj, ...{ [`${firstName} ${lastName}`]: getAnimalsByIdEmployee(actualId) } };
    });
    return obj;
  }

  let obj = {};
  const emp = getEmp(idOrName);
  obj = { ...obj, ...{ [`${emp.firstName} ${emp.lastName}`]: getAnimalsByIdEmployee(emp.id) } };
  return obj;
};

employeeCoverage();

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
