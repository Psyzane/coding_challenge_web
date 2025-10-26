const b = document.getElementById('b');

const handleOnMouseMove = (e) => {
    const p = e.clientX / window.innerWidth * 100;

    if (b.style.transitionDuration != '20ms'){
        b.style.transitionDuration = '20ms';
    }
    b.style.width = `${p}%`;
}

document.onmousemove = e => handleOnMouseMove(e);

document.ontouchmove = e => handleOnMouseMove(e.touches[0]);

// check whether the mouse is on the screen or not
document.onmouseleave = e => {
    if (b.style.width != `50%`) {
        b.style.transitionDuration = '500ms';
        b.style.width = `50%`;
    }
}