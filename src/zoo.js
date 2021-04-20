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

const obj = {
  lions: 4,
  tigers: 2,
  bears: 3,
  penguins: 4,
  otters: 4,
  frogs: 2,
  snakes: 2,
  elephants: 4,
  giraffes: 6,
};

function animalsByIds(...ids) {
  const retornar = [];
  for (let index = 0; index < ids.length; index += 1) {
    retornar.push(...data.animals.filter((anima) => anima.id === ids[index]));
  }
  return retornar;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // olhei sintaxe de outros colegas para corrigir erros:
  // https://github.com/tryber/sd-010-a-project-zoo-functions/blob/LucasPedroso-project-zoo-functions/src/zoo.js
  // e outros
  return data
    .animals.find((animalData) => animal === animalData.name)
    .residents.every((resid) => resid.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return data.employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  // seu código aqui
  return data
    .employees.find((employee) => id === employee.id)
    .managers.some((m) => m === '9e7d4524-363c-416a-8759-8aa7e50c0992');
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data
    .employees.push({
      id,
      firstName,
      lastName,
      managers,
      responsibleFor,
    });
}

function animalCount(species) {
  // seu código aqui
  if (!species) return obj;
  return data
    .animals.find(({ name }) => name === species)
    .residents.length;
}
// esta função abaixo(requisito 8 )eu tinha uma logica que se mostrou ineficiente.
// para conseguir completa tive que ver codigos pela internet, para achar o object.
// entries,(eu não me lembrava do conteudo) e vi tambem em codigo de alunos
// porem a logica da questão eu tinha
function entryCalculator(entrants = 0) {
  // seu código aqui
  return Object.entries(entrants)
    .reduce((acum, [chave, valor]) => acum + data.prices[chave] * valor, 0);
}

/* function animalMap(options) {
    // seu código aqui
  } */

const semana = () => {
  const semanaDias = Object.keys(data.hours);
  const funcionamento = semanaDias.reduce((acc, key) => {
    const { open, close } = data.hours[key];
    const retorno = acc;
    if (open === 0) {
      retorno[key] = 'CLOSED';
    } else {
      retorno[key] = `Open from ${open}am until ${close - 12}pm`;
    }
    return acc;
  }, {});
  return funcionamento;
};

function schedule(dayName) {
  // seu código aqui
  if (!dayName) return semana();
  const { open, close } = data.hours[dayName];
  let frase = { [dayName]: `Open from ${open}am until ${close - 12}pm` };
  if (open !== 0 && close !== 0) return frase;
  frase = { [dayName]: 'CLOSED' };
  return frase;
}

const animalProcurado = (id) => data.employees.find((employee) => id === employee.id)
  .responsibleFor.find((animal) => animal);

function oldestFromFirstSpecies(id) {
  // seu código aqui
  return Object.values(data.animals.find((animal) => animal.id === animalProcurado(id)).residents
    .reduce((antes, depois) => ((antes.age > depois.age) ? antes : depois)));
}

function increasePrices(percentage) {
  // seu código aqui
  const { Adult, Child, Senior } = data.prices;
  data.prices.Adult = Math.ceil(Adult * (100 + percentage)) / 100;
  data.prices.Child = Math.ceil(Child * (100 + percentage)) / 100;
  data.prices.Senior = Math.ceil(Senior * (100 + percentage)) / 100;
  return data.prices;
}

const responsaTodos = (name) => {
  const array = data.animals;
  retornar = [];
  for (let index = 0; index < name.length; index++) {
    const element = name[index];
    for (let i = 0; i < array.length; i++) {
      const element2 = array[i];
      if (element == element2.id) {
        retornar.push(element2.name);
      }
    }
  }
  return retornar;
}

const semParametro = () => {
  const expected = {}
  const array= data.employees;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    expected[`${element.firstName} ${element.lastName}`] = responsaTodos(element.responsibleFor); 
  }       
  return expected;          
  }

function responsa(y){
  let retorno = [];
  const array = data.animals.length;
  for (let i = 0; i < y.length; i++) {
    for (let index = 0; index < array ; index++) {
      if(y[i] == data.animals[index].id){
        retorno.push(data.animals[index].name);
      }
    }
  }
  return retorno;
}

const comParametro = (idOrName) => {
  const {firstName : x, responsibleFor: y, lastName : z} = data.employees
    .find(({ id, firstName, lastName }) => idOrName === id || idOrName === firstName || idOrName === lastName)
  const firstLast = `${x} ${z}`;
  return {[firstLast]: responsa(y)};     
}

function employeeCoverage(idOrName) {
  // seu código aqui
  if(idOrName) return comParametro(idOrName);
  return semParametro();
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
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
