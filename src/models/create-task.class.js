class CreateTask {

  constructor(id, department, headline, description, contacts, priority, dueDate, color, subtasks) {
    this.id = id,
      this.department = department,
      this.headline = headline,
      this.description = description,
      this.assignedTo = contacts,
      this.priority = priority,
      this.category = 'to-do',
      this.dueDate = dueDate,
      this.color = color,
      this.subtasks = subtasks;
    this.pushTask();
  }

  pushTask() {
    tasks.push(this);
  }
}