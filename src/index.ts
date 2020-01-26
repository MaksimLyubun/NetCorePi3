import * as signalR from "@aspnet/signalr";

const pinArray = [12, 24, 25];
const refreshTime = 1000;
var pin12Status = false;
var pin24Status = false;
var pin25Status = false;
var showScary = false;

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

connection.on("messageReceived12", (status: string) => {
    pin12Status = status == "High";
});

connection.on("messageReceived24", (status: string) => {
    pin24Status = status == "High";
});

connection.on("messageReceived25", (status: string) => {
    pin25Status = status == "High";
    refreshImg();
});

connection.start().catch(err => document.write(err));

pinArray.forEach(pin => {
    setInterval(() => getStatus(pin), refreshTime);
})

function refreshImg() {
    let count = 0;
    let element = document.getElementById("img") as HTMLImageElement;

    if (pin12Status) count++;
    if (pin24Status) count++;
    if (pin25Status) count++;

    switch (count) {
        case 0:
            element.src = "https://priscree.ru/img/35ed9b99282359.png";
            if (!showScary) {
                showScary = true;
                let scaryElement = document.getElementById("scaryImg") as HTMLImageElement;
                scaryElement.style.visibility = "visible";
                setTimeout(() => scaryElement.style.visibility = "hidden", 5000);
            }
            break;
        case 1:
            element.src = "https://priscree.ru/img/47034cdd9fe8b1.png";
            showScary = false;
            break;
        case 2:
            element.src = "https://priscree.ru/img/d758d668535106.png";
            showScary = false;
            break;
        case 3:
            element.src = "https://priscree.ru/img/e4baa1794ce417.png";
            showScary = false;
            break;
        default:
            break;
    }
}

function getStatus(pin) {
    console.log("get statis" + pin);
    connection.send("status", pin);
}
