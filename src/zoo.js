// const data = require('./data');
const { animals, employees, prices, hours } = require('./data'); // object destructuring

function animalsByIds(...ids) { // rest
  if (!ids) { // ! = negação
    return [];
  }
  return animals.filter(({ id }) => ids.some((a) => id === a));
}

// Source: tive auxílio do colega André Jaques!

function animalsOlderThan(animal, idade) {
  return animals
    .find(({ name }) => name === animal)
    .residents.every(({ age }) => age >= idade);
}

// Source: tive auxílio do colega André Jaques!

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((empregado) => (
    (empregado.firstName === employeeName || empregado.lastName === employeeName)));
}
// Source: tive auxílio do colega Lucas Paz!

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) { // parâmetros substituidos por objetos
  // const ident = personalInfo.id;
  // const primeiroNome = personalInfo.firstName;
  // const ultimoNome = personalInfo.lastName;
  // const gerentes = associatedWith.managers;
  // const responsavel = associatedWith.responsibleFor;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

// Source: tive auxílio do colega Lucas Paz!

function isManager(id) {
  return employees.some(((funcionario) => funcionario.managers.includes(id)));
}

// Source: consulta ao repositório do Alex Silveira = https://github.com/tryber/sd-010-a-project-zoo-functions/pull/139/commits

function addEmployee(id, firstName, lastName, [...managers] = [], [...responsibleFor] = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

// Source: consulta ao repositório do Alex Silveira = https://github.com/tryber/sd-010-a-project-zoo-functions/pull/139/commits

function animalCount(species) {
  if (species === undefined) { // sem parâmetros
    const allSpecies = {}; // retorna um objeto
    animals.forEach((animal) => { // iterar sobre todos os elementos
      allSpecies[animal.name] = animal.residents.length; // com animais e suas quantidades
    });
    return allSpecies;
  }
  const especie = animals.find((animal) => (species === animal.name)); // com o nome de uma espécie
  return especie.residents.length; // retorna apenas a quantidade
}

// Source: consulta ao repositório = https://github.com/tryber/sd-010-a-project-zoo-functions/pull/137/commits

function entryCalculator(entrants) {
  if (entrants === undefined || entrants.length === 0) {
    return 0; // retorna zero se nenhum argumento for passado ou objeto for vazio
  }
  let somaDasEntradas = 0; // declaração variável para somar as entradas
  const tiposVisitantes = Object.keys(entrants); // acessar as propriedades do objeto (adult, child, senior)
  tiposVisitantes.forEach((tipoVisitante) => {
    somaDasEntradas += prices[tipoVisitante] * entrants[tipoVisitante]; // retorna preço total dado numero adult, child, senior
  });
  return somaDasEntradas;
}

// Source: consulta ao repositório = https://github.com/tryber/sd-010-a-project-zoo-functions/pull/137/commits

// function animalMap(options) {
//   // seu código aqui
// }

function criarTexto(dia) { // função gera texto de horário de abertura e fechamento, converte hora para formato 12h
  if (hours[dia].close > 12) { // se o horário de fechamento do dia passar de 12(h) / ou seja, entrar em formato 24h
    hours[dia].close -= 12; // converte o horário para o formato 12h
  }
  if (hours[dia].open === 0) { // se não tiver horário de abertura no dia
    return 'CLOSED';
  }
  return `Open from ${hours[dia].open}am until ${hours[dia].close}pm`; // texto a retornar com os horários do dia
}

function schedule(dayName) {
  const horarioSemanal = {}; // obj vazio para receber os valores
  const dias = Object.keys(hours); // acessar as chaves do obj hour / recupera os dias da semana
  dias.forEach((dia) => { // para cada dia da semana
    if (dayName === undefined || dayName === dia) { // sem parâmetros retorna cronograma completo, se receber retorna cronograma do dia
      horarioSemanal[dia] = criarTexto(dia); // obj vazio que recebe os valores recebe resultado da função criarTexto
    }
  });
  console.log(horarioSemanal);
  return horarioSemanal;
}

// Source: consulta ao repositório = https://github.com/tryber/sd-010-a-project-zoo-functions/pull/137/commits

function oldestFromFirstSpecies(id) {
  const animalID = employees.find((person) => person.id === id).responsibleFor[0]; // função para armazenar o primeiro animal gerenciado pela pessoa colaboradora identificada através de id
  // find percorre e encontra o primeiro item que satisfaz
  const animal = animals.find((actualAnimal) => actualAnimal.id === animalID); // percorre animals e compara o id de cada animal com o valor resgatado em const animalID
  const olderAnimal = animal.residents // acessa animal armazenado na const animal e acessa a propriedade residents
    .reduce((acc, actualValue) => (acc.age < actualValue.age ? actualValue : acc)); // o reduce é aplicado no array residents
    // em cada elemento é acessada a idade do acc e compara com a idade do actualValue, caso a idade de actualValue seja maior retorna o actualValue, caso seja menor retorna acc;
  return Object.values(olderAnimal); // retorna um array com os valores encontrados em olderAnimal
}

// Source: consulta ao repositório do Alex Silveira = https://github.com/tryber/sd-010-a-project-zoo-functions/pull/139/commits

function increasePrices(percentage) {
  let aumentoPreco = 0; // var que recebe aumento
  const valor = Object.keys(prices); // adult: x, child: y, senior: z;
  valor.forEach((preço) => { // para cada elemento em valor (adult, child, senior), execute - arrow function = ONDE
    aumentoPreco = prices[preço] + ((prices[preço] * percentage) / 100); // aumento do preço, convertendo parâmetro para porcentagem
    prices[preço] = +(Math.round(aumentoPreco * 100) / 100).toFixed(2); // arredondando preço para duas casas decimais
  });
}

// Source: consulta ao repositório = https://github.com/tryber/sd-010-a-project-zoo-functions/pull/137/commits

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
