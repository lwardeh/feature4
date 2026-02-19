
// Main entry point for the Mahalee application
// Initializes Preact and renders the App component

import { h, render } from 'preact';
import App from './components/App';

// Render the App component into the root element
render(<App />, document.getElementById('app'));