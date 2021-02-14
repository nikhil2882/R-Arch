const fs = require("fs");


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