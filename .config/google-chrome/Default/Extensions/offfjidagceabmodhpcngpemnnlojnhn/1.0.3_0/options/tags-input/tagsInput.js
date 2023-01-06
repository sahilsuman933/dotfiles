app.directive("customTagsInput",[function(){return{restrict:"E",trasnclude:!0,scope:{tagList:"=",displayProperty:"@",onTagRemoved:"&",onTagAdded:"&",readOnlyIndex:"@",bindedData:"=",bindedKey:"@",allowDuplicate:"&",placeHolder:"@",maxTags:"@",errorMessages:"=",regex:"="},templateUrl:"../options/tags-input/template/tags-input.html",link:function(e,t){var n=function(){var e={backspace:8,tab:9,enter:13,escape:27,space:32,up:38,down:40,left:37,right:39,delete:46,comma:188,semicolon:186};navigator.userAgent.toLowerCase().indexOf("firefox")>-1&&(e.semicolon=59);return e}();function a(){return i(),e.mailForm&&!e.mailForm.input.$error.pattern&&e.input.inputTag&&!e.mailForm.$error.isTagsMax&&!e.mailForm.$error.isDuplicate}function i(){var t,n;0==e.allowDuplicate()&&e.mailForm.input.$setValidity("isDuplicate",!function(t){for(var n=e.displayProperty,a=0;a<e.tagList.length;a++)if(e.tagList[a][n]==t)return!0;return!1}(e.input.inputTag)),e.maxTags&&e.mailForm.input.$setValidity("isTagsMax",(t=!!e.maxTags&&e.maxTags,n=e.input.inputTag?e.tagList.length+1:e.tagList.length,!t||n<e.maxTags))}function d(t){var n={};n[e.displayProperty]=e.input.inputTag,e.tagList.push(n),e.onTagAdded({$tag:n}),e.input.inputTag="",t&&(t.preventDefault(),t.stopPropagation())}function l(){if(e.selectedIndex<0)e.selectedIndex=e.tagList.length-1;else{if(e.selectedIndex--,-1!=e.selectedIndex)return e.selectedIndex==e.readOnlyIndex?1==e.tagList.length?void(e.selectedIndex=-1):void(e.selectedIndex=0==e.readOnlyIndex?e.tagList.length-1:--e.selectedIndex):void 0;e.selectedIndex=e.tagList.length-1}}function s(){var t=angular.element(document.querySelector("#inputTagDiv"));t[0]&&(e.inputWidth=t[0].clientWidth+8,e.$apply())}e.$watch("tagList",(function(e){e&&(i(),setTimeout((function(){s()}),10))})),e.selectedIndex=-1,e.addedKeys=[n.enter,n.semicolon,n.comma,n.space],e.input={inputTag:""},e.data={hideTagInput:!1},e.input.keyDown=function(t){var i=t.keyCode;e.invalidTag=!1;var r=null==e.mailForm.input.$viewValue||""==e.mailForm.input.$viewValue;if(-1!=[n.backspace,n.delete,n.left,n.right].indexOf(i)&&r)t.preventDefault(),t.stopPropagation(),function(t){switch(t){case n.right:!function(){e.selectedIndex++,e.selectedIndex==e.tagList.length&&(e.selectedIndex=0);e.selectedIndex==e.readOnlyIndex&&e.selectedIndex++}();break;case n.left:l();break;case n.delete:case n.backspace:-1==e.selectedIndex?l():e.removeTag(e.selectedIndex)}}(i);else if(e.selectedIndex=-1,-1!=e.addedKeys.indexOf(i)){if(!a())return void(e.invalidTag=!0);d(t)}setTimeout((function(){s()}),10)},e.input.blur=function(t){a()?d():e.mailForm.input.$viewValue&&(e.invalidTag=!0)},e.input.focus=function(t){e.selectedIndex=-1},e.input.click=function(t){e.selectedIndex=-1},e.removeTag=function(t){if(t>=0&&t<e.tagList.length){if(t==e.readOnlyIndex)return;var n=e.tagList[t];e.tagList.splice(t,1),e.selectedIndex=-1,e.data.hideTagInput=!1,e.onTagRemoved({$tag:n}),i()}},e.onDivFocus=function(){t[0].getElementsByClassName("tags-input")[0].focus()}},controller:function(e){}}}]);