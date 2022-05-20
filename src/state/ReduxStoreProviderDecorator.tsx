import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import {
    ReactElement
} from "../../../../WebStorm-213.6777.57/plugins/JavaScriptLanguage/jsLanguageServicesImpl/external/react";


export const ReduxStoreProviderDecorator = (storyFN: ()=> ReactElement) => {
    return <Provider store={store}>{storyFN()}</Provider>
}