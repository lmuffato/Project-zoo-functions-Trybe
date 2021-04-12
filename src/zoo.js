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
// Função createAnimalsList adaptada da ideia da colega Beatriz Barbosa, conforme discutimos em grupo de estudo

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
// Retirei parseFloat das constantes e deixei só no return,
// aderindo à ideia (e sugestão) da colega Heloísa Hackenhaar, conforme discutimos em grupo de estudo

/*
function animalMap(options) {
  // seu código aqui
}
*/

const printSchedule = (day, info) => {
  const information = info; // objeto
  if (day === 'Monday') {
    information[day] = 'CLOSED';
  } else {
    information[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
  }
  return information;
};

function schedule(dayName) {
  const information = {}; // objeto
  if (dayName === undefined) {
    Object.keys(hours).forEach((day) => printSchedule(day, information));
  } else {
    return printSchedule(dayName, information);
  }
  return information;
}
// Ideia de usar o forEach retirada do código da colega Beatriz Estabanez. (Eu estava tentando com o reduce, mas não deu certo).
// https://github.com/tryber/sd-010-a-project-zoo-functions/pull/62/files

/*
const animalsIds = (animalId) => {
  // let arr = [];
  animalId.filter((animal, index) => {
    // animal.name;
    // animal.sex;
    // animal.age;
  });
};
*/
//  retorna um array com nome, sexo e idade do animal mais velho dessa espécie
/*
const desestrutura = () => {
  const residentes = animals[0].residents;
  const ages = residentes[0].age;
  return ages;
};
// console.log(desestrutura());
*/

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

// const listOfAnimalsAndEmployees = () => {
// };
const animalsEmployees = employees.reduce((previousValue, value) => {
  const previous = previousValue;
  const valueItems = value.responsibleFor;
  const fst = animals.find((animal) => valueItems[0] === animal.id);
  const scd = animals.find((animal) => valueItems[1] === animal.id);
  const trd = animals.find((animal) => valueItems[2] === animal.id);
  const four = animals.find((animal) => valueItems[3] === animal.id);
  previous[`${value.firstName} ${value.lastName}`] = [fst.name, scd.name];
  if (valueItems.length === 3) {
    previous[`${value.firstName} ${value.lastName}`] = [fst.name, scd.name, trd.name];
  }
  if (valueItems.length > 3) {
    previous[`${value.firstName} ${value.lastName}`] = [fst.name, scd.name, trd.name, four.name];
  } return previous;
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
// Linhas 184-185 da função employeeCoverage adaptadas de: https://github.com/tryber/sd-09-project-zoo-functions/pull/48/files

// Referências:
// http://www.macoratti.net/18/09/js_marr2.htm

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  //  animalMap,
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
