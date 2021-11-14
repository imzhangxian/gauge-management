// create default task
const createDefaultTask = (wo) => {
  return {
    name: `${wo.name} - submitting`, 
    description: `Submitting -  ${wo.description}`, 
    step: wo.state, 
    assignee: wo.created_by
  };
}

module.exports = createDefaultTask;
