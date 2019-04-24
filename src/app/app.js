import { html, LitElement } from 'lit-element';
import css from './app.css';
import '../components/header/header';
import '../pages/home/home';
// import '../pages/docs/docs';
import '../pages/about/about';
import { connectRouter } from 'lit-redux-router';
import store from './store.js';
import '../components/loading';
// import { connect } from 'pwa-helpers/connect-mixin.js';

connectRouter(store);

class app extends LitElement {
  render() {
    return html`
    <style>
      ${css}
    </style>
      <my-header></my-header>
      <lit-route path="/" component="home-page"></lit-route>
      <lit-route path="/about-ts" component="about-page"></lit-route>
      <lit-route
        path="/docs"
        component="docs-page"
        loading="my-loading"
        .resolve="${() => import('../pages/docs/docs.js')}"
      ></lit-route>
    `;
  }
}

customElements.define('my-app', app);