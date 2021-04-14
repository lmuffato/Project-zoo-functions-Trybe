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

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  if (ids === null || ids === undefined) return [];
  return animals.filter((animal, index) => animal.id === ids[index]);
}
// Com a ajuda do plantão do instrutor Eliezer Queiroz e sugestão da colega Carolina Vasconcellos.

function animalsOlderThan(animal, age) {
  return animals.find((oneAnimal) => oneAnimal.name === animal)
    .residents.every((resident) => resident.age >= age);
}
// Solução da função animalsOlderThan compartilhada pela colega Thalita Cecilier, em reunião do grupo de estudo.

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const searchEmployee = employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return searchEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}
// Ideia para refatorar isManager surgiu a partir de discussão em grupo de estudo das meninas da turma.
// Nesta refatoração de isManager, tomei por base a solução compartilhada pela colega Thalita Cecilier durante a reunião do grupo.

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

const createAnimalsList = () => {
  const animalList = animals.reduce((obj, animal) => {
    const objt = obj;
    objt[animal.name] = animal.residents.length;
    return obj;
  }, {});
  return animalList;
};
// Função createAnimalsList refatorada a partir da ideia da colega Beatriz Barbosa, conforme discutimos em grupo de estudo

function animalCount(species) {
  if (!species) {
    return createAnimalsList();
  }
  const soughtSpecie = animals.find((animal) => species === animal.name);
  return soughtSpecie.residents.length;
}

function entryCalculator(entrants = {}) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  if (entrants === undefined) return 0;
  const totalAdult = Adult * prices.Adult;
  const totalChild = Child * prices.Child;
  const totalSenior = Senior * prices.Senior;
  return parseFloat((totalAdult + totalChild + totalSenior).toPrecision(5));
}
// Retirei parseFloat das constantes da função entryCalculator e deixei só no return, aderindo à ideia (e sugestão) da colega Heloísa Hackenhaar

/* ---> PARA REFERÊNCIAS FUTURAS - Formas alternativas de criar e iterar o objeto
// Alternativa I - Usando loop for
const getMap = () => {
  const map = {};
  const keys = Object.keys(map);
  for (let i = 0; i < animals.length; i += 1) {
    if (!keys.includes(animals[i].location)) {
      map[animals[i].location] = [];
    }
  }
  return map;
};

 // Alternativa II - Usando loop forEach
const getMap = () => {
  const map = {};
  const keys = Object.keys(map);
  animals.forEach((animal) => {
    if (!keys.includes(animal.location)) {
      map[animal.location] = [];
    }
  });
  return map;
};
*/
// Alternativa III - Usando reduce
// Cria um objeto com arrays vazios das regiões
const getMap = () => {
  const mapOfAnimals = animals.reduce((map, animal) => {
    const mapa = map;
    if (!Object.keys(mapa).includes(animal.location)) {
      mapa[animal.location] = [];
      return mapa;
    }
    return mapa;
  }, {});
  return mapOfAnimals;
};

// Atribui os nomes das espécies aos arrays das suas respectivas regiões
const attributeAnimalsSpecies = (objt) => {
  animals.forEach(({ name, location }) => {
    objt[location].push(name);
  });
  return objt;
};

function animalMap(options = { includeNames: false, sex: undefined, sorted: false }) {
  const location = getMap();
  const { includeNames } = { ...options };
  if (options === undefined || includeNames === false) return attributeAnimalsSpecies(location);
}

const printDaySchedule = (day) => {
  const information = {};
  if (day === 'Monday') {
    information[day] = 'CLOSED';
  } else {
    information[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
  }
  return information;
};

const printFullSchedule = () => {
  const print = Object.keys(hours).reduce((obj, day) => {
    const objt = obj;
    if (day === 'Monday') {
      objt[day] = 'CLOSED';
    } else {
      objt[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
    return objt;
  }, {});
  return print;
};

function schedule(dayName) {
  let result;
  if (dayName === undefined) {
    result = printFullSchedule();
  } else {
    result = printDaySchedule(dayName);
  }
  return result;
}

// Me inspirei na solução da colega Beatriz Estebanez para a função printDaySchedule.
// https://github.com/tryber/sd-010-a-project-zoo-functions/pull/62/files
// Refatoração: notei que o teste rodou mais rápido quando separei o requisito em funções menores e mais específicas
// Por isto, optei por construir a função printFullSchedule em separado da função printDaySchedule, que imprime o horário do dia.

function oldestFromFirstSpecies(id) {
  const soughtId = employees.find((employee) => employee.id === id); // encontra o funcionário
  const speciesId = soughtId.responsibleFor.find((res) => res); // localiza o id da primeira espécie
  const discoverAnimal = animals.find((animal) => animal.id === speciesId); // localiza o animal correspondente ao ID
  const oldest = discoverAnimal.residents.reduce((firstAnimal, animal) => {
    if (firstAnimal.age > animal.age) return firstAnimal;
    return animal;
  });
  const { name, sex, age } = oldest;
  return [name, sex, age];
}
// Solução da função oldestFromFirstSpecies adaptada da solução proposta pela colega Beatriz Barbosa no slack:
// https://trybecourse.slack.com/archives/C01L16B9XC7/p1618174154409200

const calculateIncrease = (percent) => 1 + (percent / 100) + 0.00001;

function increasePrices(percentage) {
  const increasePrice = calculateIncrease(percentage);
  prices.Adult = parseFloat((prices.Adult * increasePrice).toPrecision(4));
  prices.Senior = parseFloat((prices.Senior * increasePrice).toPrecision(4));
  prices.Child = parseFloat((prices.Child * increasePrice).toPrecision(4));
}

const animalsEmployees = employees.reduce((obj, employee) => {
  const objt = obj;
  const arrAnimals = employee.responsibleFor;
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const animalsEmployeeIsResponsibleFor = arrAnimals
    .map((resp) => animals.find((animal) => resp === animal.id).name);
  objt[fullName] = animalsEmployeeIsResponsibleFor;
  return objt;
}, {});

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return animalsEmployees;
  }
  const findEmployee = employees
    .find((el) => el.id === idOrName || el.lastName === idOrName || el.firstName === idOrName);
  const name = `${findEmployee.firstName} ${findEmployee.lastName}`;
  const getAnimal = findEmployee.responsibleFor
    .map((resp) => animals.find((animal) => resp === animal.id).name);
  return { [name]: getAnimal };
}
// O uso da combinação de map e find na função employeeCoverage: https://github.com/tryber/sd-09-project-zoo-functions/pull/48/files

// Referências:
// http://www.macoratti.net/18/09/js_marr2.htm

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
