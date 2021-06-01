const filesMethods = require('../lib/files');
const chalk = require('chalk');

const insertLastImport = require('../utils/insertLastImport');
const addSubStringToString = require('../utils/addSubStringToString');
const capitalizeFirstLetter = require('../utils/capitalizeFirstLetter');

module.exports = function(container_name)
{
  try
  {
    let current_directory = process.cwd();

    const route_file = filesMethods.readFileSync(`${current_directory}/src/routes/index.js`);

    let routes_string = addRouteInFile(route_file, container_name);

    filesMethods.writeFileSync( `${current_directory}/src/routes/index.js` , routes_string);
    

  }
  catch (err)
  {
    if(err.code === 'ENOENT')
    {
      console.log(chalk.red("Folders mismatch, this project is not created with Rarch, or missing basic folder structure"))
      return
    }

    console.log(err);
  }

}


function addRouteInFile(string, container_name)
{
  let starting_point = [];
  let first_occurrence  = 0;
  let last_occurrence = 0;

  let route_template = `{
    path:"/${container_name}",
    component:${capitalizeFirstLetter(container_name)},
    exact:true,
    icon:null,
    text:"${capitalizeFirstLetter(container_name)}"
  }`

  for( let i=0; i<string.length; i++ )
  {
    if(string[i] === "[")
    {
      starting_point.push(i);

      if(!first_occurrence)
      {
        first_occurrence = i;
      }

    }
    else if(string[i] === "]")
    {
      if(starting_point.length === 1)
      {
        // this is the point to cut
        last_occurrence = i;
        break;
        
      }
      else
      {
        starting_point.pop();
      }
    }
  }


  if(first_occurrence === last_occurrence)
  {
    throw new Error(`No Array found in route file, 
    check routes/index.js, that should contain a default export of a array`)
  }

  let routes_array = arrayFromString(string);

  let new_routes_string = string;

  if(new_routes_string[last_occurrence-1] === "[")
  {
    new_routes_string = addSubStringToString(new_routes_string, last_occurrence, 0, " ");
    last_occurrence++;
  }


  if(routes_array.length)
  {    
    new_routes_string = addSubStringToString(new_routes_string, last_occurrence-1, 0, ",");
    last_occurrence++;
    new_routes_string = addSubStringToString(new_routes_string, last_occurrence-1, 0, "\n");
    last_occurrence++;
  }
 
 
  // my current vscode tab is for 5 spaces but cant control \t command
  // adding up 5 spaces to maintain formatting
  // this should done by prettier
  /* new_routes_string = addSubStringToString(new_routes_string, last_occurrence-1, 0, "\t");
  last_occurrence++; */

  new_routes_string = addSubStringToString(new_routes_string, last_occurrence-1, 0, route_template);

  new_routes_string = insertLastImport(
    new_routes_string, 
    `import ${capitalizeFirstLetter(container_name)} from "containers/${container_name}";`
  )

  return new_routes_string;
}


function arrayFromString(string)
{
  let starting_point = [];
  let first_occurrence  = 0;


  for( let i=0; i<string.length; i++ )
  {
    if(string[i] === "[")
    {
      starting_point.push(i);

      if(!first_occurrence)
      {
        first_occurrence = i;
      }

    }
    else if(string[i] === "]")
    {
      if(starting_point.length === 1)
      {
        // this is the point to cut

        try
        {
          return JSON.parse(string.slice(first_occurrence, i +1 ));
        }
        catch(err)
        {
          return [{}];
        }
      }
      else
      {
        starting_point.pop();
      }
    }
  }
}
