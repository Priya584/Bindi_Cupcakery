"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[168],{720687:(e,t,n)=>{n.d(t,{default:()=>r});var a=n(934980);let i=`pulsing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}`,r={css:(0,a.Ll)([i]),animation:"pulsing 2s infinite"}},934980:(e,t,n)=>{n.d(t,{CC:()=>i,Ll:()=>o,XF:()=>r});let a=(e,t,n)=>({x:Math.floor(e*Math.cos(n)),y:Math.floor(t*Math.sin(n))}),i=(e,t)=>a(t/2,e/2,2*Math.random()*Math.PI),r=(e,t)=>Math.floor(Math.random()*(t-e+1))+e,o=e=>["@-webkit-keyframes","@keyframes"].map(t=>e.map(e=>t+" "+e).join("\n")).join("\n")},31723:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j});var a=n(667294),i=n(883119),r=n(573706),o=n(986782);function l(e,t,n){var a;return(t="symbol"==typeof(a=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?a:a+"")in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let s={},u=e=>{let t=e.__id||e.id;return"string"==typeof t&&t||null};class m{constructor(){l(this,"idMap",new Map),l(this,"objMap",new WeakMap)}get(e){let t=u(e);return this.objMap.get(e)??(t?this.idMap.get(t):void 0)}has(e){let t=u(e);return this.objMap.has(e)??(!!t&&this.idMap.has(t))}set(e,t){let n=u(e);n&&this.idMap.set(n,t),this.objMap.set(e,t)}reset(){this.idMap=new Map,this.objMap=new WeakMap}}var p=n(587435),d=n(39260),c=n(876594),h=n(720687),y=n(512541),_=n(785893);let{css:f,animation:x}=h.default,g={backgroundColor:c._VP,animation:x,borderRadius:c.Ev2};function b({data:e}){let{height:t}=e;return(0,_.jsxs)(a.Fragment,{children:[(0,_.jsx)(y.Z,{unsafeCSS:f}),(0,_.jsx)(i.xu,{dangerouslySetInlineStyle:{__style:g},"data-test-id":"skeleton-pin",children:(0,_.jsx)(i.xu,{height:t})})]})}var v=n(679482),w=n(297728),C=n(730212),$=n(410150),M=n(415787),k=n(855746);function j(e){let{align:t,cacheKey:n,id:l,isFetching:u,isGridCentered:c=!0,items:h,layout:f,loadItems:x,masonryRef:g,optOutFluidGridExperiment:j=!1,renderItem:E,scrollContainerRef:S,virtualize:W=!0,_getColumnSpanConfig:R,_dynamicHeights:I,useLoadingState:A,isLoadingAccessibilityLabel:B,isLoadedAccessibilityLabel:F}=e,N=(0,$.ZP)(),{isAuthenticated:G,isRTL:O}=(0,C.B)(),{logContextEvent:P}=(0,r.v)(),D=(0,w.F)(),L="desktop"===N,Z=(0,k.MM)(),H=((0,a.useRef)(h.map(()=>({fetchTimestamp:Date.now(),measureTimestamp:Date.now(),hasRendered:!1,pageCount:0}))),L&&!j),{experimentalColumnWidth:T,experimentalGutter:z}=(0,p.Z)(H),V=e.serverRender??!!L,X="flexible"===f||"uniformRowFlexible"===f||"desktop"!==N||H,K=(X&&f?.startsWith("uniformRow")?"uniformRowFlexible":void 0)??(V?"serverRenderedFlexible":"flexible"),U=e.columnWidth??T??v.yF;X&&(U=Math.floor(U));let J=e.gutterWidth??z??(L?v.oX:1),q=e.minCols??v.yc,Q=((0,a.useRef)(0),U+J),Y=function(e){if(null==e)return;let t=function(e){let t=s[e];return t&&t.screenWidth===window.innerWidth||(s[e]={screenWidth:window.innerWidth}),s[e]}(e);return t.measurementCache||(t.measurementCache=new m),t.measurementCache}(n),ee=(0,a.useCallback)(()=>S?.current||window,[S]),et=(0,a.useRef)(!0),{anyEnabled:en,group:ea}=R?D.checkExperiment("web_masonry_mixed_early_bailout"):{anyEnabled:!1,group:""},ei=en?e=>e<=3?2*J:3*J:void 0,{anyEnabled:er}=I?D.checkExperiment("dynamic_heights_v2"):{anyEnabled:!1},{anyEnabled:eo}=D.checkExperiment("web_masonry_enable_dynamic_heights_for_all"),el=c&&et.current?"centered":"",{className:es,styles:eu}=function(e){let t=`m_${Object.keys(e).sort().reduce((t,n)=>{let a=e[n];return null==a||"object"==typeof a||"function"==typeof a?t:"boolean"==typeof a?t+(a?"t":"f"):t+a},"").replace(/\:/g,"\\:")}`,{flexible:n,gutterWidth:a,isRTL:i,itemWidth:r,maxColumns:o,minColumns:l,items:s,_getColumnSpanConfig:u}=e,m=u?s.map((e,t)=>({index:t,columnSpanConfig:u(e)??1})).filter(e=>1!==e.columnSpanConfig):[],p=r+a,d=Array.from({length:o+1-l},(e,t)=>t+l).map(e=>{let s=e===l?0:e*p,u=e===o?null:(e+1)*p-.01,{styles:d,numberOfVisibleItems:c}=m.reduce((i,o)=>{let{columnSpanConfig:l}=o,s=Math.min(function({columnCount:e,columnSpanConfig:t}){if("number"==typeof t)return t;let n=e<=2?"sm":e<=4?"md":e<=6?"_lg1":e<=8?"lg":"xl";return"_lg1"===n?t[n]??t.lg??1:t[n]??1}({columnCount:e,columnSpanConfig:l}),e),u=null!=o.index&&i.numberOfVisibleItems>=s+o.index,m=n?100/e*s:r*s+a*(s-1),{numberOfVisibleItems:p}=i;return u?p-=s-1:o.index<p&&(p+=1),{styles:i.styles.concat(function({className:e,index:t,columnSpanConfig:n,visible:a,width:i,flexible:r}){let o="number"==typeof n?n:btoa(JSON.stringify(n));return r?`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${a?"visible":"hidden"} !important;
        position: ${a?"inherit":"absolute"} !important;
        width: ${i}% !important;
      }`:`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${a?"visible":"hidden"} !important;
        position: ${a?"inherit":"absolute"} !important;
        width: ${i}px !important;
      }`}({className:t,index:o.index,columnSpanConfig:l,visible:u,width:m,flexible:n})),numberOfVisibleItems:p}},{styles:"",numberOfVisibleItems:e}),h=n?`
      .${t} .static {
        box-sizing: border-box;
        width: calc(100% / ${e}) !important;
      }
    `:`
      .${t} {
        max-width: ${e*p}px;
      }

      .${t} .static {
        width: ${r}px !important;
      }
    `;return{minWidth:s,maxWidth:u,styles:`
      .${t} .static:nth-child(-n+${c}) {
        position: static !important;
        visibility: visible !important;
        float: ${i?"right":"left"};
        display: block;
      }

      .${t} .static {
        padding: 0 ${a/2}px;
      }

      ${h}

      ${d}
    `}}),c=d.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @container (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),h=d.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @media (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),y=`
    ${c.join("")}
    @supports not (container-type: inline-size) {
      ${h.join("")}
    }
  `;return{className:t,styles:`
  .masonryContainer {
      container-type: inline-size;
    }

    .masonryContainer > .centered {
      margin-left: auto;
      margin-right: auto;
    }

    .${t} .static {
      position: absolute !important;
      visibility: hidden !important;
    }

    ${y}
  `}}({gutterWidth:J,flexible:X,items:h,isRTL:O,itemWidth:U,maxColumns:e.maxColumns??Math.max(h.length,v.g5),minColumns:q,_getColumnSpanConfig:R}),em=`${el} ${es}`.trim(),{anyEnabled:ep,expName:ed,group:ec,isMeasureAllEnabled:eh}=(0,d.Z)(),ey=((0,a.useRef)(),(0,a.useRef)(h.length)),e_=(0,a.useRef)(0);(0,a.useEffect)(()=>{ey.current=h.length,e_.current+=1},[h]),(0,a.useEffect)(()=>{et.current&&(et.current=!1)},[]),(0,a.useEffect)(()=>()=>{},[]);let ef=(0,a.useCallback)((e,t,n)=>{let a=e.reduce((e,t)=>e+t),i=a/e.length;(0,M.S0)("webapp.masonry.multiColumnWhitespace.average",i,{sampleRate:1,tags:{earlyBailoutExperimentGroup:ea||"unknown",experimentalMasonryGroup:ec||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}}),(0,M.S0)("webapp.masonry.twoColWhitespace",i,{sampleRate:1,tags:{columnWidth:U,minCols:q}}),ea&&(0,M.S0)("webapp.masonry.graphIterations",t,{sampleRate:1,tags:{columnSpan:n,exprimentGroup:ea}}),P({event_type:15878,component:14468,aux_data:{total_whitespace_px:a}}),P({event_type:16062,component:14468,aux_data:{average_whitespace_px:i}}),P({event_type:16063,component:14468,aux_data:{max_whitespace_px:Math.max(...e)}}),e.forEach(t=>{t>=50&&((0,M.nP)("webapp.masonry.multiColumnWhitespace.over50",{sampleRate:1,tags:{earlyBailoutExperimentGroup:ea||"unknown",experimentalMasonryGroup:ec||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}}),P({event_type:16261,component:14468})),t>=100&&((0,M.nP)("webapp.masonry.multiColumnWhitespace.over100",{sampleRate:1,tags:{earlyBailoutExperimentGroup:ea||"unknown",experimentalMasonryGroup:ec||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}}),P({event_type:16262,component:14468}))}),(0,M.nP)("webapp.masonry.multiColumnWhitespace.count",{sampleRate:1,tags:{earlyBailoutExperimentGroup:ea||"unknown",experimentalMasonryGroup:ec||"unknown",handlerId:Z,isAuthenticated:G,multiColumnItemSpan:e.length}})},[U,ea,P,q,G,Z,ec]),{_items:ex,_renderItem:eg}=function({initialLoadingStatePinCount:e=50,infiniteScrollPinCount:t=10,isFetching:n,items:i=[],renderItem:r,useLoadingState:o}){let l=i.filter(e=>"object"==typeof e&&null!==e&&"type"in e&&"closeup_module"===e.type).length>0,s=o&&n&&0===i.length,u=o&&n&&i.length>(l?1:0),m=(0,a.useMemo)(()=>Array.from({length:u?t:e}).reduce((e,t,n)=>[...e,{height:n%2==0?356:236,key:`skeleton-pin-${n}`,isSkeleton:!0}],[]),[e,t,u]);return{_items:(0,a.useMemo)(()=>s?m:u?[...i,...m]:i,[s,u,i,m]),_renderItem:(0,a.useMemo)(()=>o?e=>{let{itemIdx:t,data:n}=e;return t>=i.length&&n&&"object"==typeof n&&"key"in n&&"height"in n?(0,_.jsx)(b,{data:n},n.key):r(e)}:r,[o,r,i.length])}}({useLoadingState:A,items:h,renderItem:(0,a.useCallback)(e=>(0,_.jsx)(o.Z,{name:"MasonryItem",children:E(e)}),[E]),isFetching:u}),eb=A&&u;return(0,_.jsxs)(a.Fragment,{children:[A&&!et.current&&(0,_.jsx)(i.xu,{"aria-live":"polite",display:"visuallyHidden",children:eb?B:F}),(0,_.jsx)("div",{"aria-busy":A?!!eb:void 0,className:"masonryContainer","data-test-id":"masonry-container",id:l,style:H?{padding:`0 ${J/2}px`}:void 0,children:(0,_.jsxs)("div",{className:em,children:[V&&et.current?(0,_.jsx)(y.Z,{"data-test-id":"masonry-ssr-styles",unsafeCSS:eu}):null,(0,_.jsx)(i.xu,{"data-test-id":"max-width-container",marginBottom:0,marginEnd:"auto",marginStart:"auto",marginTop:0,maxWidth:e.maxColumns?Q*e.maxColumns:void 0,children:ep?(0,_.jsx)(i.GX,{ref:e=>{g&&(g.current=e)},_dynamicHeights:eo||I,_dynamicHeightsV2Experiment:er,_earlyBailout:ei,_getColumnSpanConfig:R,_logTwoColWhitespace:ef,_measureAll:eh,align:t,columnWidth:U,gutterWidth:J,items:ex,layout:X?K:f??"basic",loadItems:x,measurementStore:Y,minCols:q,renderItem:eg,scrollContainer:ee,virtualBufferFactor:.3,virtualize:W}):(0,_.jsx)(i.Rk,{ref:e=>{g&&(g.current=e)},_dynamicHeights:eo||I,_dynamicHeightsV2Experiment:er,_earlyBailout:ei,_getColumnSpanConfig:R,_logTwoColWhitespace:ef,align:t,columnWidth:U,gutterWidth:J,items:ex,layout:X?K:f??"basic",loadItems:x,measurementStore:Y,minCols:q,renderItem:eg,scrollContainer:ee,virtualBufferFactor:.3,virtualize:W})})]})})]})}},587435:(e,t,n)=>{n.d(t,{Z:()=>a});function a(e=!0){let t=e?16:void 0,n=t?Math.floor(t/4):void 0;return{experimentalColumnWidth:e?221:void 0,experimentalGutter:t,experimentalGutterBoints:n}}},39260:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(297728),i=n(730212),r=n(855746);function o(e){let{isAuthenticated:t}=(0,i.B)(),{expName:n,anyEnabled:o,group:l}=function({experimentsClient:e,handlerId:t,isAuthenticated:n,skipActivation:a}){let{checkExperiment:i}=e,r=i(n?"web_masonry_v2_auth":"web_masonry_v2_unauth",{dangerouslySkipActivation:a});return r.group?{expName:n?"web_masonry_v2_auth":"web_masonry_v2_unauth",...r}:"www/[username]/[slug].js"!==t||n?"www/pin/[id].js"!==t||n?{expName:"",anyEnabled:!1,group:""}:{expName:"web_masonry_v2_unauth_pin",...i("web_masonry_v2_unauth_pin",{dangerouslySkipActivation:a})}:{expName:"web_masonry_v2_unauth_board",...i("web_masonry_v2_unauth_board",{dangerouslySkipActivation:a})}}({experimentsClient:(0,a.F)(),handlerId:(0,r.MM)(),isAuthenticated:t,skipActivation:e?.skipActivation??!1});return{expName:n,anyEnabled:o,group:l,isMeasureAllEnabled:"enabled_measure_all"===l||"enabled_measure_all_impression_fix"===l,isImpressionFixEnabled:"control_impression_fix"===l||"enabled_impression_fix"===l||"enabled_measure_all_impression_fix"===l}}}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/168-e7734957066f600f.mjs.map