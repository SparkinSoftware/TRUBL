CREATE TABLE Employee (
    ID uuid PRIMARY KEY,
    skillset varchar,
    location varchar,
    name varchar,
    email varchar,
    role int
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