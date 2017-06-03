const {readFileSync} = require('fs')
const path = require('path')
const jsonar = require('../index')

const json = {
      "details": {
        "name": "Deux Theme",
        "uri": "http://wordpress.org",
        "author": "Rocky Hermann",
        "authorUri": "http://wordpress.org",
        "description": "Quia exercitationem ullam adipisci nam eum.",
        "version": "1.0.0",
        "tags": [
          "one-column",
          "four-columns"
        ],
        "repoUrl": "https://github.com/oknoorap/ramen-theme.git",
        "slug": "deux-theme",
        "slugfn": "deux_theme"
      },
      "develop": false,
      "optimize": true,
      "asset": {
        "libs": {},
        "scss": {
          "components": [],
          "layouts": [],
          "pages": [],
          "themes": [],
          "vendors": []
        },
        "fonts": {}
      },
      "plugins": {
        "woocommerce": {
          "required": true,
          "force_activation": true,
          "force_deactivation": false,
          "init": false,
          "name": "Woocommerce",
          "slug": "woocommerce",
          "description": "WooCommerce is a powerful, extendable eCommerce plugin that helps you sell anything. Beautifully.",
          "external_url": "https://wordpress.org/plugins/woocommerce/",
          "baba": undefined,
          "sayonara": null
        }
      },
      "components": [
        "pagination",
        "post-meta",
        "posted-on"
      ],
      "template": {
        "pages": [],
        "partials": [
          "content-blank",
          "content-empty",
          "content-none",
          "content-page",
          "content-search",
          "content-single",
          "content",
          "header-navbar"
        ]
      },
      "hook": {
        "filters": [],
        "actions": []
      },
      "utils": [],
      "menus": {},
      "widgets": {},
      "features": {
        "html5": [
          "comment-form",
          "comment-list",
          "gallery",
          "caption"
        ]
      }
    }
console.log(jsonar(json, true)) // eslint-disable-line no-console
