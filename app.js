'use strict';
const readline = require('readline');
const db = require('./redis.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const info = () => {
    rl.question('\nWelcome to TODOLIST!\n' + 
    '1. Enter Task\n' + 
    '2. Display all Task\n' +
    '3. Remove Task\n' +
    'Please select your number: ', (number) => {

        number = parseInt(number);
        if(number < 1 || number > 3 || isNaN(number) )
            info();
        else
            work(number);

    });
};

const enterTask = () => {

    rl.question('Enter your task: ', async (task) => {
        
        if (task !== ''){
            console.log('Your task is', task);
            await db.setData(task, task);
            enterTask();
        }
        else
            info();

    });

};

const displayAll = async () => {

    console.log('This is display all Task!');
    let keys = await db.getAll()
    for (let i in keys)
        console.log( i + '.', keys[i]);

    info();

};

const removeTask = async () => {

    let keys = await db.getAll()
    for (let i in keys)
        console.log( i + '.', keys[i]);

    rl.question('Enter number task to remove: ', async (number) => {

        number = parseInt(number);
        if(isNaN(number) || number >= keys.length || number < 0)
            displayAll();
        else {
            console.log('Removing:', number);
            await db.delData(keys[number]);
            displayAll();
        };

    });

};

const work = (number) => {

    console.log('\n')
    if (number === 1)
        enterTask();
    else if (number === 2)
        displayAll();
    else if (number === 3)
        removeTask();
    else
        rl.close();

};

info();