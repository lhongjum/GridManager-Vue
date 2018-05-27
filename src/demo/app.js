import Vue from 'vue';
import './style.css';
import GridManager from '../js/index';

Vue.use(GridManager);

const colData = [
    {
        key: 'pic',
        remind: 'the pic',
        width: '110px',
        align: 'center',
        text: '缩略图',
        sorting: '',
        // 使用函数返回 dom node
        template: function (pic, rowObject) {
            var picNode = document.createElement('a');
            picNode.setAttribute('href', `http://www.lovejavascript.com/#!zone/blog/content.html?id=${rowObject.id}`);
            picNode.setAttribute('title', rowObject.title);
            picNode.setAttribute('target', '_blank');
            picNode.title = `点击阅读[${rowObject.title}]`;
            picNode.style.display = 'block';
            picNode.style.height = '68.5px';

            var imgNode = document.createElement('img');
            imgNode.style.width = '100px';
            imgNode.style.padding = '5px';
            imgNode.style.margin = '0 auto';
            imgNode.alt = rowObject.title;
            imgNode.src = `http://www.lovejavascript.com/${pic}`;

            picNode.appendChild(imgNode);
            return picNode;
        }
    }, {
        key: 'title',
        remind: 'the title',
        width: '300px',
        align: 'left',
        text: '标题',
        sorting: '',
        // 使用函数返回 dom node
        template: function (title, rowObject) {
            var titleNode = document.createElement('a');
            titleNode.setAttribute('href', `http://www.lovejavascript.com/#!zone/blog/content.html?id=${rowObject.id}`);
            titleNode.setAttribute('title', title);
            titleNode.setAttribute('target', '_blank');
            titleNode.innerText = title;
            titleNode.title = `点击阅读[${rowObject.title}]`;
            titleNode.classList.add('plugin-action');

            return titleNode;
        }
    }, {
        key: 'type',
        remind: 'the type',
        text: '类型',
        align: 'center',
        isShow: false,
        template: function (type, rowObject) {
            return `
                    <select disabled>
                        <option value="1" ${type === 1 ? 'selected="selected"' : ''}>HTML/CSS</option>
                        <option value="2" ${type === 2 ? 'selected="selected"' : ''}>nodeJS</option>
                        <option value="3" ${type === 3 ? 'selected="selected"' : ''}>javaScript</option>
                        <option value="4" ${type === 4 ? 'selected="selected"' : ''}>前端鸡汤</option>
                        <option value="5" ${type === 5 ? 'selected="selected"' : ''}>PM Coffee</option>
                        <option value="6" ${type === 6 ? 'selected="selected"' : ''}>前端框架</option>
                        <option value="7" ${type === 76 ? 'selected="selected"' : ''}>前端相关</option>
                    </select>`;
        }
    }, {
        key: 'info',
        remind: 'the info',
        text: '简介',
        isShow: false
    }, {
        key: 'username',
        remind: 'the username',
        width: '100px',
        align: 'center',
        text: '作者',
        template: function (username) {
            return `<a class="plugin-action" href="https://github.com/baukh789" target="_blank" title="去看看${username}的github">${username}</a>`;
        }
    }, {
        key: 'createDate',
        remind: 'the createDate',
        width: '100px',
        text: '创建时间',
        sorting: 'DESC',
        // 使用函数返回 htmlString
        template: function (createDate, rowObject) {
            return new Date(createDate).toLocaleDateString();
        }
    }, {
        key: 'lastDate',
        remind: 'the lastDate',
        width: '100px',
        text: '最后修改时间',
        sorting: '',
        // 使用函数返回 htmlString
        template: function (lastDate, rowObject) {
            return new Date(lastDate).toLocaleDateString();
        }
    }, {
        key: 'action',
        remind: 'the action',
        width: '10%',
        align: 'center',
        text: '<span style="color: red">操作</span>',
        // 直接返回 htmlString
        template: '<span class="plugin-action" gm-click="delectRow">删除</span>'
    }
];
const app = new Vue({
    el: '#app',
    data: {
        // 表单数据
        formData: {
            name: '',
            info: '',
            url: ''
        },

        // 初始化按纽禁用标识
        initDisabled: true,

        // 销毁按纽禁用标识
        destroyDisabled: true,

        // GM所需参数
        option: {
            gridManagerName: "testVue",
            ajax_url: 'http://www.lovejavascript.com/blogManager/getBlogList',
            // 初始渲染时是否加载数据
            // firstLoading: false,
            // height: document.documentElement.clientHeight + 'px', // 全屏
            height: '400px',
            columnData: colData,
            supportRemind: true,
            isCombSorting: true,
            supportAjaxPage: true,
            supportSorting: true,
            ajax_type: "POST",
            query: {pluginId: 1},
            pageSize: 20
        }
    },
    methods: {
        // 测试vue下的GM事件
        delectRow: function (row) {
            if (window.confirm('确认要删除[' + row.title + ']?')) {
                console.log('----删除操作开始----');
                this.$refs['grid'].$el.GM('refreshGrid');
                console.log('数据没变是正常的, 因为这只是个示例,并不会真实删除数据.');
                console.log('----删除操作完成----');
                console.log('');
            }
        },

        // 事件: 搜索
        onSearch: function () {
            var params = Object.assign({cPage: 1}, this.formData);
            this.$refs['grid'].$el.GM('setQuery', params, function () {
                console.log('setQuery执行成功');
            });
        },

        // 事件: 重置
        onReset: function () {
            this.formData.name = '';
            this.formData.info = '';
            this.formData.url = '';
        },

        // 事件: 初始化
        onInit: function () {
            this.$refs['grid'].$el.GM('init', this.option);
            this.initDisabled = true;
            this.destroyDisabled = false;
        },

        // 事件: 销毁
        onDestroy: function () {
            this.$refs['grid'].$el.GM('destroy');
            this.initDisabled = false;
            this.destroyDisabled = true;
        }
    },

    // 创建完成
    created: function () {
        this.initDisabled = true;
        this.destroyDisabled = false;
    }
});
