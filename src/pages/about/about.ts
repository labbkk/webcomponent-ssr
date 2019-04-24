import { LitElement, html, customElement, property } from 'lit-element';
const styles = require('./about.css');

@customElement('about-page')
    export class MyElement extends LitElement {
      @property()
      mood = 'great';

      render() {
        return html`
        <style>${styles}</style>
        <p>About TS Page</p>
            
        `;
      }
 
    }
