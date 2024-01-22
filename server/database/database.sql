CREATE TABLE Employee (
    ID serial PRIMARY KEY,
    Admin BOOLEAN,
    Tech BOOLEAN,
    skillset varchar,
    location varchar,
    name varchar,
    email varchar,
);
CREATE TABLE TaskIssue (
    ID serial PRIMARY KEY,
    Emp_ID int REFERENCES Employee(ID),
    Location varchar,
    Description varchar,
    Status varchar,
    category varchar,
    remote BOOLEAN
);