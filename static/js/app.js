function toggleBtn() {
    const joinWrap = document.getElementById("joinWrap");
    const joinBtn = document.getElementById("joinBtn");
    if(joinWrap.style.display !=='none') {
        joinWrap.style.display = 'none';
        joinBtn.style.display = 'block';
    } else {
        joinWrap.style.display = 'block';
        joinBtn.style.display = 'none';
    }
}

