const inquirer = require('inquirer');


//constants
const constants = require("../constants");

// first promt when we run tool
module.exports.startup = function()
{
  const questions = [
    {
      name: 'action',
      type: 'list',
      message: 'Tell me what you want',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'kya krna chahtai ho tum';
        }
      },
      choices:constants.startup_choices_names
    }
  ];
  return inquirer.prompt(questions);
}


// ask for any input question
module.exports.askForInput = function(message)
{
  const questions = [
    {
      name: 'input',
      type: 'input',
      message: message,
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Khali hai, kuch to type kro';
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}


