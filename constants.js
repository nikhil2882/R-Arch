const startup_choices_values  = {
  init_new_project: "init_new_project",
  create_new_screen: "create_new_screen",
  create_new_model: "create_new_model",
  create_new_atom: "create_new_atom",
  create_new_molecule: "create_new_molecule",
  create_new_organism: "create_new_organism",

}

const startup_choices = [
  {
    name:'Create New Project',
    value: startup_choices_values.init_new_project
  }, 
  {
    name:'Create New Screen',
    value:startup_choices_values.create_new_screen,
  }, 
  {
    name:"Create New Model",
    value:startup_choices_values.create_new_model
  },
  {
    name:"Create New Atom",
    value:startup_choices_values.create_new_atom
  },
  {
    name:"Create New Molecule",
    value:startup_choices_values.create_new_molecule
  },
  {
    name:"Create New Organism",
    value:startup_choices_values.create_new_organism
  }
]


const modules_to_install_in_fresh_projects = [
  'redux', 
  'react-redux', 
  'react-router-dom',
  'redux-thunk',
  'redux-logger',
  'redux-devtools-extension'
]


module.exports = {
  startup_choices_values,
  startup_choices,
  modules_to_install_in_fresh_projects
}


