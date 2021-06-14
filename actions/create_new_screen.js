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
    fs.writeFileSync(`${path}/${screen_name}Styles.module.css`, getCssContent());
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
`import { memo } from 'react';
import PropTypes from 'prop-types'

// Screen Template styles 
import styles from "./${name}Styles.module.css";


function ${capitalizeFirstLetter(name)}() 
{
  return (
    <div className={styles.container}>you are at ${name} screen</div>
  )
}


${capitalizeFirstLetter(name)}.propTypes = {

}


${capitalizeFirstLetter(name)}.defaultProps = {

}

export default memo(${capitalizeFirstLetter(name)})
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

function getCssContent()
{
  return (
`.container
{

}
`
  )
}