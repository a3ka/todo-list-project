import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { App } from '../App';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import { ReduxStoreProviderDecorator } from '../state/ReduxStoreProviderDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLISTS/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof App> = (args) => <Provider store={store}> <App /> </Provider> ;
const Template: ComponentStory<typeof App> = (args) => <App />  ;

export const Apptory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Apptory.args = {}



