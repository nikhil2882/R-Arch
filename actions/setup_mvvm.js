const fs = require("fs");

const loader = require("../lib/loader");

const mainLoader = loader({
  text:"sfs",
  
});

mainLoader.start()
module.exports = async function()
{
  try
  {
    //await fs.mkdirSync(process.cwd()+"/model");
  }
  catch(e)
  {
    console.log(e);
  }
}