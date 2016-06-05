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
                    downArrow={this.props.downArrow}
                    upArrow={this.props.upArrow}
                />
                <Table.body 
                    data={this.props.data}
                    dataFunctions={this.props.dataFunctions}
                    getClassForItem={this.props.getClassForItem}
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
TableBody.propTypes = {
    //For Table 
    headers: React.PropTypes.object,
    //FOr header
    onSortChange:React.PropTypes.func,
    sort:React.PropTypes.object,
    upArrow: React.PropTypes.element,
    downArrow: React.PropTypes.element,
    //For body
    data:React.PropTypes.array.isRequired,
    dataFunctions: React.PropTypes.object,
    getClassForItem:React.PropTypes.func
}
export default Table
export {Table}