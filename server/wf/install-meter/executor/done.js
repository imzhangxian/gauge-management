/**
 * Work order type : install-meter
 * Condition : Work order state 3, task step 3 (finish)
 * transition on approval : wo -> -2 (finished), new task null
 * transition on reject : wo -> -1 (rejected), new task null
 * */ 

 const execute = ( wo, task, approval = 'approved', variables = [] ) => {
  console.log('wf install-meter :: done');
  let newtask = null;
  if ( wo.state === 3 && task.step === 3 && ! task.completed ) {
    if (approval === 'approved') {
      // approve task
      wo.state = -2; // -2 means 'finished'
      // TODO: add a new meter (wait framework to support)
    } else if (approval === 'rejected') {
      // reject task
      wo.state = -1;
    }
    task.completed = true;
  }
  return wo, task, newtask;
}

module.exports = execute;