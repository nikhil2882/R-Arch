const loader = require("../lib/loader");

const { spawn } = require("child_process");

module.exports = function()
{
  const creatingReactAppLoader = loader();

  creatingReactAppLoader.text = "Initiating React App ...";
  creatingReactAppLoader.start();

  
  const reactAppCommand = spawn("npx",["create-react-app","my_app"]);
 
  reactAppCommand.stdout.on("data", data => {
    console.log(`${data}`);
  });

  reactAppCommand.stderr.on("data", data => {
    console.log(`${data}`);    
    creatingReactAppLoader.stop();
  });

  reactAppCommand.on('error', (error) => {
      console.log(error);
      creatingReactAppLoader.fail(error.message);
  });

  reactAppCommand.on("close", code => {
      creatingReactAppLoader.succeed("Creation of React App Succeeded");
  });
  
}

