let hoteldataSource = "";

//Fetch Hotel Data in JOSN format
async function fetchData() {
    let response = await fetch('/data/rest-rates-formatted.JSON');
    let data = await response.json();
    let hoteldata = await data.results.hotels;
    hoteldataSource = {hotels: hoteldata};
    setHotelData(hoteldata);
}
fetchData();

//Apply hoteldata to <hotel-list> Attribute
const setHotelData = (hoteldata) => {
    let hl = document.querySelector("hotel-list");
    hl.setAttribute("hoteldata", JSON.stringify(hoteldata)); 
};

//Filter data based on criteria
const filterHotelData = (hoteldata, filterdata) => {
    let searchStr = "";
    let sortStr = "=";
    const sortOperators = {
        "lth": ">",
        "htl": "<",
        "def": "="
    };

    if (filterdata?.search) {
        Object.entries(filterdata.search).forEach((entry) => {
            const [key, value] = entry;
            if (key === "name" && value !== "") {
                searchStr = value;
            }
        })
    }
    if (filterdata?.sort) {
        Object.entries(filterdata.sort).forEach((entry) => {
            const [key, value] = entry;
            if (key === "price") {
                sortStr = sortOperators[value];
            }
        })
    }

    let query = `({
        "hotels": 
            $sort(
                $filter(hotels, function($v) {
                    $contains($lowercase($v.hotelStaticContent.name), $lowercase("${searchStr}"))
                }),
                function($l, $r) {
                    $l.lowestAveragePrice.amount ${sortStr} $r.lowestAveragePrice.amount
                }
            )
    })`;

    let result = jsonata(query).evaluate(hoteldataSource);
    setHotelData(result.hotels);

};


//Setup an observer on <hotel-filter>
let hFilter = document.querySelector("hotel-filter");
let observer = new MutationObserver(filterCallback);

function filterCallback (mutations) {
    for (let mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === "filterdata") {
            filterHotelData(hoteldataSource, JSON.parse(mutation.target.filterdata));
        }
    }
}

observer.observe(hFilter, { attributes: true });
