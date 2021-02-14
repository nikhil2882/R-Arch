const inquirer = require('inquirer');

module.exports = {
  startup: () => {
    const questions = [
      {
        name: 'action',
        type: 'input',
        message: 'Tell me what you want',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'kya krna chahtai ho tum';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
};