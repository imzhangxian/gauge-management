import taskform_mapping from "./TaskformMapping"

async function TaskformRouter(ordertype, taskstep) {
  // return default taskform if not found
  let module
  try {
    module = await import(`./${ordertype}/${taskform_mapping[ordertype][taskstep]}.js`)
  } catch (e) {
    module = await import('./DefaultTaskform')
  }
  return module
}

export default TaskformRouter
