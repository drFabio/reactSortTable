'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Table = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = exports.Table = _react2.default.createClass({
    displayName: 'Table',
    render: function render() {
        var headers = this.props.headers || [];
        var foo = null;
        var className = 'table table-striped';
        var overlay = null;
        if (this.props.loading) {
            className += ' loading';
            overlay = _react2.default.createElement(
                'div',
                { className: 'overlay' },
                _react2.default.createElement(
                    'h2',
                    null,
                    'Carregando...'
                )
            );
        }
        return _react2.default.createElement(
            'div',
            { className: 'tableContainer' },
            _react2.default.createElement(
                'table',
                { className: 'table table-striped' },
                this.props.children
            ),
            overlay
        );
    },

    childContextTypes: {
        headers: _react2.default.PropTypes.object,
        keys: _react2.default.PropTypes.array
    },
    getChildContext: function getChildContext() {
        var keys = this.props.headers ? Object.keys(this.props.headers) : [];
        return { headers: this.props.headers, keys: keys };
    }
});
Table.header = _react2.default.createClass({
    displayName: 'header',
    changeOrder: function changeOrder(key) {
        var currentSort = this.props.sort || {};
        var direction = this.props.sort[key] == -1 ? 1 : -1;
        this.props.onSortChange(key, direction);
    },
    render: function render() {
        var _this = this;

        var headers = this.context.headers;
        var keys = Object.keys(this.context.headers) || [];
        var currentSort = this.props.sort || {};
        return _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
                'tr',
                null,
                keys.map(function (key) {
                    var item = headers[key];
                    var text = item.text || item;
                    var sortable = item.sortable || false;
                    var sortArrow = null;
                    if (sortable) {
                        var sortClassName = '';
                        if (currentSort[key] == 1) {
                            sortClassName = 'sortContainer--top';
                        }
                        if (currentSort[key] == -1) {
                            sortClassName = 'sortContainer--bottom';
                        }
                        sortArrow = _react2.default.createElement(
                            'span',
                            { className: sortClassName },
                            _react2.default.createElement('span', { className: 'sortArrow sortArrow--top glyphicon glyphicon-triangle-top' }),
                            _react2.default.createElement('span', { className: 'sortArrow sortArrow--bottom glyphicon glyphicon-triangle-bottom' })
                        );
                        return _react2.default.createElement(
                            'th',
                            { key: text, className: 'sortHeader', onClick: function onClick() {
                                    _this.changeOrder(key);
                                } },
                            text,
                            ' ',
                            sortArrow
                        );
                    } else {
                        return _react2.default.createElement(
                            'th',
                            { key: text },
                            text,
                            ' ',
                            sortArrow
                        );
                    }
                })
            )
        );
    },

    contextTypes: {
        headers: _react2.default.PropTypes.object,
        keys: _react2.default.PropTypes.array
    }
});
Table.body = _react2.default.createClass({
    displayName: 'body',
    getContent: function getContent(data, index) {
        var _this2 = this;

        var context = this.props.context;
        var key = index;
        var tds = this.context.keys.map(function (key) {
            if (data.hasOwnProperty(key)) {
                return _react2.default.createElement(
                    'td',
                    { key: key + '_' + key },
                    data[key]
                );
            } else if (typeof _this2.props.dataFunctions != 'undefined' && _this2.props.dataFunctions.hasOwnProperty(key)) {
                return _react2.default.createElement(
                    'td',
                    { key: key + '_' + key },
                    _this2.props.dataFunctions[key](context, data)
                );
            } else {
                return _react2.default.createElement('td', { key: key + '_' + key });
            }
        });
        var className = '';
        if (this.props.getClassForItem) {
            className = this.props.getClassForItem(context, data);
        }
        return _react2.default.createElement(
            'tr',
            { key: key, className: className },
            tds
        );
    },
    render: function render() {
        var _this3 = this;

        return _react2.default.createElement(
            'tbody',
            null,
            this.props.data.map(function (data, index) {
                return _this3.getContent(data, index);
            })
        );
    },

    contextTypes: {
        keys: _react2.default.PropTypes.array
    }

});
Table.footer = _react2.default.createClass({
    displayName: 'footer',
    render: function render() {
        return _react2.default.createElement(
            'tfoot',
            null,
            _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    { colSpan: '100%' },
                    this.props.children
                )
            )
        );
    },

    contextTypes: {
        loading: _react2.default.PropTypes.bool
    }
});
exports.default = Table;

require('./sortTable.scss');
//# sourceMappingURL=sortTable.js.map