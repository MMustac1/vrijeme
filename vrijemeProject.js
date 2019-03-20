// Your code here!
window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span")
    let body = document.getElementsByTagName("body")[0]

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position)
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`
            const api = `${proxy}https://api.darksky.net/forecast/2cbc11fd670b612b9e41e73f0805b98c/${lat},${long}`
            fetch(api)
                .then(response => {
                    return response.json();
                })
                //main
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently
                   // console.log(data.currently.temperature, summary, icon);
                    //set DOM elements from the API

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Formula for C
                    let celzijus = Math.floor((temperature - 32) * 5 / 9);
                   
                    //set icon iconID je s skycons canvas

                    setIcons(icon, document.querySelector(".icon"))

                    //change temp to c/f textcontent
                    temperatureSection.addEventListener("click", switchCtoF)




                    //celzijus to fahrenheit
                    function switchCtoF() {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = celzijus;
                            body.classList.toggle("hotNcold")

                        }
                        else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                            body.classList.toggle("hotNcold")
                        }
                    }

                    backgroundTemp()
                    function backgroundTemp() {
                        if (temperature <34 || celzijus<=1) {
                            body.classList.toggle("lessThan1")
                        } else if (temperature >35 && temperature < 50 || celzijus < 10 && celzijus >2) {
                            body.classList.toggle("from2to10")
                        }
                    }

                });//ne preći
            
            
        });




    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase()
        skycons.play();//za animiranje
        return skycons.set(iconID, Skycons[currentIcon])
    }

})

