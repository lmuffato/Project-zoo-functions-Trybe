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
  // seu código aqui
  // procurando is e retornando o id ou vazio
  return (ids !== []) ? ids.map((id) => data.animals.find((animal) => animal.id === id)) : ids;
}

function animalsOlderThan(animal, ageParameter) {
  // seu código aqui
  // procurando a espécie
  const animalspecies = data.animals.find(({ name }) => name === animal);
  // comparando
  return animalspecies.residents.every(({ age }) => age > ageParameter);
}

function employeeByName(employeeName) {
  // seu código aqui
  // procurando empregado
  const employee = data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
  // retornando objeto do empregado ou vazio
  return employee !== undefined ? employee : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  // dando spread no conteúdo
  return { ...personalInfo, ...associatedWith };
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
  return data.animals.find(({ name }) => name.includes(species)).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  // caso não seja dado nenhum argumento
  if (entrants === undefined) {
    return 0;
  }
  // caso o objeto seja um objeto vazio
  if (Object.keys(entrants).length === 0) {
    return 0;
  }
  // copiando os dados recebidos no parametro para inserir no código
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  // retornando a conta
  return Adult * data.prices.Adult + Child * data.prices.Child + Senior * data.prices.Senior;
}

function animalMap(options = {}) {
  // seu código aqui
  // constante das regiẽes
  const { includeNames = false, sorted = false, sex = false } = options;
  const regionList = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
    // sem parâmetro ou includeNames = false
  if (includeNames === false) {
    data.animals.forEach((animal) => regionList[animal.location].push(animal.name));
    return regionList;
  }
  // includeNames = true
  data.animals.forEach((animal) => {
    // criando um objeto para receber a lista
    const residentslist = {};
    // recebendo os animais no objeto criado, diferenciando por sexo se tiver sido especificado
    residentslist[animal.name] = animal.residents.reduce((acc, resident) => {
      if (sex === false || sex === resident.sex) {
        acc.push(resident.name);
      }
      return acc;
    }, []);
    // organizando os animais no objeto se tiver sido pedido
    if (sorted === true) {
      residentslist[animal.name].sort();
    }
    // jogando o objeto na lista principal após fazer as mudanças necessárias no objeto
    regionList[animal.location].push(residentslist);
  });
  return regionList;
}

function schedule(dayName) {
  // seu código aqui
  // criando a agenda
  const schedulelist = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  // condição de nao ter dado nome do dia
  if (dayName === undefined) {
    return schedulelist;
  }
  // caso seja passado um dia específico
  return { [dayName]: schedulelist[dayName] };
}

function oldestFromFirstSpecies(id) {
  const specifiedEmployee = data.employees.find((employee) => employee.id === id);
  const firstEspecie = specifiedEmployee.responsibleFor[0];
  const specie = data.animals.find((animal) => animal.id === firstEspecie);
  const residentAnimals = specie.residents;
  let highestAge = 0;
  let currentAnimal;
  residentAnimals.forEach((resident) => {
    if (resident.age > highestAge) {
      highestAge = resident.age;
      currentAnimal = resident;
    }
  });
  return Object.values(currentAnimal);
}
// L156 procurando o empregado
// L157 procurando a primeira espécie
// L158 procurando a espécie em data
// L159 pegando a lista de animais da espécie
// L160 criando o loop para encontrar o mais velho

function increasePrices(percentage) {
  // pegando os preços de data
  const { Adult, Child, Senior } = data.prices;
  // fazendo as alterações
  data.prices.Adult = Math.ceil(Adult * (100 + percentage)) / 100;
  data.prices.Child = Math.ceil(Child * (100 + percentage)) / 100;
  data.prices.Senior = Math.ceil(Senior * (100 + percentage)) / 100;
}

function employeeCoverage(idOrName) {
  const id = idOrName;
  return id;
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
