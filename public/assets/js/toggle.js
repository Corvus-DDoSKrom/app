const BUTTON = document.querySelector('button')
const SYNC = document.querySelector('#sync')

const TOGGLE = () => {
  const IS_PRESSED = BUTTON.matches('[aria-pressed=true]')
  if (SYNC.checked) { document.body.setAttribute('data-dark-mode', !IS_PRESSED) }
  BUTTON.setAttribute('aria-pressed', !IS_PRESSED)
}

BUTTON.addEventListener('click', TOGGLE)
