const data = require('../data');

const find = {
  byName: {
    firstName(name) {
      const result = data.employees.find((employee) => employee.firstName === name);
      if (result === undefined) return false;
      return {
        found: true,
        result,
      };
    },
    lastName(name) {
      const result = data.employees.find((employee) => employee.lastName === name);
      if (result === undefined) return false;
      return {
        found: true,
        result,
      };
    },
  },
  animals: {
    oldestFromFirstSpecies(id) {
      const employee = data.employees.find((person) => person.id === id);
      const firstSpeciesId = employee.responsibleFor[0];
      const animal = data.animals.find((species) => species.id === firstSpeciesId);
      let oldestAnimal = { age: -1 };
      animal.residents.forEach((resident) => {
        if (resident.age > oldestAnimal.age) {
          oldestAnimal = resident;
        }
      });
      oldestAnimal = [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
      return oldestAnimal;
    },
  },
};

const verify = {
  byId: {
    oneId: {
      ifIsManager(id) {
        const results = [];

        data.employees.forEach((employee) => {
          const { managers } = employee;
          const isManager = managers.some((manager) => manager === id);
          results.push(isManager);
        });

        const hasEmployees = results.some((result) => result === true);

        if (hasEmployees) return true;

        return false;
      },
    },
  },
};

const get = {
  employees() {
    return data.employees;
  },
};

module.exports = {
  find,
  verify,
  get,
};
