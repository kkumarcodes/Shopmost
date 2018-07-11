'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var themeSettings = exports.themeSettings = {};
var text = exports.text = {};

// Client - from Redux state
if (typeof window !== 'undefined') {
  var appText = window.__APP_TEXT__;
  var appState = window.__APP_STATE__;

  if (appState.app.themeSettings) {
    exports.themeSettings = themeSettings = appState.app.themeSettings;
  }

  if (appText) {
    exports.text = text = appText;
  }
}

// Server - from render page method
var updateThemeSettings = exports.updateThemeSettings = function updateThemeSettings(options) {
  exports.themeSettings = themeSettings = options.settings;
  exports.text = text = options.text;
};