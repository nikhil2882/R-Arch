const { execSync } = require("child_process");
const fs = require("fs");

module.exports.init = function(target_directory)
{
  // creating store folder
  fs.mkdirSync(`${target_directory}/src/store`);

  //copy index file in store
  fs.copyFileSync(
    `${process.cwd()}/resourses/redux_store/index.js`, 
    `${target_directory}/src/store/index.js`
  );
  //execSync(`cp ./resourses/base_project/.eslintrc.js ./${app_name}/.eslintrc.js`);
  
}