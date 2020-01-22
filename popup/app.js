const btn = document.querySelector('button');
const popupWrapper = document.querySelector('.popup-wrapper');
const popupClose = document.querySelector('.popup-close');

btn.addEventListener('click', () => {
  popupWrapper.style.display = 'block';
});
popupWrapper.addEventListener('click', e => {
  if (e.target.className !== 'popup-close') {
    alert('click on x to close the popup');
  }
});
popupClose.addEventListener('click', () => {
  popupWrapper.style.display = 'none';
});
