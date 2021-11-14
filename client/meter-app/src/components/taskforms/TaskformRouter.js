import taskform_mapping from "./TaskformMapping"

async function TaskformRouter(ordertype, taskstep) {
  const module = await import(`./${ordertype}/${taskform_mapping[ordertype][taskstep]}.js`)
  return module
}

export default TaskformRouter
