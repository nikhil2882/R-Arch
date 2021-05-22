const fs = require("fs");

module.exports.init = function(target_directory)
{
  // creating store folder
  fs.mkdirSync(`${target_directory}/src/store`);

  //copy index file in store
  fs.copyFileSync(
    `${__dirname}/../resourses/redux_store/index.js`, 
    `${target_directory}/src/store/index.js`
  );

  //copy reducer.js , this is the place where we gather all the reducers
  //in app and prepare for combine reducers
  fs.copyFileSync(
    `${__dirname}/../resourses/redux_store/reducers.js`, 
    `${target_directory}/src/store/reducers.js`
  );

  //create enhancers directory
  // this will have all monitoring based functions
  fs.mkdirSync(`${target_directory}/src/store/enhancers`);

  //copy monitor_reducers.js
  fs.copyFileSync(
    `${__dirname}/../resourses/redux_store/monitor_reducers.js`, 
    `${target_directory}/src/store/enhancers/monitor_reducers.js`
  );
  
}