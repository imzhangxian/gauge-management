
async function TaskformRouter(ordertype, taskstep) {
  // return default taskform if not found
  let module
  try {
    let taskform_mapping = await import('./TaskformMapping')
    let mapping = taskform_mapping.default
    module = await import(`./${ordertype}/${mapping[ordertype][taskstep]}`)
  } catch (e) {
    console.log(e)
    module = await import('./DefaultTaskform')
  }
  return module
}

export default TaskformRouter
