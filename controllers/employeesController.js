const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (newData) {
    this.employees = newData;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const postEmployees = (req, res) => {
  const newEmployee = {
    id: data.employees.length ? data.employees[data.employees.length - 1].id + 1 : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    res.status(400).json({ message: "both firsname and lastname required" });
  }
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const putEmployees = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));
  if (req.body.firstname) {
    data.employees.firstname = req.body.firstname;
  }
  if (req.body.lastname) {
    data.employees.lastname = req.body.lastname;
  }
  const filterArray = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
  const unSorterdArray = [...filterArray, employee];
  const sorterArray = unSorterdArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  data.setEmployees(sorterArray);
  res.status(201).json(sorterArray);
};
const deleteEmployees = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));
  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }
  const filterArray = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
  data.setEmployees([...filterArray]);
  res.status(201).json(data.employees);
};

const paramsEmployees = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === parseInt(req.params.id));
  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  postEmployees,
  putEmployees,
  deleteEmployees,
  paramsEmployees,
};
