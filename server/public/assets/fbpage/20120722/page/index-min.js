KISSY.add("utils/build-page",function(a){function c(){var c=b(".fb-build-page"),d=this;c.on("click",function(c){c.preventDefault();var e=b(c.target),f=e.siblings(".status"),g=e.siblings("input");f.html("building...");var h=g.val();a.ajax({url:e.attr("href"),data:{timestamp:h},dataType:"json",success:function(a){if(a.err){var b=a.err;f.html("Error:"+b.message);return}f.html("success!"),setTimeout(function(){f.html("")},2e3),a.reports&&d.fire("report",{reports:a.reports})}})})}var b=a.all;return a.extend(c,a.Base),new c}),KISSY.add("utils/calendar-init",function(a,b,c){var d=a.all;return{init:function(e){var f=new c.Popup({width:192});f.render();var g=(new b(f.get("contentEl"))).on("select",function(b){this.targetInput&&d(this.targetInput).val(a.Date.format(b.date,"yyyymmdd")),f.hide()});d(e.triggers).on("click",function(a){f.show();var b=d(a.target);f.align(b,["bl","tl"]),g.targetInput=b}),d("body").on("mousedown",function(a){f.get("contentEl").contains(a.target)||f.hide()})}}},{requires:["calendar","overlay","calendar/assets/base.css"]}),KISSY.add("page/mods/reporter",function(a,b,c,d,e,f,g,h){var i=a.all,j=function(b){var c=this;c.$el=i(b);if(!c.$el||!c.$el.length)throw new Error("container is not found");a.ready(function(){c.init()})};return a.extend(j,a.Base,{init:function(){var a=this;i("body").delegate("click",".report-plugin-item-hd",function(a){var b=i(a.currentTarget).siblings(".report-plugin-item-bd");b&&b.toggle()})},addReport:function(b){var c=this,d={};a.each(b,function(a,b){c.renderer[b]&&a&&(d[b]=c.renderer[b].call(c,a))});var e=j.template_wrap.render(d),b=c.$el.all(".report");b.length>0?i(e).insertBefore(b[0]):i(e).appendTo(c.$el)},pluginRenderer:{csslint:function(a){return j.template_csslint.render(a)},"kissy-template":function(a){return j.template_kissy_template.render(a)},uglifyjs:function(a){return j.template_uglifyjs.render(a)}},renderer:{fb:function(a){return j.template_fb.render(a)},plugins:function(b){var c=this,d=[];return console.log(b),a.each(b,function(a){var b=a.name,e=c.pluginRenderer[b]||null,f=e?e(a):"";console.log(b),d.push(j.template_plugin.render({name:b,content:f}))}),d.join("")}}},{template_fb:b(c.html),template_plugin:b(e.html),template_wrap:b(d.html),template_csslint:b(f.html),template_kissy_template:b(g.html),template_uglifyjs:b(h.html)}),j},{requires:["template","page/template/report-fb.tpl","page/template/report-wrap.tpl","page/template/report-plugin.tpl","page/template/report-csslint.tpl","page/template/report-kissy-template.tpl","page/template/report-uglifyjs.tpl"]}),KISSY.add("page/template/report-fb.tpl",function(){return{html:"<div class=\"report-fb\">\n    <div class=\"row-fluid\">\n        <dl class='span4'>\n            <dt>\u7248\u672c</dt>\n            <dd>{{build_version}}</dd>\n        </dl>\n        <dl class='span4'>\n            <dt>\u6253\u5305\u65f6\u95f4\u6233</dt>\n            <dd>{{build_timestamp}}</dd>\n        </dl>\n        <dl class='span4'>\n            <dt>\u7528\u65f6</dt>\n            <dd>{{build_used_time}}ms</dd>\n        </dl>\n    </div>\n</div>"}}),KISSY.add("page/template/report-wrap.tpl",function(){return{html:'<div class="report">\n    <div class="report-hd">{{fb}}</div>\n    <div class="report-bd">{{plugins}}</div>\n</div>'}}),KISSY.add("page/template/report-plugin.tpl",function(){return{html:'<div class="report-plugin-item">\n    <div class="report-plugin-item-hd">\n        <h4>{{#if content}}<i class="icon-file"></i>{{/if}}{{name}}</h4>\n    </div>\n    {{#if content}}\n    <div class=\'report-plugin-item-bd\'>{{content}}</div>\n    {{/if}}\n</div>'}}),KISSY.add("page/template/report-csslint.tpl",function(){return{html:"<div class=\"csslint-list\">\n    {{#each lintReport as item}}\n        <div class='csslint-list-item'>\n            <h4 class='csslint-file'>{{item.file}}</h4>\n            <p>{{item.fullpath}}</p>\n            <pre>{{item.output}}</pre>\n        </div>\n    {{/each}}\n</div>\n<div class='plugin-build-info'>\n    \u7528\u65f6 {{used_time}} ms\n</div>"}}),KISSY.add("page/template/report-kissy-template.tpl",function(){return{html:"<h4>file list</h4>\n<ul>\n    {{#each files as file}}\n        <li>\n            {{file}}\n        </li>\n    {{/each}}\n</ul>\n<div class='plugin-build-info'>\n    \u7528\u65f6 {{used_time}} ms\n</div>"}}),KISSY.add("page/template/report-uglifyjs.tpl",function(){return{html:"<h4>file list</h4>\n<ul>\n    {{#each files as file}}\n        <li>\n            {{file}}\n        </li>\n    {{/each}}\n</ul>\n<div class='plugin-build-info'>\n    \u7528\u65f6 {{used_time}} ms\n</div>"}}),KISSY.add("page/index",function(a,b,c,d){var e=a.all;a.ready(function(){var a=new d("#reports");b.on("report",function(b){a.addReport(b.reports)}),c.init({triggers:"input.timestamp-input"})})},{requires:["utils/build-page","utils/calendar-init","./mods/reporter"]}); 