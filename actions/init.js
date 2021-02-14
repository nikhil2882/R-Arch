const loader = require("../lib/loader");

const { exec } = require("child_process");

module.exports = function()
{

  const creatingReactAppLoader = loader();

  creatingReactAppLoader.text = "Creating React App ...";
  creatingReactAppLoader.start();

  /* exec("npx create-react-app myapp", function(err, stdout, stderr)
  {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
  }) */

  
  
}

