import { html } from 'https://unpkg.com/lit-html/lit-html.js';
import { component } from 'https://unpkg.com/haunted/haunted.js';

import HotelCard from './hotel-card.js'
customElements.define('hotel-card', component(HotelCard));

export default function Counter({ cardnumber, hoteldata }) {
    let data = [];
    if (hoteldata !== "undefined") {
        data = JSON.parse(hoteldata);
    }

    let hotelCards = [];
    let numHotels = cardnumber < data.length ? cardnumber : data.length;

    for (let i = 0; i < numHotels; i++) {
        hotelCards[i] = html`<hotel-card .hoteldata=${data[i]}></hotel-card>`;
      }

    return (numHotels > 0) ? 
        html`
            ${hotelCards.map(value => (value))}
        `: 
        "Sorry no results";
;
}

Counter.observedAttributes = ["cardnumber","hoteldata"];
customElements.define('hotel-list', component(Counter));
