# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## JSON-server for History

In order to run the json-server to add/view the search history, the below steps are required:

[Install json-server](https://github.com/typicode/json-server?tab=readme-ov-file#install):

``npm install json-server -g``

json-server --watch src/data/history.json (optional: --port [number] if port 3000 is being used)
