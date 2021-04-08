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

module.exports = {
  find,
  verify,
};
