import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from '@storybook/addon-actions'

import { AddForm } from '../components/AddForm/AddForm';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLISTS/AddForm',
  component: AddForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    callback: {
      description: 'callback for adding type'
    }
  }
} as ComponentMeta<typeof AddForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddForm> = (args) => <AddForm {...args} />;

export const AddFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddFormStory.args = {
  callback: action('Button clicked inside form')
}



