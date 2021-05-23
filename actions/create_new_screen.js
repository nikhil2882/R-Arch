const fs = require('fs');
const chalk = require('chalk');

//utils.
const capitalizeFirstLetter = require('../utils/capitalizeFirstLetter');

module.exports = function(screen_name)
{
  try
  {
    let path = `${process.cwd()}/src/screens/${screen_name}`;

    fs.mkdirSync(path);
    fs.writeFileSync(`${path}/${screen_name}Screen.js`, getContent(screen_name));
    fs.writeFileSync(`${path}/styles.module.css`, "");
    fs.writeFileSync(`${path}/package.json`, getPackageJsonContent(screen_name));

  }
  catch(err)
  {
    console.log(err);
  }
}


function getContent(name)
{
  let template =  (
`import React from 'react'

// Screen Template styles 
import styles from "./styles.module.css";


export default function ${capitalizeFirstLetter(name)}() 
{
  return (
    <div>you are at ${name} screen</div>
  )
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
        "main": "${name}Screen.js"
      }
    `
  )
}