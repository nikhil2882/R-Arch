#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');

const { startup_choices_values } = require('./constants');

const init = require('./actions/init');
const createScreen = require('./actions/create_screen');



console.log(
  chalk.yellow(
    figlet.textSync('R-Arch', { horizontalLayout: 'full' })
  )
);

async function main()
{
  
  var args = process.argv.slice(2);

  if(args.length)
  {
    // if arguments are provided we will call suitable file
    //directly, else user have to choose from list
    return 
  }

  let action_result = await inquirer.startup();

  console.log(action_result)

  if( action_result.action === startup_choices_values.init_new_project )
  {
    let app_name = await inquirer.askForInput("what will be your project name ?");

    init(app_name.input);
  }
  else if( action_result.action === startup_choices_values.create_new_screen)
  {
    let screen_name = await inquirer.askForInput("what will be your screen name ? (use camle casing)");

    createScreen(screen_name.input);
  }
  else if( action_result.action === startup_choices_values.create_route)
  {
    let screen_name = await inquirer.askForInput("what will be your route name ?");

    //validate if route name have any space
    createScreen(screen_name.input);
  }
  else 
  {
    console.log(chalk.red("mujhe samjh nhi aaya"));
  }
}

main();

