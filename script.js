"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
            
            const coords = [latitude, longitude];
            // L is the namespace for leaflet
            const map = L.map("map").setView(coords, 13);
            console.log(map);
            
            L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);
            
            
            // Leaflet code library
            map.on('click', function(mapEvent) {
                const {lat, lng} = mapEvent.latlng;
                const mapIcon = L.icon({
                    iconUrl: 'my-icon.png',
                    iconSize: [38, 95],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                    shadowUrl: 'my-icon-shadow.png',
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94]
                });
                const mapPopup = L.popup({
                    maxWidth: 250,
                    minWidth: 200,
                    autoClose: false,
                    closeOnClick: false,
                    className: 'running-popup',
                })
                console.log(lat, lng);
                L.marker([lat, lng,]).addTo(map).bindPopup(mapPopup).setPopupContent('Workout').openPopup();
            })
        },
        function () {
                alert("Could not get your position");
        }
    );
