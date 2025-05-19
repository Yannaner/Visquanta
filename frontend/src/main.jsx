import LandingPage from './Landingpage/LandingPage.jsx';

const { createElement } = window.React;
const { createRoot } = window.ReactDOM;

createRoot(document.getElementById('root')).render(createElement(LandingPage));
