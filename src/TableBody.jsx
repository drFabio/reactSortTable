import React from 'react';
class TableBody extends React.Component {
    constructor(props){
        super(props)
        this._getContent = this.getContent.bind(this)
    }
    getContent(data,index){
        const context = this.props.context
        const key = index
        const keys = Object.keys(this.context.headers)
        const tds = keys.map((key)=>{
            if(typeof this.props.dataFunctions != 'undefined' && this.props.dataFunctions.hasOwnProperty(key)){
                return (<td key={key+'_td'}>{this.props.dataFunctions[key](context,data)}</td>)
            }
            else if(data.hasOwnProperty(key)){
                return (<td  key={key+'_td'}>{data[key]}</td>)
            }
            else{
                return (<td  key={key+'_td'}></td>)
            }
        })
        let className = ''
        if(this.props.getClassForItem){
            className = this.props.getClassForItem(context, data)
        }
        return <tr  key={key} className={className}>{tds}</tr>
    }
    render(){
        return (
             <tbody>
                {
                    this.props.data.map((data,index)=>{
                        return this._getContent(data, index);
                    })
                }
            </tbody>
        )
    }
}
TableBody.contextTypes = {
    headers: React.PropTypes.object
}
TableBody.propTypes = {
    data:React.PropTypes.array.isRequired,
    dataFunctions: React.PropTypes.object,
    getClassForItem:React.PropTypes.func
}
export default TableBody
export {TableBody}