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
                        return _react2.default.createElement(
                            'th',
                            { key: text, className: 'sortHeader', onClick: function onClick() {
                                    _this.changeOrder(key);
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: sortClassName },
                                text,
                                _react2.default.createElement('span', { className: 'sortArrow sortArrow--top glyphicon glyphicon-triangle-top' }),
                                _react2.default.createElement('span', { className: 'sortArrow sortArrow--bottom glyphicon glyphicon-triangle-bottom' })
                            )
                        );
                    } else {
                        return _react2.default.createElement(
                            'th',
                            { key: text },
                            text
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
module.exports = "table.table tr.active td {\n  background-color: #61b2a7;\n  color: #FFF; }\n\ntable.table tr.active td a, table.table tr.active td a:hover, table.table tr.active td a:visited, table.table tr.active td a:active {\n  color: #FFF; }\n\n.tableContainer {\n  position: relative; }\n\n.sortArrow {\n  opacity: 0.5; }\n\n.sortContainer {\n  display: inline-block;\n  white-space: nowrap; }\n\n.sortContainer--top .sortArrow--top {\n  opacity: 1; }\n\n.sortContainer--bottom .sortArrow--bottom {\n  opacity: 1; }\n\n.sortHeader:hover {\n  cursor: pointer; }\n\n/*# sourceMappingURL=data:application/json;base64,ewoJInZlcnNpb24iOiAzLAoJImZpbGUiOiAic29ydFRhYmxlLnNjc3MiLAoJInNvdXJjZXMiOiBbCgkJInNvcnRUYWJsZS5zY3NzIgoJXSwKCSJzb3VyY2VzQ29udGVudCI6IFsKCQkidGFibGUudGFibGUgdHIuYWN0aXZlIHRke1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM2MWIyYTc7XG4gICAgY29sb3I6ICNGRkY7XG59XG50YWJsZS50YWJsZSB0ci5hY3RpdmUgdGQge1xuICAgIGEsYTpob3ZlcixhOnZpc2l0ZWQsYTphY3RpdmV7XG4gICAgICAgIGNvbG9yOiAjRkZGO1xuICAgIH1cbn1cbi50YWJsZUNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnNvcnRBcnJvd3tcbiAgICBvcGFjaXR5OiAwLjU7ICBcbn1cbi5zb3J0Q29udGFpbmVye1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuLnNvcnRDb250YWluZXItLXRvcCAuc29ydEFycm93LS10b3B7XG4gICAgb3BhY2l0eTogMTtcbn1cbi5zb3J0Q29udGFpbmVyLS1ib3R0b20gLnNvcnRBcnJvdy0tYm90dG9te1xuICAgIG9wYWNpdHk6IDE7ICAgXG59XG4uc29ydEhlYWRlcjpob3ZlcntcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59IgoJXSwKCSJtYXBwaW5ncyI6ICJBQUFBLEtBQUssQUFBQSxNQUFNLENBQUMsRUFBRSxBQUFBLE9BQU8sQ0FBQyxFQUFFLENBQUE7RUFDcEIsZ0JBQWdCLEVBQUUsT0FBUTtFQUMxQixLQUFLLEVBQUUsSUFBSyxHQUNmOztBQUNELEtBQUssQUFBQSxNQUFNLENBQUMsRUFBRSxBQUFBLE9BQU8sQ0FBQyxFQUFFLENBQ3BCLENBQUMsRUFETCxLQUFLLEFBQUEsTUFBTSxDQUFDLEVBQUUsQUFBQSxPQUFPLENBQUMsRUFBRSxDQUNsQixDQUFDLEFBQUEsTUFBTSxFQURiLEtBQUssQUFBQSxNQUFNLENBQUMsRUFBRSxBQUFBLE9BQU8sQ0FBQyxFQUFFLENBQ1YsQ0FBQyxBQUFBLFFBQVEsRUFEdkIsS0FBSyxBQUFBLE1BQU0sQ0FBQyxFQUFFLEFBQUEsT0FBTyxDQUFDLEVBQUUsQ0FDQSxDQUFDLEFBQUEsT0FBTyxDQUFBO0VBQ3hCLEtBQUssRUFBRSxJQUFLLEdBQ2Y7O0FBRUwsZUFBZSxDQUFDO0VBQ1osUUFBUSxFQUFFLFFBQVMsR0FDdEI7O0FBQ0QsVUFBVSxDQUFBO0VBQ04sT0FBTyxFQUFFLEdBQUksR0FDaEI7O0FBQ0QsY0FBYyxDQUFBO0VBQ1YsT0FBTyxFQUFFLFlBQWE7RUFDdEIsV0FBVyxFQUFFLE1BQU8sR0FDdkI7O0FBQ0QsbUJBQW1CLENBQUMsZUFBZSxDQUFBO0VBQy9CLE9BQU8sRUFBRSxDQUFFLEdBQ2Q7O0FBQ0Qsc0JBQXNCLENBQUMsa0JBQWtCLENBQUE7RUFDckMsT0FBTyxFQUFFLENBQUUsR0FDZDs7QUFDRCxXQUFXLEFBQUEsTUFBTSxDQUFBO0VBQ2IsTUFBTSxFQUFFLE9BQVEsR0FDbkIiLAoJIm5hbWVzIjogW10KfQ== */";
},{}]},{},[1])(1)
});