import React from 'react';
import TableHeader from './TableHeader'
import TableFooter from './TableFooter'
import TableBody from './TableBody'
class Table extends React.Component {
    constructor(props) {
        super(props)
        this._tableClass = 'table'
        this._containerClass = 'tableContainer'
        this._getDefaultContent = this.getDefaultContent.bind(this)
    }
    render(){
        if(this.props.children){
            content = (
                <table className={this._tableClass}>
                    {this.props.children}
                </table>
            )
        }
        else{
            content = this._getDefaultContent()
        }
        return (
             <div className={this._containerClass}>
                {content}
             </div>
        )
    }
    getDefaultContent(){
        return (
            <table className={this._tableClass}>
                <Table.header
                    onSortChange={this.props.onSortChange}
                    sort={this.props.sort}
                />
                <Table.body 
                    data={this.props.data}
                />
            </table>
        )
    }
    getChildContext() {
        return {headers: this.props.headers}
    }

}
Table.header = TableHeader
Table.footer = TableFooter
Table.body = TableBody
Table.childContextTypes = {
    headers: React.PropTypes.object
}
export default Table
export {Table}