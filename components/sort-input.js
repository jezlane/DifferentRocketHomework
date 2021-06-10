import { html } from 'https://unpkg.com/lit-html/lit-html.js';
import { component } from 'https://unpkg.com/haunted/haunted.js';



export default function SortInput({sortname,sorttitle}) {
    const el = this;

    const dispatch = (el, eventName, data) => {
        let event = new CustomEvent(eventName, {
          detail: data
        });
        el.dispatchEvent(event);
    }

    const handleEvent = (e) => {
        dispatch(el, "event-fired", {"Sort": { [sortname] : e.path[0].value }}) 
    };

    //Connect stylesheets
    const styles = () => html`
        <style>
            @import 'components/sort-input.css';
        </style>
    `;

    return html`
        ${styles()}
        <label for="sortprice">${sorttitle}</label>
        <select name="sortprice" id="sortprice" 
            class="select" style="width:100%;"
            @change=${handleEvent}
        >
            <option value="def">Recommended</option>
            <option value="lth">${sorttitle} low-to-high</option>
            <option value="htl">${sorttitle} high-to-low</option>
        </select>

    `;
}