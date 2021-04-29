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
  // seu código aqui
  const ani = [];
  data.animals.forEach((el, i) => {
    if (el.id === ids[i]) {
      ani.push(el);
    }
  });
  return ani;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const ani = data.animals.find((cate) => cate.name === animal);
  return ani.residents.every((arr) => arr.age > age);
}

function employeeByName(emp) {
  // seu código aqui
  let pessoa = data.employees.find((trab) => trab.firstName === emp || trab.lastName === emp);
  if (!emp) pessoa = {};
  return pessoa;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const Funcionario = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(Funcionario);
  return Funcionario;
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    // o codigo da função seguinte foi baseado em: https://github.com/eslint/eslint/issues/8581
    const obj = animals.reduce((acumu, ani) => {
      const acumula = { ...acumu };
      acumula[ani.name] = ani.residents.length;
      return acumula;
    }, {});
    return obj;
  }
  const arr = animals.find((item) => item.name === species);
  return arr.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || Object.keys(entrants).length === 0) { return 0; }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const all = Adult * data.prices.Adult + Senior * data.prices.Senior + Child * data.prices.Child;
  return all;
}
/*
function animalMap(options) {
  // seu código aqui
}
*/
function schedule(dayName) {
  // seu código aqui
  const val = {};
  const horas = Object.entries(data.hours);
  horas.forEach((day) => {
    val[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
  });
  val.Monday = 'CLOSED';
  const final = {};
  final[dayName] = val[dayName];
  if (!dayName) {
    return val;
  }
  return final;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const responsibleAnimal = {};
  if (idOrName) {
    const findEmployer = data.employees.find(({ firstName, lastName, id }) =>
      firstName === idOrName || lastName === idOrName || id === idOrName);
    const findAnimals = findEmployer.responsibleFor.map((animalId) => animals
      .find((animal) => (animal.id === animalId)).name);
    responsibleAnimal[`${findEmployer.firstName} ${findEmployer.lastName}`] = findAnimals;
    return responsibleAnimal;
  }
  data.employees.forEach((worker) => {
    responsibleAnimal[`${worker.firstName} ${worker.lastName}`] = worker.responsibleFor
      .map((animalId) => (animals.find((animal) => animal.id === animalId)).name);
  });
  return responsibleAnimal;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const empregado = data.employees.find((element) => element.id === id);
  const Idanimal = empregado.responsibleFor[0];
  const animal = animals.find((singleAnimal) => singleAnimal.id === Idanimal);
  const menos = animal.residents.map((resident) => resident.age).sort((a, b) => b - a);
  const all = animal.residents.find((resident) => resident.age === menos[0]);
  return Object.values(all);
}

function increasePrices(percentage) {
  // seu código aqui
  const { Adult, Child, Senior } = data.prices;
  data.prices.Child = (Math.round(Child * (1 + percentage / 100) * 100)) / 100;
  data.prices.Adult = (Math.round(Adult * (1 + percentage / 100) * 100)) / 100;
  data.prices.Senior = (Math.round(Senior * (1 + percentage / 100) * 100)) / 100;
  return data.prices;
}

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
