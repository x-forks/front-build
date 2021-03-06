/*
combined files : 

utils/app-history
page/template/app-history-tpl
page/index

*/
KISSY.add('utils/app-history',function (S) {
    if (!window.localStorage) {
        return null;
    }

    var KEY = 'AppHistory';

    function getList() {
        var src = localStorage.getItem(KEY);

        if (!src) {
            return [];
        }
        try {
            var list = src.split(',');
        } catch (e) {
            return [];
        }

        return list;
    }

    function saveList(list) {
        return localStorage.setItem(KEY, list.join(','));
    }

    return {
        push: function (path) {
            var list = getList();

            list = S.filter(list, function (item) {
                return item != path;
            });

            list.unshift(path);
            saveList(list);
        },
        
        get: function () {
            var list = getList();
            return list;
        },
        
        rm: function (path) {
            var list = getList();
            list = S.filter(list, function (item) {
                return item != path
            });
            saveList(list);
            return true;
        }
    }
});KISSY.add('page/template/app-history-tpl',function(){
    return {"html":"<h3>历史记录：</h3>\r\n{{#each his as item index}}\r\n<div class=\"his-item\">\r\n    <a class=\"his-title\" href=\"/app?root={{item}}\">{{item}}\t</a>\r\n    <a class=\"his-delete\" title=\"delete\" data-index=\"{{index}}\" href=\"#\">&times;</a>\r\n</div>\r\n{{/each}}\r\n"};
});KISSY.add('page/index',function (S, Template, appHistory, app_history_tpl) {
    var $ = S.all;
    if (appHistory) {
        S.ready(function () {
            var his = appHistory.get(),
                $el_his = $('#app-history');

            if (his.length) {
                $el_his.html(Template(app_history_tpl.html).render({
                    his: his
                }));
            }

            $('body').delegate('click', '.his-delete', function (ev) {
                ev.preventDefault();
                var elItem = $(ev.target).parent('.his-item');
                var path = S.trim(elItem.one('.his-title').text());

                if (appHistory.rm(path)) {
                    $(ev.target).parent('.his-item').fadeOut(.2);
                }
            });
        });
    }
}, {
    requires: ['template', 'utils/app-history', './template/app-history-tpl']
});