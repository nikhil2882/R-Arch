const chalk = require('chalk');


const filesMethods = require('../lib/files');

//actions
const addNewRoute = require("./add_new_route");
const addNewScreen = require("./create_new_screen");
const addNewContainer = require("./create_new_container");


module.exports = function(screen_name)
{
  let current_directory = process.cwd();

  if(screen_name.includes("-") || screen_name.includes("_"))
  {
    console.log(chalk.red("Please enter name in CamelCasing"));
    return;
  }

  try
  {
    console.log(chalk.yellow("Getting routes, containers and screens folders...."));

    const is_containers_folder_exists = filesMethods.directoryExists(`${current_directory}/src/containers`);
    const is_container_exists = filesMethods.directoryExists(`${current_directory}/src/containers/${screen_name}`);
    const is_screens_folder_exists = filesMethods.directoryExists(`${current_directory}/src/screens`);
    const is_screens_already_exists = filesMethods.directoryExists(`${current_directory}/src/screens/${screen_name}`);

    if(is_container_exists)
    {
      console.log(chalk.red("Container already exist"));
      return
    }

    if(is_screens_already_exists)
    {
      console.log(chalk.red("Screen already exist"));
      return
    }

    addNewRoute(screen_name);
    addNewScreen(screen_name);
    addNewContainer(screen_name);
    console.log(chalk.greenBright("Screen added successfully"));
    
  }
  catch (err)
  {
    if(err.code === 'ENOENT')
    {
      console.log(chalk.red("Folders mismatch, this project is not created with Rarch, or missing basic folder structure"))
      return
    }

    console.log(err)
  }
}