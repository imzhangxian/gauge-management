/**
 * Work order type : install-meter
 * Condition : Work order state 0, task step 0 (initial)
 * transition on approval : wo -> 1, new task step 1
 * transition on reject : wo -> -1 (rejected), new task null
 * */ 

const execute = ( wo, task, approval = 'approved', variables ) => {
  console.log('wf install-meter :: init');
  let newtask = null;
  if ( wo.state === 0 && task.step === 0 && ! task.completed ) {
    if (approval === 'approved') {
      // approve task
      wo.state ++; // task dependent
      newtask = {
        name: `${wo.name} - checking`, 
        description: `Check ${wo.description}`, 
        step: 1, 
        assignee: variables['checker'], 
        variables: variables
      };
    } else if (approval === 'rejected') {
      // reject task
      wo.state = -1;
    }
    task.completed = true;
  }
  return wo, task, newtask;
}

module.exports = execute;