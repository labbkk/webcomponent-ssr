import { html, LitElement } from 'lit-element';
import css from './header.css';

class HeaderComponent extends LitElement {

  render() {
    return html`
      <style>
        ${css}
      </style>

      <header>
          <h2><strong>SSR Web component Example App</strong></h2>
          <ul>
            <li>
              <a href="/">Home Page</a>
            </li>
            <li>
              <a href="/docs">Docs Page</a>
            </li>
            <li>
            <a href="/about-ts">About TS</a>
          </li>
          </ul>
      </header>
    `;
  }
}

customElements.define('my-header', HeaderComponent);