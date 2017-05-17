var tree                   = function () {
}
tree.prototype.loadTree    = function (data, pid) {
    var result = [], temp;
    for (var i in data) {
        if (data[i].pid == pid) {
            result.push(data[i]);
            temp = this.loadTree(data, data[i].id);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }
    }
    return result;
};
tree.prototype.loadElement = function (treeData) {
    var ul       = document.createElement('ul');
    ul.className = 'sidebar-nav sidebar-nav-sub';
    for (var i in treeData) {
        var li       = document.createElement('li');
        li.className = 'sidebar-nav-link';
        var a        = document.createElement('a');
        a.href       = treeData[i].url;
        if (treeData[i].children) {
            a.className = 'sidebar-nav-sub-title';
        }
        if (!!treeData[i].icon) {
            var icon       = document.createElement('i');
            icon.className = treeData[i].icon;
            a.appendChild(icon);
        }
        var span       = document.createElement('span');
        span.className = 'am-icon-angle-right sidebar-nav-link-logo';
        a.append(treeData[i].name);
        a.appendChild(span);
        li.appendChild(a);
        if (treeData[i].children) {
            li.appendChild(this.loadElement(treeData[i].children));
        }
        ul.appendChild(li);

    }
    return ul;
}

tree.prototype.loadHtml = function (data, parentId, menuId) {

    document.getElementById(menuId).innerHTML = this.loadElement(this.loadTree(data, parentId)).innerHTML;
}

// 侧边菜单
$.get('/sys/menus',function(result){
    new tree().loadHtml(result.data,'0','menu');
    $('.sidebar-nav-sub-title').on('click', function() {
        $(this).siblings('.sidebar-nav-sub').slideToggle(80)
            .end()
            .find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate');
    })
});

