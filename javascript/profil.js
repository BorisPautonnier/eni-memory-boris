window.onload = () => {
    const pseudo = document.getElementById("pseudo2");
    const email = document.getElementById("email2");
    const bestScore = document.getElementById("bestScore");
    const data = localStorage.getItem("user");
    const userData = JSON.parse(data);
    pseudo.textContent = userData.pseudo;
    email.textContent = userData.email;
    bestScore.textContent = userData.bestScore;
};

document.getElementById("4x3").addEventListener("change", () => {
    localStorage.setItem("size", "4x3");
});

document.getElementById("4x4").addEventListener("change", () => {
    localStorage.setItem("size", "4x4");
});

document.getElementById("4x5").addEventListener("change", () => {
    localStorage.setItem("size", "4x5");
});

document.getElementById("legumes").addEventListener("change", () => {
    localStorage.setItem("type", "legumes");
});

document.getElementById("animaux").addEventListener("change", () => {
    localStorage.setItem("type", "animaux");
});

document.getElementById("sport").addEventListener("change", () => {
    localStorage.setItem("type", "sport");
});