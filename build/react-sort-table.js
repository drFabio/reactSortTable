(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactSortTable = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Table = undefined;

var _react = (window.React);

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
                        var sortClassName = 'sortContainer ';
                        if (currentSort[key] == 1) {
                            sortClassName += 'sortContainer--top';
                        }
                        if (currentSort[key] == -1) {
                            sortClassName += 'sortContainer--bottom';
                        }
                        sortArrow = _react2.default.createElement(
                            'div',
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
                            _react2.default.createElement(
                                'span',
                                null,
                                text,
                                ' ',
                                sortArrow
                            )
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
            if (typeof _this2.props.dataFunctions != 'undefined' && _this2.props.dataFunctions.hasOwnProperty(key)) {
                return _react2.default.createElement(
                    'td',
                    { key: key + '_' + key },
                    _this2.props.dataFunctions[key](context, data)
                );
            } else if (data.hasOwnProperty(key)) {
                return _react2.default.createElement(
                    'td',
                    { key: key + '_' + key },
                    data[key]
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

},{"./sortTable.scss":2}],2:[function(require,module,exports){
module.exports = "table.table tr.active td {\n  background-color: #61b2a7;\n  color: #FFF; }\n\ntable.table tr.active td a, table.table tr.active td a:hover, table.table tr.active td a:visited, table.table tr.active td a:active {\n  color: #FFF; }\n\n.tableContainer {\n  position: relative; }\n\n.sortArrow {\n  opacity: 0.5; }\n\n.sortContainer {\n  display: inline-block; }\n\n.sortContainer--top .sortArrow--top {\n  opacity: 1; }\n\n.sortContainer--bottom .sortArrow--bottom {\n  opacity: 1; }\n\n.sortHeader:hover {\n  cursor: pointer; }\n\n/*# sourceMappingURL=data:application/json;base64,ewoJInZlcnNpb24iOiAzLAoJImZpbGUiOiAic29ydFRhYmxlLnNjc3MiLAoJInNvdXJjZXMiOiBbCgkJInNvcnRUYWJsZS5zY3NzIgoJXSwKCSJzb3VyY2VzQ29udGVudCI6IFsKCQkidGFibGUudGFibGUgdHIuYWN0aXZlIHRke1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM2MWIyYTc7XG4gICAgY29sb3I6ICNGRkY7XG59XG50YWJsZS50YWJsZSB0ci5hY3RpdmUgdGQge1xuICAgIGEsYTpob3ZlcixhOnZpc2l0ZWQsYTphY3RpdmV7XG4gICAgICAgIGNvbG9yOiAjRkZGO1xuICAgIH1cbn1cbi50YWJsZUNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnNvcnRBcnJvd3tcbiAgICBvcGFjaXR5OiAwLjU7ICBcbn1cbi5zb3J0Q29udGFpbmVye1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbi5zb3J0Q29udGFpbmVyLS10b3AgLnNvcnRBcnJvdy0tdG9we1xuICAgIG9wYWNpdHk6IDE7XG59XG4uc29ydENvbnRhaW5lci0tYm90dG9tIC5zb3J0QXJyb3ctLWJvdHRvbXtcbiAgICBvcGFjaXR5OiAxOyAgIFxufVxuLnNvcnRIZWFkZXI6aG92ZXJ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufSIKCV0sCgkibWFwcGluZ3MiOiAiQUFBQSxLQUFLLEFBQUEsTUFBTSxDQUFDLEVBQUUsQUFBQSxPQUFPLENBQUMsRUFBRSxDQUFBO0VBQ3BCLGdCQUFnQixFQUFFLE9BQVE7RUFDMUIsS0FBSyxFQUFFLElBQUssR0FDZjs7QUFDRCxLQUFLLEFBQUEsTUFBTSxDQUFDLEVBQUUsQUFBQSxPQUFPLENBQUMsRUFBRSxDQUNwQixDQUFDLEVBREwsS0FBSyxBQUFBLE1BQU0sQ0FBQyxFQUFFLEFBQUEsT0FBTyxDQUFDLEVBQUUsQ0FDbEIsQ0FBQyxBQUFBLE1BQU0sRUFEYixLQUFLLEFBQUEsTUFBTSxDQUFDLEVBQUUsQUFBQSxPQUFPLENBQUMsRUFBRSxDQUNWLENBQUMsQUFBQSxRQUFRLEVBRHZCLEtBQUssQUFBQSxNQUFNLENBQUMsRUFBRSxBQUFBLE9BQU8sQ0FBQyxFQUFFLENBQ0EsQ0FBQyxBQUFBLE9BQU8sQ0FBQTtFQUN4QixLQUFLLEVBQUUsSUFBSyxHQUNmOztBQUVMLGVBQWUsQ0FBQztFQUNaLFFBQVEsRUFBRSxRQUFTLEdBQ3RCOztBQUNELFVBQVUsQ0FBQTtFQUNOLE9BQU8sRUFBRSxHQUFJLEdBQ2hCOztBQUNELGNBQWMsQ0FBQTtFQUNWLE9BQU8sRUFBRSxZQUFhLEdBQ3pCOztBQUNELG1CQUFtQixDQUFDLGVBQWUsQ0FBQTtFQUMvQixPQUFPLEVBQUUsQ0FBRSxHQUNkOztBQUNELHNCQUFzQixDQUFDLGtCQUFrQixDQUFBO0VBQ3JDLE9BQU8sRUFBRSxDQUFFLEdBQ2Q7O0FBQ0QsV0FBVyxBQUFBLE1BQU0sQ0FBQTtFQUNiLE1BQU0sRUFBRSxPQUFRLEdBQ25CIiwKCSJuYW1lcyI6IFtdCn0= */";
},{}]},{},[1])(1)
});