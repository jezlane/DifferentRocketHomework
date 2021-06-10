import { html } from 'https://unpkg.com/lit-html/lit-html.js';


export default function HotelCard({ hoteldata }) {

  //Connect stylesheets
  const styles = () => html`
  <style>
    @import 'components/hotel-card.css';
  </style>
  `;

  //Return html
  return html`
    ${styles()}
    <div class="hotel-card" key="907">
        <div
            class="image"
            style="background-image: url(${hoteldata.hotelStaticContent.mainImage.url}), url(../images/hotel.svg)">
        </div>
        <div class="hotel-details">
            <div class="hotel-name">
                ${hoteldata.hotelStaticContent.name}
            </div>
            <div class="location">
                ${hoteldata.hotelStaticContent.neighborhoodName}
            </div>
        </div>
        <div class="price-details">
            <span class="price">
                $${hoteldata.lowestAveragePrice.amount}
            </span>
            <span class="rewards">
                ${hoteldata.rewards.miles} miles
            </span>
            <button class="button">Select</button>
        </div>
    </div>
  `;
}
