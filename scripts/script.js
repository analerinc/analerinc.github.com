var myFullpage = new fullpage("#fullpage", {
    menu: "#menu",
    navigation: true,
    verticalCentered: false,
    navigationPosition: "left",
    navigationTooltips: ['HOME', 'ABOUT', 'WORK', 'CONTACT'],
    showActiveTooltip: true,
    anchors: ["home", "about", "work", "contact"],
    controlArrows: false
})

document.getElementById("next-arrow").onclick = function() {
    myFullpage.moveSlideRight();
}
document.getElementById("previous-arrow").onclick = function() {
    myFullpage.moveSlideLeft();
}

function hideArrows() {
    if(window.location.hash.split("/")[1] === undefined) {
        document.getElementById("previous-arrow").style.visibility = "hidden";
    } else {
        document.getElementById("previous-arrow").style.visibility = "visible";
    }

    if(parseInt(window.location.hash.split("/")[1]) + 1 === document.getElementsByClassName("slide").length){
        document.getElementById("next-arrow").style.visibility = "hidden";
    } else {
        document.getElementById("next-arrow").style.visibility = "visible";
    }
}


const links = ["home-link", "about-link", "work-link", "contact-link"];

function changeActiveLink() {
    for(const link of links){
        if(link.split("-")[0] === window.location.hash.split("/")[0].substr(1)) {
            document.getElementById(link).classList.add("active");
        } else {
            document.getElementById(link).classList.remove("active");
        }
    }
}
window.onhashchange = () => {

    changeActiveLink();
    hideArrows();
} 
window.onload = () => {
    changeActiveLink();
    hideArrows();
}

function contact(form) {
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        alert("Please fill all fields");
        return false;
    }

    const data = {
        name,
        email,
        message
    }

    fetch("http://139.59.157.37:8080/api/contact", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.status === 201) {
            alert("Message sent!")
        } else {
            alert("Unknown error");
        }
        return res.json();
    });

    return false;
}
