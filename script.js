// const persons = [new Person(1, 'Mary', 'Sholz', '36'),
//     new Person(2, 'John', 'Dir', '56')];

const persons = [];

const data = ['id', 'first Name', 'last Name', 'age'];
const container = document.querySelector('.container');


let inputData = prompt('Enter person data separate by ","');
while (inputData) {
    const arr = inputData.split(',');
    if (findPerson(persons, arr[0]) === -1) {
        const person = new Person(arr[0], arr[1], arr[2], arr[3]);
        persons.push(person);
    } else {
        alert(`Person with id: ${arr[0]} exists`);
    }
    inputData = prompt('Enter person data separate by ","');
}

// printPersons(persons);
// printStats(persons);

createTable(persons);
createTableStats(persons);

function findPerson(persons, id) {
    return persons.findIndex(p => p.id === id);
}

function createTable(persons) {
    const blockTable = document.createElement('div');
    blockTable.setAttribute('class', 'blockTable');

    const titleEl = document.createElement("h1");
    const textTitleEl = document.createTextNode("Personal data");
    titleEl.appendChild(textTitleEl);
    container.appendChild(titleEl);

    const tableEl = document.createElement('table');
    tableEl.setAttribute('class', 'table table-hover table-bordered table-striped');

    const theadEl = document.createElement('thead');
    tableEl.appendChild(theadEl);

    const trEl = document.createElement('tr');
    theadEl.appendChild(trEl);


    for (let i = 0; i < data.length; i++) {
        const thEl = document.createElement('th');
        thEl.setAttribute('scope', 'col')
        const text = document.createTextNode(data[i].toString());
        thEl.appendChild(text);
        trEl.appendChild(thEl);
    }
    if (persons.length) {
        const tbodyEl = document.createElement('tbody');
        tableEl.appendChild(tbodyEl);

        for (let i = 0; i < persons.length; i++) {
            const bodyTrEl = document.createElement('tr');
            tbodyEl.appendChild(bodyTrEl);

            for (let key in persons[i]) {
                if (typeof persons[i][key] !== "function") {
                    const tdBodyEl = document.createElement('td');
                    const textBodyEl = document.createTextNode(persons[i][key].toString())
                    tdBodyEl.appendChild(textBodyEl);
                    bodyTrEl.appendChild(tdBodyEl);
                }
            }
        }
    }
    blockTable.append(tableEl);
    container.append(blockTable);
}

function createTableStats(persons) {
    const blockStats = document.createElement('div');
    blockStats.setAttribute('class', 'blockStats');

    if (persons.length) {
        const start = persons[0].age;
        const minAge = persons.reduce((res, p) => p.age < res ? p.age : res, start);
        const maxAge = persons.reduce((res, p) => p.age > res ? p.age : res, start);
        const avgAge = persons.reduce((res, p) => p.age + res, 0) / persons.length;

        const titleStats = document.createElement("h2");
        const textTitleStats = document.createTextNode("Stats:");
        titleStats.appendChild(textTitleStats);
        blockStats.appendChild(titleStats);

        const minAgeEl = document.createElement('p');
        minAgeEl.appendChild(document.createTextNode(`Min age: ${minAge}`));
        blockStats.appendChild(minAgeEl);

        const maxAgeEl = document.createElement('p');
        maxAgeEl.appendChild(document.createTextNode(`Max age: ${maxAge}`));
        blockStats.appendChild(maxAgeEl);

        const avgAgeEl = document.createElement('p');
        avgAgeEl.appendChild(document.createTextNode(`Average age: ${avgAge.toFixed(0)}`));
        blockStats.appendChild(avgAgeEl);
    } else {
        const titleStats = document.createElement("h2");
        const textTitleStats = document.createTextNode("No stats...");
        titleStats.appendChild(textTitleStats);
        blockStats.append(titleStats);
    }
    container.appendChild(blockStats);
}

function printPersons(persons) {
    persons.forEach(p => console.log(p.toString()));
}

function printStats(persons) {
    if (persons.length) {
        const start = persons[0].age;
        const minAge = persons.reduce((res, p) => p.age < res ? p.age : res, start);
        const maxAge = persons.reduce((res, p) => p.age > res ? p.age : res, start);
        const avgAge = persons.reduce((res, p) => p.age + res, 0) / persons.length;
        console.log(`min age = ${minAge}, max age = ${maxAge}, average age = ${avgAge}`);
    } else {
        console.log('No stats');
    }
}


function Person(id, firstName, lastName, age) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = +age;
    this.fullName = function () {
        return `${this.firstName} ${this.lastName}`
    }
    this.toString = function () {
        return `ID: ${this.id}, Name: ${this.fullName()}, Age: ${this.age}`
    }
}