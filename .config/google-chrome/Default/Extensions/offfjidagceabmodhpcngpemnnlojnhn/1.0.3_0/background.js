var _current_site="",blocked=!1,blockedSites=JSON.parse(localStorage.getItem("sites"))||[],redirectUrl=localStorage.getItem("redirect_url"),activeTabs={},cmid=chrome.contextMenus.create({title:"Block this site",contexts:["all","page"],onclick:onClickHandler});function onUpdatedListener(e,t,r){activeTabs[r.id]=r}function onRemovedListener(e){delete activeTabs[e]}function isEqual(e,t){return+localStorage.getItem(e)===t}function onClickHandler(e,t){if(_current_site=(_current_site=getLocation(e.pageUrl)).host.replace("www.",""),currentSiteHost=!1,"offfjidagceabmodhpcngpemnnlojnhn"!==_current_site){var r="";if(isEqual("subdomainOption",1)&&(currentSiteHost=isSubdomainInList(blockedSites,_current_site,!0)),has_prop(blockedSites,_current_site)||currentSiteHost){if(currentSiteHost&&(_current_site=currentSiteHost),get_pass()){var o=chrome.extension.getURL("options/options.html")+"#"+_current_site;return void chrome.tabs.update(t.id,{url:o})}blockedSites=remove_site(blockedSites,_current_site),localStorage.sites=JSON.stringify(blockedSites),r="unblock"}else blockedSites=add_to_block(blockedSites,_current_site),localStorage.sites=JSON.stringify(blockedSites),r="block";chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{action:r},(function(e){}))}))}}function has_prop(e,t){return e.includes(t)}function isBlockedByPattern(e,t,r){if(!e||!t)return!1;var o=localStorage.getItem("blockPatternFlag");return o?new RegExp(t,o).test(r):new RegExp(t).test(r)}function isSubdomainInList(e,t,r){e=e||[];for(var o=0;o<e.length;o++){var n="."+e[o];if(t.endsWith(n))return!r||e[o]}return!1}function isBlockedByKey(e,t){for(var r=JSON.parse(localStorage.getItem("blockKeyList"))||[],o=0;o<r.length;o++)if(e.indexOf(r[o])>-1||t.indexOf(r[o])>-1)return!0;return!1}function add_to_block(e,t){return e.push(t),e}function remove_site(e,t){var r=e.indexOf(t);return e.splice(r,1),e}function getLocation(e){var t=document.createElement("a");return t.href=e,t}function get_pass(){var e=localStorage.getItem("pass");return null!==e&&e}function isInRange(e){var t=e;if(!t)return!1;var r=+t.start.replace(/:/,""),o=+t.end.replace(/:/,""),n=new Date,i=+(n.getHours()+""+n.getMinutes());return o<r?i>r||i<o:r<i&&i<o}function isInExtraRange(){for(var e=JSON.parse(localStorage.getItem("hour_config_extra")),t=0;t<e.length;t++)if(isInRange(e[t]))return!0;return!1}function correctTime(){var e=localStorage.getItem("hour_config");if(e){e=JSON.parse(e);var t=localStorage.getItem("hour_config_extra");t&&((t=JSON.parse(t)).push(e),localStorage.setItem("hour_config_extra",JSON.stringify(t)),localStorage.removeItem("hour_config"))}}function correctExtraTime(){var e=localStorage.getItem("hour_config_extra");if(e){e=JSON.parse(e);var t=[];e.map((function(e){var r=e;r.start=r.start<10?"0"+r.start:r.start,r.end=r.end<10?"0"+r.end:r.end,t.push({start:r.start+":00",end:r.end+":00"})})),localStorage.setItem("timeCorrected","1"),localStorage.setItem("hour_config_extra",JSON.stringify(t))}}chrome.runtime.onInstalled.addListener((function(e){chrome.storage.local.set({labelOrder:0}),"update"===e.reason&&setTimeout((function(){localStorage.getItem("timeCorrected")||(correctTime(),correctExtraTime())}),2e3),"install"===e.reason&&localStorage.setItem("subdomainOption","1")})),chrome.tabs.onUpdated.addListener((function(e,t,r){onUpdatedListener(e,t,r)})),chrome.tabs.onRemoved.addListener(onRemovedListener),chrome.tabs.query({},(function(e){e.forEach((function(e){activeTabs[e.id]=e}))})),chrome.webRequest.onBeforeRequest.addListener((function(e){if("main_frame"!==e.type){var t=isEqual("iframeOption",1),r=activeTabs[e.tabId];if(e.url.includes("site-blocker.info")&&("sub_frame"===e.type||"xmlhttprequest"===e.type))return{cancel:!1};if(!t||!r||isInExtraRange())return{cancel:!1};var o=getLocation(r.url).host.replace("www.",""),n=!1,i=getLocation(e.url).host.replace("www.","");return o!==i&&blockedSites.indexOf(i)>-1&&(n=!0),isEqual("whiteList",1)&&(n=!1),{cancel:n}}}),{urls:["<all_urls>"]},["blocking"]),chrome.extension.onRequest.addListener((function(e,t,r){if(e.host){_current_site=e.value;var o=e.site;o=(o=(o=(o=getLocation(o).hostname+decodeURIComponent(getLocation(o).pathname)).replace("www.","")).replace("http://","")).replace("https://","");var n=has_prop(blockedSites,e.value),i=isEqual("whiteList",1),a=!1;isEqual("hour_option",1)&&!i&&(a=isInExtraRange());var c=isEqual("subdomainOption",1),s=isEqual("blockKeyOption",1),l=isEqual("blockPattern",1);if(a)blocked=!1;else{c=c&&isSubdomainInList(blockedSites,_current_site);var u=s&&isBlockedByKey(_current_site,o),d=isBlockedByPattern(s,l,_current_site);if(n||c||u||d){if(blocked=!0,redirectUrl&&!redirectUrl.includes(_current_site)&&!_current_site.includes(redirectUrl))return void chrome.tabs.update(t.tab.id,{url:redirectUrl});isEqual("close_option",1)&&!i&&chrome.tabs.query({},(function(e){1===e.length&&chrome.tabs.create({url:"chrome://newtab"}),chrome.tabs.remove(t.tab.id)}))}else blocked=!1}var m="Block this site";(n||c)&&(m="Unblock this site");var g="";options={title:m,contexts:["all","page"],onclick:onClickHandler},i&&(options.title="Add to block list",(n||c)&&(options.title="Remove from block list")),chrome.contextMenus.removeAll(),chrome.contextMenus.create(options),!s||n||a||(chrome.contextMenus.remove(cmid),g="Blocked by key config"),!s||n||a||u||!d||(g="Blocked by regex"),i&&(blocked=!blocked,g="White list mode"),r({host:blocked,type:g})}})),chrome.runtime.onMessage.addListener((function(e,t,r){"getStatus"===e.method?r({status:localStorage.sites}):"save_data"===e.method?(blockedSites=JSON.parse(e.value),localStorage.setItem("sites",e.value),r({status:1})):"update_redirect_url"===e.method?((redirectUrl=e.value)?localStorage.setItem("redirect_url",redirectUrl):localStorage.removeItem("redirect_url"),r({status:1})):r({})}));