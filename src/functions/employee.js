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
  byId(id) {
    const result = data.employees.find((employee) => employee.id === id);
    if (result === undefined) return false;
    return {
      found: true,
      result,
    };
  },
  employee(idOrName) {
    const { byId, byName } = find;
    const id = byId(idOrName);
    const name = {
      firstName: byName.firstName(idOrName),
      lastName: byName.lastName(idOrName),
    };

    const employee = [id, name.firstName, name.lastName].find((object) => object.found === true);
    return employee.result;
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
    employeesCoverage: {
      oneEmployee(idOrName) {
        const { animals } = data;
        const employee = find.employee(idOrName);
        const employeeFullName = `${employee.firstName} ${employee.lastName}`;
        const animalsOfEmployee = employee.responsibleFor.map((animalId) => {
          const animalFound = animals.find((animal) => animal.id === animalId);
          return animalFound.name;
        });
        return { [employeeFullName]: animalsOfEmployee };
      },
      all() {
        const employees = data.employees.map((employee) => employee.id);
        const employeesAndItsCoverage = {};
        employees.forEach((employeeId) => {
          const coverage = find.animals.employeesCoverage.oneEmployee(employeeId);
          const key = Object.keys(coverage)[0];
          employeesAndItsCoverage[key] = coverage[key];
        });
        return employeesAndItsCoverage;
      },
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
