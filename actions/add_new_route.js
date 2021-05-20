const filesMethods = require('../lib/files');
const chalk = require('chalk');


module.exports = function(container_name)
{
  try
  {
    let current_directory = process.cwd();

    const route_file = filesMethods.readFileSync(`${current_directory}/src/routes/index.js`);

    arrayFromString(route_file)

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

        
        console.log(string.slice(first_occurrence, i +1 ));
      }
      else
      {
        starting_point.pop();
      }
    }
  }
}


