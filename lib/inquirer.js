const inquirer = require('inquirer');

const choices = [
  'Init', 
  'choice 2', 
  'choice 3'
]

module.exports = {
  startup: () => {
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
        choices
      }
    ];
    return inquirer.prompt(questions);
  },
};