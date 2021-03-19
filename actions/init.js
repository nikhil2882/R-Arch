const { spawn, execSync } = require("child_process");
const fs = require("fs");


const loader = require("../lib/loader");
const shouldUseYarn = require("../lib/should_use_yarn");

const constants = require("../constants");

const store = require("./redux_store");

module.exports = function(app_name)
{
  const cwd = process.cwd();

  const creatingReactAppLoader = loader();

  creatingReactAppLoader.text = "Initiating React App ...";
  creatingReactAppLoader.start();

  // using CRA to create react app
  const reactAppCommand = spawn("npx",["create-react-app",app_name]);
 
  reactAppCommand.stdout.on("data", data => {
    //console.log(`${data}`);
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

      if(code === 0)
      {
        creatingReactAppLoader.succeed("Creation of React App Succeeded");
        
        // switiching to project dir so that we can 
        //install additional dependecnies 
        creatingReactAppLoader.text = "Switiching Directory ...";
        creatingReactAppLoader.start();
        
  
        // installing additonal dependencies
        const package_manager_to_use = shouldUseYarn() ? "yarn add" : "npm install --save";

        creatingReactAppLoader.text = "Installing dependencies ...";
        
        try
        {
          let packages_to_install = constants.modules_to_install_in_fresh_projects
                                    .join(" ");

          execSync(`${package_manager_to_use} ${packages_to_install}`, { cwd: `${cwd}/${app_name}` })

          creatingReactAppLoader.text = "Dependency installed successfully ...";

          creatingReactAppLoader.stop();

          fs.copyFileSync(
            `cp ./resourses/base_project/.eslintrc.js`,
            `./${app_name}/.eslintrc.js`
          );
          
          fs.copyFileSync(
            `cp ./resourses/base_project/.prettierrc.js`,
            `./${app_name}/.prettierrc.js`
          );

          fs.copyFileSync(
            `cp ./resourses/base_project/jsconfig.json`,
            `./${app_name}/jsconfig.json`
          );
          
          store.init(`${cwd}/${app_name}`);        

        }
        catch(error)
        {
          creatingReactAppLoader.stop();

          console.log(error);
        }
      }

  });
 
  
  

}

