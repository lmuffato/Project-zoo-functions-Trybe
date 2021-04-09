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

const { hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const { animals } = data;
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const especie = data.animals.find((bixo) => bixo.name === animal);
  return especie.residents.every((idade) => idade.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  /* 'Sem parâmetros, retorna um objeto vazio', */
  if (!employeeName) return {};
  /* 'Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário', */
  /* 'Quando provido o último nome do funcionário, retorna o objeto do funcionário' */
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

const createEmployee = (personalInfo,
  associatedWith) => ({ ...personalInfo, ...associatedWith });/* ;{
  // seu código aqui
  return (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });
  /* Cria um novo colaborador a partir de objetos contendo
  informações pessoais, gerentes e animais gerenciados */
/* const { id, firstName, lastName } = personalInfo;
const { managers, responsibleFor } = associatedWith;
const employee = {
  id,
  firstName,
  lastName,
  managers,
  responsibleFor,
};
return employee;
} */

function isManager(id) {
  // seu código aqui
  /* 'Testa se o id passado é de um gerente' */
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
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
  // seu código aqui
  if (species === undefined) {
    return data.animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  /* 'Retorna 0 se nenhum argumento for passado' */
  /* 'Retorna 0 se um objeto vazio for passado' */
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: guy, Senior: idoso, Child: crianca } = data.prices;
  /* Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos */
  return (guy * Adult) + (idoso * Senior) + (crianca * Child);
}
// recebi ajuda do murilo
const noOptions = () => {
  const locations = [...new Set((data.animals.map(({ location }) => location)))];
  const genericObj = locations.reduce((acc, location) => {
    acc[location] = [];
    return acc;
  }, {});
  const noParms = { ...genericObj };
  data.animals.forEach(({ name, location }) => noParms[location].push(name));
  return noParms;
};

function sexCondition(sex, hasIncludeNames, includeNames) {
  if (sex !== null && hasIncludeNames) {
    const keys = Object.keys(includeNames);
    keys.forEach((key) => {
      includeNames[key].forEach((obj) => {
        const obj1 = obj;
        const animalKey = Object.keys(obj)[0];
        const out = data.animals.filter(({ name }) => name === animalKey)
          .map((x) => x.residents)[0];
        const out2 = out.filter((x) => x.sex === sex);
        const out3 = out2.map((x) => x.name);
        obj1[animalKey] = out3;
      });
    });
  }
}

function orderCondition(isOrdered, hasIncludeNames, includeNames) {
  if (isOrdered && hasIncludeNames) {
    const keys = Object.keys(includeNames);
    keys.forEach((key) => {
      includeNames[key].forEach((obj) => {
        const obj1 = obj;
        const objKeys = Object.keys(obj);
        objKeys.forEach((objKey) => {
          obj1[objKey] = obj1[objKey].sort();
        });
      });
    });
  }
}

function animalMap(options = {}) {
  const hasIncludeNames = Object.keys(options).includes('includeNames') && options.includeNames;
  const isOrdered = Object.keys(options).includes('sorted') && options.sorted;
  const sex = options.sex ? options.sex : null;
  const filterAnimalsByLocation = (loc) => data.animals.filter(({ location }) => location === loc);
  let includeNames = {};

  if (hasIncludeNames) {
    const locations = [...new Set((data.animals.map(({ location }) => location)))];
    locations.forEach((loc) => {
      const value = filterAnimalsByLocation(loc)
        .map((x1) => ({ [x1.name]: x1.residents.map((x2) => x2.name) }));
      includeNames = { ...includeNames, ...{ [loc]: value } };
    });
  } else return noOptions();
  sexCondition(sex, hasIncludeNames, includeNames);
  orderCondition(isOrdered, hasIncludeNames, includeNames);

  return includeNames;
}

const getScheduleDay = (day) => {
  const openTime = hours[day].open;
  const closingTime = hours[day].close;
  if (openTime === 0 && closingTime === 0) return 'CLOSED';
  return `Open from ${openTime}am until ${closingTime - 12}pm`;
};

function schedule(dayName) {
  // seu código aqui
  const result = {};
  const days = Object.keys(hours);
  if (dayName === undefined) {
    days.forEach((day) => {
      result[day] = getScheduleDay(day);
    });
  } else {
    result[dayName] = getScheduleDay(dayName);
  }
  return result;
}

/* function oldestFromFirstSpecies(id) {
  // seu código aqui
} */
// ajuda do murilo
function increasePrices(percentage) {
  // seu código aqui
  /* Ao passar uma porcentagem, incrementa todos os preços,
   arrendondados em duas casas decimais */
  const perc = (100 + percentage) / 100;
  const keys = Object.keys(data.prices);
  keys.forEach((key) => {
    const num = parseFloat((data.prices[key] * perc).toFixed(3));
    const int = Math.floor(num);
    const decimal = Math.ceil((num - int) * 100) / 100;
    data.prices[key] = int + decimal;
  });
}

/* function increasePrices(percentage) {
  // seu código aqui
  const increase = (percentage / 100) + 1;
  let increased = 0;
  Object.entries(data.prices).forEach(([key,value])=> {
    increase = value * increase;
    data.prices[key] = Math.round(increase * 100) / 100;
  });
  return data.prices;
} */

/* function employeeCoverage(idOrName) {
  // seu código aqui
} */

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
