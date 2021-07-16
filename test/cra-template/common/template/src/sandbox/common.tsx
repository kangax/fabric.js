import React from 'react';
import { Button } from 'react-bootstrap';
import { openIDE } from './hooks';

const template = process.env.REACT_APP_TEMPLATE;

export const OpenIDE = React.memo(() => <Button variant="link" onClick={openIDE}><code>./src/App.{template === 'ts' ? 'tsx' : 'js'}</code></Button>);