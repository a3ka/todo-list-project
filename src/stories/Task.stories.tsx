import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { Task } from '../components/Task';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLISTS/Task',
  component: Task,
  args: {
    deleteTask: action ("Delete Task"),
    renameTodolistTask: action ("Change TodoList"),
    changeTaskStatus: action ("Change TaskStatus"),
    todolistID: "adasfdsalj"
  }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
  task: {id: '12', isDone: true, title: 'JS'},
};

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
  task: {id: '112', isDone: false, title: 'CSS'},
};




