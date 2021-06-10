import { html } from 'https://unpkg.com/lit-html/lit-html.js';
import { component } from 'https://unpkg.com/haunted/haunted.js';


export default function SearchInput({searchname,searchtitle}) {
    const el = this;

    const dispatch = (el, eventName, data) => {
        let event = new CustomEvent(eventName, {
          detail: data
        });
        el.dispatchEvent(event);
    }

    const handleEvent = (e) => {
        dispatch(el, "event-fired", {"Search":{ [searchname] : e.path[0].value }}) //
    };

    //Connect stylesheets
    const styles = () => html`
        <style>
            @import 'components/search-input.css';
        </style>
    `;

    return html`
        ${styles()}
        <label for="searchname">${searchtitle}</label>
        <input type="text" class="input" 
            name="searchname" id="searchname"
            @keyup=${handleEvent}
        />

    `;
}