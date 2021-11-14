/**
 * Work order type : install-meter
 * Condition : Work order state 1, task step 1 (check)
 * transition on approval : wo -> 2, new task step 2
 * transition on reject : wo -> -1 (rejected), new task null
 * */ 

 const execute = ( wo, task, approval = 'approved', variables = [] ) => {
  console.log('wf install-meter :: check');
  let newtask = null;
  if ( wo.state === 1 && task.step === 1 && ! task.completed ) {
    if (approval === 'approved') {
      // approve task
      wo.state ++; // task dependent
      newtask = {
        name: `${wo.name} - approving`, 
        description: `Approve ${wo.description}`, 
        step: 2, 
        assignee: variables['approver'], 
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