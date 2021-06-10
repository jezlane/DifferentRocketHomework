import { html } from 'https://unpkg.com/lit-html/lit-html.js';
import { component, useState, useEffect } from 'https://unpkg.com/haunted/haunted.js';

import SearchInput from './search-input.js'
customElements.define('search-input', component(SearchInput));

import SortInput from './sort-input.js'
customElements.define('sort-input', component(SortInput));


export default function Filter({ filterdata }) {
    const [search, setSearch] = useState({});
    const [sort, setSort] = useState({});

    useEffect(() => {
        let datamessage = {
            search: search,
            sort: sort
        };
        this.setAttribute('filterdata', JSON.stringify(datamessage));
      }, [search, sort]);

    const searches = [
        {name: "name", title: "Hotel name"}
    ];
    const sorts = [
        {name: "price", title: "Price"}
    ];

    const handleCallback = (e) => {
        if (e.detail?.Sort) {
            Object.keys(e.detail?.Sort).forEach(key => {
                setSort({
                    ...sort,
                    [key]: e.detail?.Sort[key]
                });
            });
        } else if (e.detail?.Search) {        
            Object.keys(e.detail?.Search).forEach(key => {
                setSearch({
                    ...search,
                    [key]: e.detail?.Search[key]
                });
            });
        } 
      };

    //Connect stylesheets
    const styles = () => html`
        <style>
            @import 'components/hotel-filter.css';
        </style>
    `;
    return html`
        ${styles()}
        <div class="filters">
            <search-input 
                .searchname=${searches[0].name} 
                .searchtitle=${searches[0].title}
                @event-fired=${handleCallback}
                >
            </search-input>

            <sort-input 
                .sortname=${sorts[0].name} 
                .sorttitle=${sorts[0].title}
                @event-fired=${handleCallback}
                >
            </sort-input>

            <button class="button" @click=${handleCallback}>Reset</button>
        </div>
    `;
}


Filter.observedAttributes = ["filterdata"];
customElements.define('hotel-filter', component(Filter));