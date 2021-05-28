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

    const is_folder_exists = filesMethods.directoryExists(`${current_directory}/src/components/molecules/${name}`);
    
    if(is_folder_exists)
    {
      console.log(chalk.red("Component already exist"));
      return
    }

    try
    {
      let path = `${process.cwd()}/src/components/molecules/${name}`;

      fs.mkdirSync(path);
      fs.writeFileSync(`${path}/${name}.js`, getContent(name));
      fs.writeFileSync(`${path}/${name}Styles.module.css`, getCssContent());
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
import styles from "./${name}Styles.module.css";


export default function ${capitalizeFirstLetter(name)}(props) 
{
  const {
    className,
    style
  } = props;

  let combined_class_name = [styles.container, className].join(" ");


  return (
    <div 
      className={combined_class_name} 
      style={style}
    >
      you are at ${name} Component
    </div>
  )
}


${capitalizeFirstLetter(name)}.propTypes = {
  /**
   * style object to override some styles in
   * prefer className over styles
   */
  style: PropTypes.object,
  /**
   * class name to apply on element
   */
  className: PropTypes.string
}


${capitalizeFirstLetter(name)}.defaultProps = {
  className: "",
  style: {}
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



function getCssContent()
{
  return (
    `.container
    {

    }
    `
  )
}