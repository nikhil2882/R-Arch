const { spawn, execSync } = require("child_process");

// need to create files related methods in lib/files
const fs = require("fs");


const loader = require("../lib/loader");
const shouldUseYarn = require("../lib/should_use_yarn");

const { modules_to_install_in_fresh_projects } = require("../constants");

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
          let packages_to_install = modules_to_install_in_fresh_projects
                                    .join(" ");

          execSync(`${package_manager_to_use} ${packages_to_install}`, { cwd: `${cwd}/${app_name}` })

          creatingReactAppLoader.text = "Dependency installed successfully ...";

          creatingReactAppLoader.stop();

          fs.copyFileSync(
            `./resourses/base_project/.eslintrc.js`,
            `./${app_name}/.eslintrc.js`
          );
          
          fs.copyFileSync(
            `./resourses/base_project/.prettierrc.js`,
            `./${app_name}/.prettierrc.js`
          );

          fs.copyFileSync(
            `./resourses/base_project/jsconfig.json`,
            `./${app_name}/jsconfig.json`
          );

          fs.copyFileSync(
            `./resourses/base_project/serviceWorker.js`,
            `./${app_name}/src/serviceWorker.js`
          );
          
          fs.mkdirSync(`${cwd}/${app_name}/src/api`);
          fs.mkdirSync(`${cwd}/${app_name}/src/containers`);
          fs.mkdirSync(`${cwd}/${app_name}/src/models`);
          //fs.mkdirSync(`${cwd}/${app_name}/src/view_models`);
          fs.mkdirSync(`${cwd}/${app_name}/src/components`);
          fs.mkdirSync(`${cwd}/${app_name}/src/components/atoms`);
          fs.mkdirSync(`${cwd}/${app_name}/src/components/molecules`);
          fs.mkdirSync(`${cwd}/${app_name}/src/components/organisms`);
          fs.mkdirSync(`${cwd}/${app_name}/src/screens`);
          fs.mkdirSync(`${cwd}/${app_name}/src/partials`);
          
    
          fs.mkdirSync(`${cwd}/${app_name}/src/routes`);

          fs.copyFileSync(
            `./resourses/base_project/routes/index.js`,
            `./${app_name}/src/routes/index.js`
          );

          
          fs.mkdirSync(`${cwd}/${app_name}/src/settings`);
          
          fs.copyFileSync(
            `./resourses/base_project/settings/style.js`,
            `./${app_name}/src/settings/style.js`
          );

          fs.copyFileSync(
            `./resourses/base_project/settings/main.css`,
            `./${app_name}/src/settings/main.css`
          );

          const index_file_data = fs.readFileSync("./resourses/base_project/index.js", "utf8");

          fs.writeFileSync(`./${app_name}/src/index.js`, index_file_data);

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

