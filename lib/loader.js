const ora = require("ora");


//example
//ora({ text:"Creating Models", spinner:"weather", prefixText:"old" , indent:8 }).start();

function init(params)
{
  params = { ...init.defaultParams , ... params }  

  return new ora(params);
}

init.defaultParams = { 
  spinner:"weather", 
}

module.exports = init;


