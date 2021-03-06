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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animais) => ids.includes(animais.id));
}
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', '89be95b3-47e4-4c5b-b687-1fabf2afa274'));// test 1
// console.log(animalsByIds());// test 2

function animalsOlderThan(species, animalAge) {
  return animals
    .find(({ name }) => name === species)
    .residents
    .every(({ age }) => (age >= animalAge));
}

// console.log(animalsOlderThan('lions',15)); // TEST 1 - Expected false
// console.log(animalsOlderThan('lions',2)); // TEST 2 - Expected true
// console.log(animalsOlderThan('otters',7)); // TEST 4 - Expected true
// console.log(animalsOlderThan('penguins',10)); // TEST 3 - Expected false
// console.log(animals[0].residents[0].age) // Propriedade age

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find((employee) => employee.firstName === employeeName
    || employee.lastName === employeeName);
}
// console.log(employeeByName('Ola')) // TEST 1 - Expected objeto com fistName = 'Ola'
// console.log(employeeByName('Orloff')) // TEST 2 - Expected objeto com lastName = 'Orloff'
// console.log(employeeByName('')) // TEST 3 - Expected objeto vazio {}
// console.log(employeeByName()) // TEST 4 - Expected objeto vazio {}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}
// console.log(createEmployee({ id:'007', firstName:'James', lastName:'Bond' },
// { managers:['100','101'], responsibleFor:['snake','bear'] })) // TEST 1 - Expected objeto com funcionáiro

function isManager(id) {
  if (!id) { return false; }
  return (employees.map(({ managers }) => (managers))
    .some(([ids]) => ids === id)
  );
}
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1')) // TEST 1 - Retorna falso, pois Nigel não é gerente de ninguém
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83')) // TEST 2 - Retorna true, pois Burl é gerente de algumas pessoas
// console.log(isManager('')) // TEST 3 - Retorna false, pois é uma string vazia
// console.log(isManager()) // TEST 4 - Retorna false, pois não há argumento passado par a função

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push(
    { id, firstName, lastName, managers, responsibleFor },
  );
}
// console.log(addEmployee('007','James', 'Bond',
//             ['0e7b460e-acf4-4e17-bcb3-ee472265db83', 'baa6e93a-f295-44e7-8f70-2bcdc6f6948d'],
//             ['baa6e93a-f295-44e7-8f70-2bcdc6f6948d', '0938aa23-f153-4937-9f88-4858b24d6bce']),
//             employees) // TESTE 1 - Retorna o objeto employee com o novo empregado no final da lista

function animalCount(specie) {
  if (!specie) {
    const animalList = {};
    animals.forEach((animal) => { animalList[animal.name] = animal.residents.length; });
    return animalList;
  }
  return (animals.find((animal) => animal.name === specie)).residents.length;
}
// console.log ( animalCount('lions') ) // TESTE 1 -> Retorna 4, que é a população de leões
// console.log ( animalCount() ) // TESTE 2 -> Retorna um objeto contendo o nome do animale a população

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) { return 0; }
  return Object.keys(entrants)
    .map((key) => (entrants[key] * prices[key]))
    .reduce((acc, elemento) => acc + elemento);
}
// console.log(entryCalculator({Adult:10,Child:20,Senior:15,})) // TESTE 1 -> Retorna 1294.55
// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 })) // TESTE 2 -> Retorna 187.94
// console.log(entryCalculator({Adult:0,Child:0,Senior:0,})) // TESTE 3 -> Retorna 0
// console.log(entryCalculator()) // TESTE 4 -> Retorna 0
// console.log(entryCalculator('')) // TESTE 5 -> Retorna 0
// console.log(entryCalculator({})) // TESTE 6 -> Retorna 0

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const horarioSemanal = {};
  const dias = Object.keys(data.hours).map((dia) => dia);
  const horarios = Object.values(data.hours).map((horario) => horario);
  horarios.forEach(({ open, close }, index) => {
    const horadioDiario = (day) => {
      if (day !== 'Monday') { return `Open from ${open}am until ${close - 12}pm`; }
      return 'CLOSED';
    };
    horarioSemanal[dias[index]] = horadioDiario(dias[index]);
  });
  if (!dayName) { return horarioSemanal; }
  return { [dayName]: horarioSemanal[dayName] };
}
// console.log(schedule()); // TESTE 1 - Retorna o quadro de horarios semanal
// console.log(schedule('Wednesday')); // TESTE 2 - Retorna o horário do dia
// console.log(schedule('Monday')); // TESTE 3 - Retorna CLOSED, por ser domingo

function oldestFromFirstSpecies(idEmployee) {
  const employeeId = employees.find((employee) => employee.id === idEmployee);
  const animalList = employeeId.responsibleFor;
  const firstEspecie = animals.filter((animal) => animal.id === animalList[0]);
  const especieResidents = (firstEspecie.map(({ residents }) => residents));
  const especieResidents2 = especieResidents.reduce((acc, curr) => acc.concat(curr), []);
  const especiesAge = especieResidents2.map((animal) => animal.age);
  const maiorIdade = especiesAge.sort((a, b) => b - a);
  const animalMaisVelho = especieResidents2.find(({ age }) => age === maiorIdade[0]);
  return Object.values(animalMaisVelho);
}
// console.log(oldestFromFirstSpecies('b0dc644a-5335-489b-8a2c-4e086c7819a2')); // TESTE 1 -> Retorna [ 'Orval', 'male', 15 ]
// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992')); // TESTE 2 -> Retorna [ 'Vicky', 'female', 12 ]

function increasePrices(percentage) {
  const atualizaPreco = (preco) => ((preco * (1 + percentage / 100)));
  const arredondar = (numero) => (Math.round(numero * 100) / 100);
  const { Adult, Child, Senior } = prices;
  prices.Adult = arredondar(atualizaPreco(Adult));
  prices.Child = arredondar(atualizaPreco(Child));
  prices.Senior = arredondar(atualizaPreco(Senior));
  // if (!percentage) { return prices; }
  // const chaves = Object.keys(prices);
  // const valores = Object.values(prices);
  // return chaves.reduce((valorAnterior, valorAtual, index) => {
  //   valorAnterior[valorAtual] = arredondar(atualizaPreco(valores[index]));
  //   return valorAnterior;
  // },
  // {});
}
// console.log(increasePrices(50)); // TESTE 1  -> O preço sobe 50%
// console.log(increasePrices()); // TESTE 2 -> O preço não tem alteração
// console.log(prices); // TESTE 2 -> O preço não tem alteração

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  //   animalMap,
  animalsByIds,
  employeeByName,
  //   employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
