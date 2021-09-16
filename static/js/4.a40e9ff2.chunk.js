(this["webpackJsonpjson-visualizer"]=this["webpackJsonpjson-visualizer"]||[]).push([[4],{112:function(t,e,n){"use strict";n.r(e);var r=n(8),a=n(1),s=n.n(a),c=n(3),i=n(44),o=n(64),l=n(47),j=n(46),p=n(106),d=n(61),u=n(107),b=n(41),h=n(28),O=n(109),f=n(110),x=n(90),g=n(111),y=n(2),v=function(t){Object(l.a)(n,t);var e=Object(j.a)(n);function n(){var t;Object(i.a)(this,n);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(t=e.call.apply(e,[this].concat(a))).copyToClipBoard=function(){var e=JSON.stringify(t.props.data);navigator.clipboard.writeText(e),h.f.success("JSON copied to the clipboard.")},t.toggleExpand=function(){if(!t.props.root){var e=Object(c.a)({},t.props.state);e.expanded=!e.expanded,t.props.setState(e)}},t.toggleDelete=function(){var e=Object(c.a)({},t.props.state);e.deleted=!e.deleted,t.props.setState(e)},t}return Object(o.a)(n,[{key:"getDataDescription",value:function(){var t=this.props.data;if(Array.isArray(t)){var e=t.length;return"Array, [".concat(e," item").concat(e>1?"s":"","]")}if("object"===typeof t){var n=Object.keys(t).length;return"Object, [".concat(n," ").concat(n>1?"Properties":"Property","]")}return typeof this.props.data}},{key:"render",value:function(){if(this.props.state.deleted)return Object(y.jsx)(b.a,{variant:"danger",tooltip:"Undo Delete",onClick:this.toggleDelete,children:Object(y.jsx)(p.a,{})});var t=this.props.state.expanded||this.props.root;return Object(y.jsx)(O.a,{"aria-label":"Toolbar with Button groups",children:Object(y.jsxs)(f.a,{className:"me-2","aria-label":"First group",children:[Object(y.jsx)(x.a,{variant:"primary",disabled:!0,children:Object(y.jsx)(g.a,{variant:"light",children:this.getDataDescription()})}),!this.props.root&&Object(y.jsxs)(s.a.Fragment,{children:[t?Object(y.jsx)(b.a,{variant:"warning",tooltip:"Collapse",onClick:this.toggleExpand,children:Object(y.jsx)(u.a,{})}):Object(y.jsx)(b.a,{variant:"primary",tooltip:"Expand",onClick:this.toggleExpand,children:Object(y.jsx)(u.b,{})}),Object(y.jsx)(b.a,{variant:"success",tooltip:"Copy JSON",onClick:this.copyToClipBoard,children:Object(y.jsx)(d.b,{})}),Object(y.jsx)(b.a,{variant:"danger",tooltip:"Delete from DOM",onClick:this.toggleDelete,children:Object(y.jsx)(d.c,{})})]})]})})}}]),n}(a.Component),m=v,k=n(99),D=n(108),N=n(13),S={light:{key:"mtk20",str:"text-info",num:"mtk7",null:"text-danger",boolean:"mtk5"},dark:{key:"mtk4",str:"text-info",num:"mtk6",null:"text-danger",boolean:"mtk5"}};function _(t,e,n){var r,a,s,c=function(t){var e=t?S.dark:S.light;return function(t){return e[t]}}(e);if(n)return function(t){return Object(y.jsx)("span",{className:c("key"),children:t})}(t);if(null===t)return Object(y.jsx)("span",{className:c("null"),children:"null"});if("string"===typeof t)return s=t,Object(y.jsx)("span",{className:c("str"),children:s||'""'});if("number"===typeof t)return a=t,Object(y.jsx)("span",{className:c("num"),children:a});if(!1===t||!0===t)return r=t,Object(y.jsx)("span",{className:c("boolean"),children:r?"true":"false"});if(Array.isArray(t)){if(t.length<1)return"[]"}else if("object"===typeof t&&Object.keys(t).length<1)return"{}";return"symbol"===typeof t?t:(console.log(typeof t+" to be displayed"),Object(y.jsxs)("p",{children:["Some Data of type ",typeof t]}))}var A=n(20),C=Object(a.lazy)((function(){return Promise.resolve().then(n.bind(null,97))})),T=Object(D.a)((function(t,e){return Object(h.c)(t,e)}));function w(t){var e=Object(N.c)((function(t){return t.statusbar})),n=e.searchText,c=e.expandAll,i=e.collapseAll,o=Object(N.c)((function(t){return t.input})),l=o.settings,j=l.darkMode,p=l.truncateLimit,d=Object(a.useState)({expanded:!1,deleted:!1}),u=Object(r.a)(d,2),b=u[0],O=u[1];function f(){return Object(y.jsx)(m,{data:t.data,state:b,setState:O,root:t.root})}if(b.deleted)return f();var x=t.data;if(!function(t){return null!==t&&(Array.isArray(t)?t.length>0:"object"===typeof t&&Object.keys(t).length>0)}(x))return l.truncateStrings?_(Object(h.g)(x,p),j,t.is_heading):_(x,j,t.is_heading);var g=T(x,n),v=Object(h.b)(g),D=v.headings,S=v.table;return S.length<1?t.root?_("NO RESULTS",j,!0):null:(i?b.expanded=!1:c&&(b.expanded=!0),t.root||n||b.expanded?Object(y.jsxs)(s.a.Fragment,{children:[f(),function(e,n){return Object(y.jsx)(a.Suspense,{fallback:Object(y.jsx)(k.a,{animation:"border",variant:"primary"}),children:Object(y.jsxs)(C,{bordered:!0,responsive:!!t.root,size:"sm",variant:j&&"dark",style:{marginBottom:0},children:[Object(y.jsx)("thead",{children:Object(y.jsx)("tr",{children:e.map((function(t){return Object(y.jsx)("th",{className:"fit-contents",children:t},t)}))})}),Object(y.jsx)("tbody",{children:n.map((function(e,n){var r=e[0],a=Object(h.d)(t.json_path,r.path_key);return Object(y.jsxs)("tr",{children:[Object(y.jsx)(E,{value:r.value,th:!0,json_path:a},r.path_key),e.slice(1).map((function(t,e){return t?Object(y.jsx)(E,{value:t.value,json_path:Object(h.d)(a,t.path_key)},t.path_key):Object(y.jsx)("td",{},e)}))]},n)}))})]})})}(D,S)]}):f())}function E(t){var e=Object(N.b)();var n=t.th?"th":"td";return Object(y.jsx)(n,{onClick:function(n){n.stopPropagation(),["TD","TH","SPAN"].includes(n.target.nodeName)&&n.target.innerHTML?e(Object(A.f)(t.json_path)):n.preventDefault()},children:Object(y.jsx)(w,{is_heading:t.th,data:t.value,json_path:t.json_path})})}e.default=w}}]);
//# sourceMappingURL=4.a40e9ff2.chunk.js.map