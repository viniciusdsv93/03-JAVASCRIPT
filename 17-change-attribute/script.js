function changeImage(fileName, animalName) {
    document.querySelector(".image").setAttribute('src', fileName);
    document.querySelector(".image").setAttribute('animal', animalName);
}

function getName() {
    let animalName = document.querySelector(".image").getAttribute('animal');
    alert(animalName);
}