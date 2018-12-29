const contentContainers = document.getElementsByClassName('content-container');

for (let index = 0; index < contentContainers.length; index++) {
  const container = contentContainers[index];

  attachFunctionality(container);
}

function attachFunctionality(elmt) {
  let deltaMousePosX = 0,
      deltaMousePosY = 0,
      currentMousePosX = 0,
      currentMousePosY = 0;

  let timeInterval = null,
      deltaTime = 0;

  let isResizable = true;

  elmt.addEventListener('mousedown', trackMouseDrag);
  elmt.addEventListener('mousedown', startTimer);
  elmt.addEventListener('mouseup', stopTimer);
  elmt.addEventListener('click', toggleResize);

  function startTimer(evt) {
    evt = evt || window.event;
    evt.preventDefault();

    deltaTime = 0;
    timeInterval = window.setInterval(() => deltaTime++, 250); // quarter of second - 250 milliseconds
  }

  function stopTimer(evt) {
    evt = evt || window.event;
    evt.preventDefault();

    window.clearInterval(timeInterval);
  }

  function toggleResize(evt) {
    evt = evt || window.event;
    evt.preventDefault();

    if (deltaTime < 1) {
      if (isResizable) {
        elmt.removeEventListener('mousedown', trackMouseDrag);
        isResizable = false;
      } else {
        elmt.addEventListener('mousedown', trackMouseDrag);
        isResizable = true;
        console.log('bob');
      }


      elmt.classList.toggle('resizable-container');
    }
  }

  function trackMouseDrag(evt) {
    evt = evt || window.event;
    evt.preventDefault();

    currentMousePosX = evt.clientX;
    currentMousePosY = evt.clientY;

    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', stopMouseTracking);
  }

  function dragElement(evt) {
    evt = evt || window.event;
    evt.preventDefault();

    deltaMousePosX = currentMousePosX - evt.clientX;
    deltaMousePosY = currentMousePosY - evt.clientY;
    currentMousePosX = evt.clientX;
    currentMousePosY = evt.clientY;

    elmt.style.top = (elmt.offsetTop - deltaMousePosY) + 'px';
    elmt.style.left = (elmt.offsetLeft - deltaMousePosX) + 'px';
  }

  function stopMouseTracking() {
    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', stopMouseTracking);
  }
}
