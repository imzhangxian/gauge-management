/**
 * Work order type : install-meter
 * Condition : Work order state 2, task step 2 (check)
 * transition on approval : wo -> 3, new task step 3
 * transition on reject : wo -> -1 (rejected), new task null
 * */ 

 const execute = ( wo, task, approval = 'approved', variables = [] ) => {
  console.log('wf install-meter :: approve');
  let newtask = null;
  if ( wo.state === 2 && task.step === 2 && ! task.completed ) {
    if (approval === 'approved') {
      // approve task
      wo.state ++;
      newtask = {
        name: `${wo.name} - finishing`, 
        description: `Finish ${wo.description}`, 
        step: 3, 
        assignee: variables['submitter'], 
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