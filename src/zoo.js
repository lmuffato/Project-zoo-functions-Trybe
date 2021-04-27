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

const { prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  // procurando is e retornando o id ou vazio
  return (ids !== []) ? ids.map((id) => data.animals.find((animal) => animal.id === id)) : ids;
}

function animalsOlderThan(animal, ageParameter) {
  // seu código aqui
  //procurando a espécie
  const animalspecies = data.animals.find(({name}) => name === animal)
  //comparando
  return animalspecies.residents.every(({age}) => age > ageParameter);
}

function employeeByName(employeeName) {
  // seu código aqui
  //procurando empregado
  const employee = data.employees.find(({firstName, lastName}) => firstName === employeeName || lastName === employeeName);
  // retornando objeto do empregado ou vazio
  return employee !== undefined ? employee : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  // dando spread no conteúdo
  return { ...personalInfo, ...associatedWith}
}

function isManager(id) {
  // seu código aqui
  // procurando as tags manager nos employees
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  // criando o objeto
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  // adicionando ao data
  data.employees.push(employee);
}

function animalCount(species) {
  // seu código aqui
  // se não for dado a espécie, retornando a quantidade de todos os animais em um objeto
  if (species === undefined) {
    return data.animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  // dado uma espécie, retornando a quantidade dele
  else {
    return data.animals.find(({ name }) => name.includes(species)).residents.length;
  }
}

function entryCalculator(entrants) {
  // seu código aqui
  // caso não seja dado nenhum argumento
  if (entrants === undefined){
    return 0;
  }
  // caso o objeto seja um objeto vazio
  else if (Object.keys(entrants).length === 0){
    return 0;
  }
  else{
    // copiando os dados recebidos no parametro para inserir no código
    const {Adult = 0, Senior = 0, Child = 0} = entrants;
    // retornando a conta
    return Adult*data.prices.Adult + Child*data.prices.Child + Senior*data.prices.Senior;
  }
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
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
