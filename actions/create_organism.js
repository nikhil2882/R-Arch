const chalk = require('chalk');
const fs = require('fs');


const filesMethods = require('../lib/files');

//utils
const capitalizeFirstLetter = require('../utils/capitalizeFirstLetter');


module.exports = function(name)
{
  let current_directory = process.cwd();

  if(name.includes("-") || name.includes("_"))
  {
    console.log(chalk.red("Please enter name in CamelCasing"));
    return;
  }

  try
  {
    console.log(chalk.yellow("checking if already exist ....."));

    const is_folder_exists = filesMethods.directoryExists(`${current_directory}/src/components/organisms/${name}`);
    
    if(is_folder_exists)
    {
      console.log(chalk.red("Component already exist"));
      return
    }

    try
    {
      let path = `${process.cwd()}/src/components/organisms/${name}`;

      fs.mkdirSync(path);
      fs.writeFileSync(`${path}/${name}.js`, getContent(name));
      fs.writeFileSync(`${path}/styles.module.css`, "");
      fs.writeFileSync(`${path}/package.json`, getPackageJsonContent(name));

    }
    catch(err)
    {
      console.log(err);
    }
    
    console.log(chalk.greenBright("Component added successfully"));
    
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



function getContent(name)
{
  let template =  (
`import PropTypes from 'prop-types';

// Component styles 
import styles from "./styles.module.css";


export default function ${capitalizeFirstLetter(name)}(props) 
{
  return (
    <div>you are at ${name} Component</div>
  )
}


${capitalizeFirstLetter(name)}.propTypes = {

}


${capitalizeFirstLetter(name)}.defaultProps = {

}

`
  )

  return template;
}


function getPackageJsonContent(name)
{
  return (
    `
      {
        "main": "${name}.js"
      }
    `
  )
}