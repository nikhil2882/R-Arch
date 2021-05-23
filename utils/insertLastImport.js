module.exports = function(file, data_to_insert)
{
  let rows = file.split("\n");
  
  // if no import is in the file then 
  // logic will insert file at 0 location because 
  // we are increamenting location by 1

  let last_known_index = -1;
  
  for(let i = 0; i < rows.length; i++)
  {
    let row = rows[i];

    if( row.includes("import") )
    {
      last_known_index = i;
    }
  }

  rows.splice(last_known_index+1, 0 , data_to_insert);

  if(rows[last_known_index+2] !== "")
  {
    rows.splice(last_known_index+2, 0 , "\n");

  }


  return rows.join("\n");
}