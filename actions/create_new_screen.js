const fs = require('fs');
const chalk = require('chalk');

//utils.
const capitalizeFirstLetter = require('../utils/capitalizeFirstLetter');

module.exports = function(screen_name)
{
  try
  {
    let path = `${process.cwd()}/src/screens/${screen_name}`;

    fs.mkdirSync();
    fs.writeFileSync(getContent(screen_name),`${path}/${screen_name}Screen.js`);
    fs.writeFileSync("",`${path}/styles.module.css`);
    fs.writeFileSync(getPackageJsonContent(screen_name),`${path}/package.json`);
  }
  catch(err)
  {
    console.log(chalk.red(err));
  }
}


function getContent(name)
{
  return (
    `
      import React from 'react'
      
      // Screen 
      import styles from "./styles.module.css";


      export default function ${capitalizeFirstLetter(name)}() 
      {
        return (
          <div>you are at ${name} screen</div>
        )
      }
    `
  )
}


function getPackageJsonContent(name)
{
  return (
    `
      {
        "main": "${name}Screen.js"
      }
    `
  )
}