(this.webpackJsonpjson_visualizer=this.webpackJsonpjson_visualizer||[]).push([[0],{37:function(e,t,n){"use strict";var r=n(8),s=n(51),a=(n(1),n(54)),o=n(53),c=n(52),i=n(2),l=["ref"];t.a=function(e){return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)(a.a,{placement:"bottom",overlay:Object(i.jsx)(o.a,{children:e.tooltip}),children:function(t){var n=t.ref,a=Object(s.a)(t,l);return Object(i.jsx)(c.a,Object(r.a)(Object(r.a)({ref:n,size:"sm",onClick:e.onClick,onMouseDown:e.onMouseDown,onMouseUp:e.onMouseUp,variant:e.variant},a),{},{children:e.children}))}})})}},42:function(e,t,n){"use strict";n.d(t,"d",(function(){return c})),n.d(t,"c",(function(){return d})),n.d(t,"a",(function(){return h})),n.d(t,"b",(function(){return j})),n.d(t,"e",(function(){return p}));var r=n(50),s=n(11),a=n(22),o={position:"top-center",transition:a.b,autoClose:1e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!1,draggable:!1},c={success:function(e){return a.c.success(e,o)},warning:function(e){return a.c.warning(e,o)},error:function(e){return a.c.error(e,o)}};function i(e){return null===e?"null":Array.isArray(e)?"Array":typeof e}function l(e){if("object"===i(e)){var t=Object.keys(e);if(!t.every((function(t){return"object"===i(e[t])})))return!1;var n=function(e){if(e.length<1)return[];console.log("Find intersection of arr: ",e);var t=e[0];return e.slice(1).map((function(e){return t=t.filter((function(t){return e.includes(t)})),null})),t}(t.map((function(t){return Object.keys(e[t])}))),r=n.every((function(e){return e.startsWith("index__")}));return t.length>1&&n.length>0&&!r}return!1}function d(e,t){return e||(e="root"),""===t||"[index]"===t?e:e+("string"===typeof t?'["'.concat(t,'"]'):"[".concat(t,"]"))}function h(e){if("object"===typeof e)return l(e)?function(e){var t=Object.entries(e).flatMap((function(e){var t=Object(s.a)(e,2),n=(t[0],t[1]);return Object.keys(n)}));t=Object(r.a)(new Set(t));var n=[];return Object.entries(e).forEach((function(e){var r=Object(s.a)(e,2),a=r[0],o=r[1];a.startsWith("index__")&&(a=parseInt(a.substr(7)));var c=[{path_key:a,value:a}];t.forEach((function(e){e.startsWith("index__")&&(e=parseInt(e.substr(7))),e in o?c.push({path_key:e,value:o[e]}):c.push(null)})),n.push(c)})),{headings:["[key]"].concat(t),table:n}}(e):(t=e,{headings:[],table:Object.entries(t).map((function(e){var t=Object(s.a)(e,2),n=t[0],r=t[1];return n.startsWith("index__")&&(n=parseInt(n.substr(7))),[{path_key:n,value:n},{path_key:"",value:r}]}))});var t}function u(e,t){return null===e?"null".includes(t):"number"===typeof e||"boolean"===typeof e?e.toString().toLowerCase().includes(t):"string"===typeof e?e.toLowerCase().includes(t):"unsure"}function j(e,t){if("Array"===i(e)){var n={};e.forEach((function(e,t){n["index__"+t]=e})),e=n}if(!t)return e;var r={};return Object.entries(e).forEach((function(e){var n=Object(s.a)(e,2),a=n[0],o=n[1],c=u(a,t)||u(o,t);(!0===c||"unsure"===c)&&(r[a]=o)})),r}function p(e,t){return"string"===i(e)?e.length<=t?e:e.substr(0,t-3)+"...":(Object.entries(e).forEach((function(n){var r=Object(s.a)(n,2),a=r[0],o=r[1];e[a]=p(o,t)})),e)}},59:function(e,t,n){},60:function(e,t,n){},68:function(e,t,n){"use strict";n.r(t);var r=n(1),s=n.n(r),a=n(12),o=n.n(a),c=(n(59),n(13)),i=n(14),l=n(33),d=n(16),h=n(15),u=(n(60),n(61),n(62),n(79)),j=n(77),p=n(74),b=n(8),x=n(28),f=n(49),g=n(2),O=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var r;Object(c.a)(this,n),r=t.call(this,e);var s=e.name;return r.id="flexSwitch"+s[0].toUpperCase()+s.substring(1),r}return Object(i.a)(n,[{key:"render",value:function(){return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)("div",{className:"form-switch pl-4",style:{paddingLeft:10,marginBottom:15},children:Object(g.jsx)("span",{className:"bmd-form-group",children:Object(g.jsxs)("label",{children:[Object(g.jsx)("input",{type:"checkbox",className:"form-check-input",id:this.id,name:this.props.name,checked:this.props.checked,onChange:this.props.onChange}),Object(g.jsx)("span",{className:"toggle"}),this.props.text]})})})})}},{key:"render_old",value:function(){return Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)("div",{className:this.props.className+" form-check form-switch pl-4",style:{textAlign:"left"},children:[Object(g.jsx)("input",{type:"checkbox",className:"form-check-input",id:this.id,name:this.props.name,checked:this.props.checked,onChange:this.props.onChange}),Object(g.jsx)("label",{className:"form-check-label",htmlFor:this.id,children:this.props.text})]})})}}]),n}(r.Component),m=n(81),v=n(73),k=n(46),y=n(52),C=n(75),S=n(80),M=n(76),_=n(47),w=n(78),T=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).state={jsonError:"",errorMarkers:[],isJsonValid:!0},r.jsonInputRef=null,r.handleEditorDidMount=function(e,t){r.editorRef.current=e},r.toggleSettings=function(e){var t=e.target,n=Object(b.a)({},r.props.state);n.settings[t.name]=t.checked,r.props.setState(n),"darkMode"===t.name&&(document.body.classList.toggle("bg-dark"),document.body.classList.toggle("text-white"))},r.handleEditorValidation=function(e){r.setState({errorMarkers:e})},r.handleJsonInputChanged=function(e,t){var n=Object(b.a)({},r.props.state);if(!e)return n.json=void 0,n.isJsonValid=!0,n.jsonError=null,void r.props.setState(n);try{var s=JSON.parse(e);n.json=s,n.isJsonValiderrorMarkers=!0,n.jsonError=null,r.props.setState(n)}catch(a){n.json=void 0,n.isJsonValid=!1,n.jsonError=a,r.props.setState(n)}},r.getErrorPosition=function(e,t){if(e.indexOf("at position ")>=0){var n=e.split(" "),r=n[n.length-1];return parseInt(r)}return t},r.goToErrorPosition=function(e,t){},r.renderError=function(){if(r.props.state.isJsonValid)return Object(g.jsx)(s.a.Fragment,{});var e=r.props.state.jsonError;return e?Object(g.jsxs)(m.a,{variant:"danger",className:"mt-2",children:[Object(g.jsxs)(m.a.Heading,{children:[Object(g.jsx)(x.c,{className:"mr-2",size:25}),"Ahhh! You got some error(s)!"]}),r.state.errorMarkers&&Object(g.jsx)(g.Fragment,{children:Object(g.jsxs)(v.default,{responsive:!0,variant:"danger",size:"sm",children:[Object(g.jsxs)("thead",{style:{verticalAlign:"center"},children:[Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{rowSpan:2,children:"Message"}),Object(g.jsx)("th",{colSpan:2,children:"Error Position"})]}),Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"From"}),Object(g.jsx)("th",{children:"To"})]})]}),Object(g.jsx)("tbody",{children:r.state.errorMarkers.map((function(e,t){return Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:e.message}),Object(g.jsxs)("td",{children:[e.startLineNumber,":",e.startColumn]}),Object(g.jsxs)("td",{children:[e.endLineNumber,":",e.endColumn]})]},t)}))})]})})]}):Object(g.jsx)(s.a.Fragment,{})},r.jsonInputRef=s.a.createRef(),r.editorRef=s.a.createRef(),e.state.settings.darkMode&&document.body.classList.add("bg-dark"),r}return Object(i.a)(n,[{key:"render",value:function(){var e=this,t=this.props.state.settings.darkMode;return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)(p.a,{className:"mt-3",children:[Object(g.jsxs)(k.a,{xs:9,style:{textAlign:"left"},children:["Please enter your JSON here:",Object(g.jsx)(f.a,{language:"json",defaultLanguage:"json",height:"220px",onChange:this.handleJsonInputChanged,onMount:this.handleEditorDidMount,onValidate:this.handleEditorValidation,theme:t?"vs-dark":"light",loading:Object(g.jsx)(C.a,{variant:"primary",animation:"border"}),options:{wordWrap:"on",minimap:{enabled:!1}}})]}),Object(g.jsx)(k.a,{xs:3,style:{float:"none",display:"table-cell",verticalAlign:"top"},children:Object(g.jsxs)(S.a,{bg:t?"secondary":"light",text:t?"white":"dark",style:{width:"18rem"},className:"mb-2",children:[Object(g.jsx)(S.a.Header,{style:{width:"80%",marginToo:30,marginLeft:"10%",borderRadius:"0.5rem"},children:"Settings"}),Object(g.jsxs)(S.a.Body,{children:[Object(g.jsx)(S.a.Title,{}),this.props.toggleControls.map((function(t){return Object(g.jsx)(O,{name:t.name,text:t.text,checked:e.props.state.settings[t.name],onChange:e.toggleSettings},t.name)})),Object(g.jsx)(S.a.Text,{})]})]})})]}),Object(g.jsx)(p.a,{children:Object(g.jsxs)(M.a,{hasValidation:!0,children:[Object(g.jsx)(_.a,{isInvalid:!0,style:{display:"none"}}),Object(g.jsx)(w.a.Control.Feedback,{type:"invalid",children:this.renderError()})]})})]})}}]),n}(r.Component),E=n(44),N=n(48),A=n(37),F=n(42),J=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).handleExpandAll=function(){r.props.handleExpandCollapseAll("+")},r.handleCollapseAll=function(){r.props.handleExpandCollapseAll("-")},r.handleSearchTextChanged=function(e){r.timeout&&clearTimeout(r.timeout),r.timeout=setTimeout((function(){r.props.onSearchTextChanged(e.target.value)}),300)},r.clearSearchText=function(){r.searchRef.current.value="",r.props.onSearchTextChanged("")},r.copyPathToClipboard=function(){var e=r.props.jsonRef.current.value;e?(navigator.clipboard.writeText(e),F.d.success("Copied to the Clipboard.")):F.d.warning("Nothing to copy.")},r.typing_timeout=0,r.searchRef=s.a.createRef(),r}return Object(i.a)(n,[{key:"render",value:function(){var e=this;return Object(g.jsxs)(p.a,{className:"pt-2 pb-2",style:{backgroundColor:"#6c757d",zIndex:1,position:"sticky",top:0},children:[Object(g.jsx)(k.a,{sm:"auto",children:Object(g.jsxs)(M.a,{size:"sm",children:[Object(g.jsx)(A.a,{variant:"primary",tooltip:"Expand All",onMouseDown:function(){return e.props.handleExpandCollapseAll("+")},onMouseUp:function(){return e.props.handleExpandCollapseAll("")},children:Object(g.jsx)(x.b,{})}),Object(g.jsx)(A.a,{variant:"warning",tooltip:"Collapse All",onMouseDown:function(){return e.props.handleExpandCollapseAll("-")},onMouseUp:function(){return e.props.handleExpandCollapseAll("")},children:Object(g.jsx)(x.a,{})})]})}),Object(g.jsx)(k.a,{sm:9,children:Object(g.jsxs)(M.a,{size:"sm",children:[Object(g.jsx)(M.a.Text,{style:this.props.style,children:"Clicked JSON Path:"}),Object(g.jsx)(_.a,{className:"text-center font-weight-bold",disabled:!0,style:{backgroundColor:"white",color:"#198754"},value:this.props.json_path,ref:this.props.jsonRef}),Object(g.jsx)(A.a,{variant:"success",tooltip:"Copy this path",onClick:this.copyPathToClipboard,children:Object(g.jsx)(E.b,{})})]})}),Object(g.jsx)(k.a,{sm:2,children:Object(g.jsxs)(M.a,{className:"mb-3 text-center",size:"sm",children:[Object(g.jsx)(_.a,{placeholder:"Search...","aria-label":"Search","aria-describedby":"basic-addon2",onChange:this.handleSearchTextChanged,style:{backgroundColor:"white"},ref:this.searchRef}),Object(g.jsx)(M.a.Append,{children:Object(g.jsx)(y.a,{variant:"info",onClick:this.props.searchText?this.clearSearchText:function(){},children:this.props.searchText?Object(g.jsx)(E.a,{}):Object(g.jsx)(N.a,{})})})]})})]})}}]),n}(r.Component),R=Object(r.lazy)((function(){return Promise.all([n.e(3),n.e(4)]).then(n.bind(null,89))})),L=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).state={searchText:"",selected_json_path:"",expand_signal:""},e.custom_themes={light:{backgroundColor:"#ffffff"},dark:{backgroundColor:"#212529",color:"white"}},e.selectedJsonUpdated=function(t){var n=Object(b.a)({},e.state);n.selected_json_path=t,e.setState(n)},e.handleExpandCollapseAll=function(t){var n=Object(b.a)({},e.state);n.expand_signal=t,e.setState(n)},e.onSearchTextChanged=function(t){var n=Object(b.a)({},e.state);n.searchText=t.toLowerCase(),e.setState(n)},e.selectedJsonRef=s.a.createRef(),e}return Object(i.a)(n,[{key:"render",value:function(){return void 0===this.props.data?Object(g.jsx)(s.a.Fragment,{}):Object(g.jsxs)(s.a.Fragment,{children:[Object(g.jsx)(J,{style:this.props.darkMode?this.custom_themes.dark:this.custom_themes.light,darkMode:this.props.darkMode,json_path:this.state.selected_json_path,jsonRef:this.selectedJsonRef,handleExpandCollapseAll:this.handleExpandCollapseAll,onSearchTextChanged:this.onSearchTextChanged,searchText:this.state.searchText}),Object(g.jsx)("div",{className:"row text-left mt-2 "+(this.props.darkMode?"text-white bg-dark":"text-dark"),children:Object(g.jsx)("h5",{children:"Output:"})}),Object(g.jsx)("div",{className:"row p-3",children:Object(g.jsx)(r.Suspense,{fallback:Object(g.jsx)("h1",{children:Object(g.jsx)(C.a,{animation:"border",variant:"primary"})}),children:Object(g.jsx)(R,{root:!0,data:this.props.data,darkMode:this.props.darkMode,truncateStrings:this.props.truncateStrings,showJsonPath:this.selectedJsonUpdated,expand_signal:this.state.expand_signal,searchText:this.state.searchText})})})]})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.data?null:{selected_json_path:""}}}]),n}(r.Component),P=n(22),I=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(c.a)(this,n),(e=t.call(this)).state={settings:{},json:void 0},e.setState=e.setState.bind(Object(l.a)(e)),e.toggleControls=[{name:"darkMode",text:"Dark Mode",default:!1},{name:"monospaceFont",text:"Preserve Space",default:!0},{name:"truncateStrings",text:"Truncate Long Strings",default:!1}];var r={};return e.toggleControls.forEach((function(e){r[e.name]=e.default})),e.setState(r),e}return Object(i.a)(n,[{key:"render",value:function(){return Object(g.jsxs)("div",{className:"App "+(this.state.settings.darkMode?"bg-dark":"bg-light"),children:[Object(g.jsx)(P.a,{position:"bottom-center",autoClose:1e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!1,pauseOnHover:!1}),Object(g.jsx)(u.a,{variant:"dark",style:{borderRadius:0,backgroundColor:"#20232a"},children:Object(g.jsx)(j.a,{fluid:!0,children:Object(g.jsxs)(u.a.Brand,{children:[Object(g.jsx)("img",{src:"logo.svg",alt:"",width:"30",height:"24",className:"d-inline-block align-text-top"}),"JSON to HTML Visualizer"]})})}),Object(g.jsx)("div",{className:"container-fluid",children:Object(g.jsxs)(p.a,{variant:this.state.settings.darkMode?"dark":"secondary",children:[Object(g.jsx)("div",{className:"col-12",children:Object(g.jsx)(T,{state:this.state,setState:this.setState,toggleControls:this.toggleControls})}),Object(g.jsx)("div",{className:"col-12 "+(this.state.settings.monospaceFont?"text-monospace":""),children:Object(g.jsx)(L,{data:this.state.json,darkMode:this.state.settings.darkMode,truncateStrings:this.state.settings.truncateStrings})})]})})]})}}]),n}(r.Component),z=function(e){e&&e instanceof Function&&n.e(5).then(n.bind(null,88)).then((function(t){var n=t.getCLS,r=t.getFID,s=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),r(e),s(e),a(e),o(e)}))};o.a.render(Object(g.jsx)(s.a.StrictMode,{children:Object(g.jsx)(I,{})}),document.getElementById("root")),z()}},[[68,1,2]]]);
//# sourceMappingURL=main.2e318e31.chunk.js.map