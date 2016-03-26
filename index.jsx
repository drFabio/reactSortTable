import React from 'react';
import {Paginator} from '../'
export const Table = React.createClass({
    render(){
        const headers = this.props.headers || [];
        let foo = null
        let  className = 'table table-striped'
        let overlay = null
        if(this.props.loading){
            className+=' loading'
            overlay = <div className='overlay'><h2>Carregando...</h2></div>
        }
        return(
                <div className="tableContainer">
                    <table className="table table-striped">
                        {this.props.children}
                    </table>
                    {overlay}
                </div>
        )
    },
    childContextTypes: {
        headers: React.PropTypes.object,
        keys: React.PropTypes.array
    },
    getChildContext: function() {
        const keys = (this.props.headers?Object.keys(this.props.headers):[])
        return {headers: this.props.headers,keys: keys}
    }
})
Table.header = React.createClass({
    changeOrder(key){
        const currentSort = this.props.sort || {}
        const direction = this.props.sort[key]==-1?1:-1
        this.props.onSortChange(key,direction)
    },
    render(){
        const headers = this.context.headers
        const keys = Object.keys(this.context.headers) || [];
        const currentSort = this.props.sort || {}
        return(
            <thead>
                <tr>
                    {
                        keys.map((key)=>{
                            const item = headers[key]
                            const text = item.text || item
                            const sortable = item.sortable || false
                            let sortArrow = null
                            if(sortable){
                                let sortClassName = ''
                                if(currentSort[key]==1){
                                    sortClassName= 'sortContainer--top'
                                }
                                if(currentSort[key]==-1){
                                    sortClassName= 'sortContainer--bottom'
                                }
                                sortArrow = (
                                    <span className={sortClassName}>
                                        <span className="sortArrow sortArrow--top glyphicon glyphicon-triangle-top"></span>
                                        <span className="sortArrow sortArrow--bottom glyphicon glyphicon-triangle-bottom"></span>
                                    </span>
                                )
                                return <th key={text} className="sortHeader" onClick={()=>{this.changeOrder(key)}}>{text} {sortArrow}</th>
                            }
                            else{
                                return <th key={text}>{text} {sortArrow}</th>
                            }
                        })
                    }
                </tr>
            </thead>
        )
    },
    contextTypes: {
        headers: React.PropTypes.object,
        keys: React.PropTypes.array
    }
})
Table.body = React.createClass({
    getContent(data,index){
        const context = this.props.context
        const key = index
        const tds = this.context.keys.map((key)=>{
            if(data.hasOwnProperty(key)){
                return (<td  key={key+'_'+key}>{data[key]}</td>)
            }
            else if(this.props.dataFunctions.hasOwnProperty(key)){
                return (<td key={key+'_'+key}>{this.props.dataFunctions[key](context,data)}</td>)
            }
            else{
                return (<td  key={key+'_'+key}></td>)
            }
        })
        let className = ''
        if(this.props.getClassForItem){
            className = this.props.getClassForItem(context, data)
        }
        return <tr  key={key} className={className}>{tds}</tr>
    },
    render(){
        return (
             <tbody>
                {
                    this.props.data.map((data,index)=>{
                        return this.getContent(data, index);
                    })
                }
            </tbody>
        )
    },
    contextTypes: {
        keys: React.PropTypes.array
    }

})
Table.footer = React.createClass({
    render(){
        return(
            <tfoot>
                <tr>
                    <td colSpan="100%">
                        {this.props.children}
                    </td>
                </tr>
            </tfoot>
        )
    },
    contextTypes: {
        loading: React.PropTypes.bool
    }
})
require('./table.scss')