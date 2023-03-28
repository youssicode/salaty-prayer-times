import GoogleMapGeoAPIkey from "./apiKeys.js";

//* Deal With The Result

//         if (results[0]) {
//             var city = "";
//             var state = "";
//             var country = "";
//             var zipcode = "";

//             var address_components = results[0].address_components;

//             for (var i = 0; i < address_components.length; i++) {
//                 if (address_components[i].types[0] === "administrative_area_level_1" && address_components[i].types[1] === "political") {
//                     state = address_components[i].long_name;
//                 }
//                 if (address_components[i].types[0] === "locality" && address_components[i].types[1] === "political") {
//                     city = address_components[i].long_name;
//                 }

//                 if (address_components[i].types[0] === "postal_code" && zipcode == "") {
//                     zipcode = address_components[i].long_name;

//                 }

//                 if (address_components[i].types[0] === "country") {
//                     country = address_components[i].long_name;

//                 }
//             }
//             var address = {
//                 "city": city,
//                 "state": state,
//                 "country": country,
//                 "zipcode": zipcode,
//             };
//             console.log(address);
//         }
//         else {
//             window.alert('No results found');
//         }

//* Geocoding API

// export async function getAdresse(lat, long) {
//     try {
//         let latLongUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GoogleMapGeoAPIkey}&sensor=false`;
//         let response = await axios({
//             method: "GET",
//             url: latLongUrl,
//         })
//         console.log(response.data.results) //! Rmove
//         let tempCiticName = response.data.results.at(-4).formatted_address
//         let tempCountryShortName = tempCiticName.slice(tempCiticName.indexOf(",") + 2)
//         let zoneResult = {
//             countryLongName: response.data.results.at(-1).formatted_address,
//             cityLongName: tempCiticName.slice(0, tempCiticName.indexOf(",")),
//             countryShortName: tempCountryShortName.length == 2 ? tempCountryShortName : "" // If the response provide a country short name, save it. If not save empty value
//         }
//         return zoneResult
//     } catch (err) {
//         throw err
//     }
// }