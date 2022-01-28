/* eslint-disable no-console */
import React from 'react'
import ReactDOM from 'react-dom'
import { onMessage, sendMessage } from 'webext-bridge'
import browser from 'webextension-polyfill'
import injectScript from './inject'
import { ContentApp } from './views/ContentApp'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
;(() => {
  console.info('[vitesse-webext] Hello world from content script')

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data}"`)
  })

  // mount component to context window
  const container = document.createElement('div')
  const root = document.createElement('div')
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  document.body.appendChild(container)

  injectScript(browser.runtime.getURL('dist/contentScripts/script.js'), 'body')

  window.addEventListener('connect-wallet', () => sendMessage('connect-wallet', undefined))

  ReactDOM.render(
    <React.StrictMode>
      <ContentApp />
    </React.StrictMode>,
    root
  )
})()
