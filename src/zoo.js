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

const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  const filteredById = animals.filter((animal, index) => (animal.id === ids[index]));
  return filteredById;
}

function animalsOlderThan(animal, age) {
  // Esta função, a partir do nome de uma espécie e uma idade mínima, verifica se todos os animais daquela espécie possuem a idade mínima especificada
  const selectedAnimal = animals.find((eachAnimal) => eachAnimal.name === animal);
  const checkAges = selectedAnimal.residents.every((resident) => (resident.age >= age));
  return checkAges;
}

function employeeByName(employeeName) {
  // Sem parâmetros, retorna um objeto vazio
  // Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  // Quando provido o último nome do funcionário, retorna o objeto do funcionário
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((employee) => (
    (employee.firstName === employeeName || employee.lastName === employeeName)));
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const param = (prev, curr) => {
      const fix = prev;
      fix[curr.name] = curr.residents.length;
      return fix;
    };
    return animals.reduce(param, {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
}
// const allSpecies = animals.map((animal) => `${animal.name}: ${animal.residents.length}`);
// console.log(animals.reduce((prev, curr) => { prev[curr.name] = curr.residents.length; return prev;}, {}));

function entryCalculator({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  // A partir da quantidade de visitantes e a faixa etária de cada um, esta função é responsável por retornar o preço total a ser cobrado
  // Observações técnicas
  // O parâmetro entrants recebe um objeto que contém as chaves Adult, Child e Senior, com suas respectivas quantidades de pessoas
  // O que será avaliado
  // Retorna 0 se nenhum argumento for passado
  // Retorna 0 se um objeto vazio for passado
  // Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
  return Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
}

const animalsByLocation = (locations) => {
  const result = {};
  locations.forEach((location) => {
    const filterResult = animals.filter((animal) => animal.location === location)
      .map((animal) => animal.name);
    result[location] = filterResult;
  });
  return result;
};

const filteredWithParams = (locations, sorted, sex) => {
  const result = {};
  locations.forEach((location) => {
    const filterResult = animals.filter((animal) => animal.location === location).map((animal) => {
      let resultKey;
      let resultValue;
      if (sex) {
        resultKey = animal.name;
        resultValue = animal.residents
          .filter((resident) => resident.sex === sex).map((resident) => resident.name);
      } else {
        resultKey = animal.name;
        resultValue = animal.residents.map((resident) => resident.name);
      } if (sorted === true) {
        return { [resultKey]: resultValue.sort() };
      } return { [resultKey]: resultValue };
    });
    result[location] = filterResult;
  }); return result;
};

const firstStep = (options) => {
  if (options && options.sorted) {
    const { sorted } = options;
    return sorted;
  }
  if (options && options.sex) {
    const { sex } = options;
    return sex;
  }
};

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  firstStep(options);
  if (options && options.includeNames === true) {
    const { sex } = options;
    const { sorted } = options;
    return filteredWithParams(locations, sorted, sex);
  }
  return animalsByLocation(locations);
}

function schedule(dayName) {
  const opSchedule = {};
  const weekDays = Object.values(hours);
  weekDays.forEach((day, index) => {
    const opTime = Object.keys(hours)[index];
    const hour = weekDays[index];
    Object.assign(opSchedule, { [opTime]: `Open from ${hour.open}am until ${hour.close - 12}pm` });
  });
  Object.assign(opSchedule, { Monday: 'CLOSED' });
  return (dayName !== undefined ? { [dayName]: opSchedule[dayName] } : opSchedule);
}
// console.log(schedule('Monday'));
// console.log(schedule('Tuesday'));
// console.log(schedule());
// console.log(schedule('asdasd'));

function oldestFromFirstSpecies(id) {
  const animalID = employees.find((employee) => employee.id === id).responsibleFor[0];
  const oldest = animals.find((animal) => animal.id === (animalID)).residents
  // source: https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    .sort((a, b) => b.age - a.age)[0];
  const { name, sex, age } = oldest;
  return [name, sex, age];
}

function increasePrices(percentage) {
  // https://trybecourse.slack.com/archives/C01L16B9XC7/p1618318862014000 ajustando a precisão
  Object.keys(prices).forEach((ageRange) => {
    prices[ageRange] = (Math.round(prices[ageRange] * (1 + (percentage / 100)) * 100) / 100);
  });
}

function employeeCoverage(idOrName) {
  if (!idOrName) {
    const employeeAnimals = {};
    const responsibleEmployeeAnimal = employees.map((employee) => employee.responsibleFor
      .map((animalID) => animals.find((animal) => animalID === animal.id).name));
    employees.forEach(({ firstName, lastName }, index) => {
      const fullName = `${firstName} ${lastName}`;
      employeeAnimals[fullName] = responsibleEmployeeAnimal[index];
    });
    return employeeAnimals;
  }
  const { firstName, lastName, responsibleFor } = employees
    .find((employee) => employee.id === idOrName || employee.firstName === idOrName
    || employee.lastName === idOrName);

  return { [`${firstName} ${lastName}`]: responsibleFor
    .map((animalId) => animals
      .find((animal) => animal.id === animalId).name) };
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
