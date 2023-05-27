'use strict'

function toggleClass (element, className) {
  element.classList.toggle(className)
}

function addClass (element, className) {
  element.classList.add(className)
}

function removeClass (element, className) {
  element.classList.remove(className)
}

function handleClickNavbarItem (event) {
  const target = event.currentTarget
  toggleClass(target, 'active')
}

function handleClickDropdown (event) {
  const target = event.currentTarget
  const dropdownIcon = target.getElementsByClassName('mdi')[1]
  const parent = target.parentNode
  toggleClass(parent, 'active')
  toggleClass(dropdownIcon, 'mdi-plus')
  toggleClass(dropdownIcon, 'mdi-minus')
}

function handleClickMobileAsideButton (event) {
  const target = event.currentTarget
  const dropdownIcon = target.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0]
  toggleClass(document.documentElement, 'aside-mobile-expanded')
  toggleClass(dropdownIcon, 'mdi-forwardburger')
  toggleClass(dropdownIcon, 'mdi-backburger')
}

function handleClickNavbarMenuToggle (event) {
  const target = event.currentTarget
  const dropdownIcon = target.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0]
  const dataTarget = target.getAttribute('data-target')
  toggleClass(document.getElementById(dataTarget), 'active')
  toggleClass(dropdownIcon, 'mdi-dots-vertical')
  toggleClass(dropdownIcon, 'mdi-close')
}

function handleClickModal (event) {
  const target = event.currentTarget
  const modalTarget = target.getAttribute('data-target')
  addClass(document.getElementById(modalTarget), 'active')
  addClass(document.documentElement, 'clipped')
}

function handleClickModalClose (event) {
  const target = event.currentTarget
  const modal = target.closest('.modal')
  removeClass(modal, 'active')
  removeClass(document.documentElement, 'clipped')
}

function handleClickNotificationDismiss (event) {
  const target = event.currentTarget
  const notification = target.closest('.notification')
  addClass(notification, 'hidden')
}

Array.from(document.getElementsByClassName('dropdown')).forEach(function (el) {
  if (el.classList.contains('navbar-item')) {
    el.addEventListener('click', handleClickNavbarItem)
  } else {
    el.addEventListener('click', handleClickDropdown)
  }
})

Array.from(document.getElementsByClassName('mobile-aside-button')).forEach(function (el) {
  el.addEventListener('click', handleClickMobileAsideButton)
})

Array.from(document.getElementsByClassName('--jb-navbar-menu-toggle')).forEach(function (el) {
  el.addEventListener('click', handleClickNavbarMenuToggle)
})

Array.from(document.getElementsByClassName('--jb-modal')).forEach(function (el) {
  el.addEventListener('click', handleClickModal)
})

Array.from(document.getElementsByClassName('--jb-modal-close')).forEach(function (el) {
  el.addEventListener('click', handleClickModalClose)
})

Array.from(document.getElementsByClassName('--jb-notification-dismiss')).forEach(function (el) {
  el.addEventListener('click', handleClickNotificationDismiss)
})
