(()=>{"use strict";const e=function(){let e=chrome;return"object"==typeof browser&&"object"==typeof browser.runtime&&(e=browser),"object"==typeof e.storage.sync?[e,e.storage.sync]:[e,e.storage.local]}(),t=e[0];let r=e[1];const o={f_hide_feed:!0,f_hide_recommended:!0,f_hide_endscreen:!0};function n(e){Object.keys(e).length!==Object.keys(o).length&&(r.clear(),r.set(o))}t.runtime.onInstalled.addListener((()=>{r.get((e=>{t.runtime.lastError?(r=t.storage.local,r.get((e=>{n(e)}))):n(e)}))}))})();