const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');

const setupMVVM = require('./actions/setup_mvvm');
const init = require('./actions/init');


console.log(
  chalk.yellow(
    figlet.textSync('FarMart MVVM', { horizontalLayout: 'full' })
  )
);

async function main()
{
  let action_result = await inquirer.startup();

  if( action_result.action === "init" )
  {
    init();
    //setupMVVM();
  }
  else 
  {
    console.log(chalk.red("mujhe samjh nhi aaya"));
  }
}

main();