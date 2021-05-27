const fs = require('fs');
const chalk = require('chalk');

//utils.
const capitalizeFirstLetter = require('../utils/capitalizeFirstLetter');

module.exports = function(container_name)
{
  try
  {
    let path = `${process.cwd()}/src/containers/${container_name}`;

    fs.mkdirSync(path);
    fs.writeFileSync(`${path}/${container_name}Container.js`, getContent(container_name));
    fs.writeFileSync(`${path}/package.json` , getPackageJsonContent(container_name));
  }
  catch(err)
  {
    console.log(chalk.red(err));
  }
}


function getContent(container_name)
{
  return (
`import PropTypes from 'prop-types';
  
// Screen 
import Screen from "screens/${container_name}";


export default function ${capitalizeFirstLetter(container_name)}() 
{
  return (
    <Screen />
  )
}

${capitalizeFirstLetter(container_name)}.propTypes = {

}


${capitalizeFirstLetter(container_name)}.defaultProps = {

}

`
  )
}


function getPackageJsonContent(container_name)
{
  return (
    `
      {
        "main": "${container_name}Container.js"
      }
    `
  )
}