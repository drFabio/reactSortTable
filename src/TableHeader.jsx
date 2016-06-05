import React from 'react';
class TableHeader extends React.Component {
    constructor(props){
        super(props)
        this._changeOrder = this.changeOrder.bind(this)
        this._getHeaderForKey = this.getHeaderForKey.bind(this)
        this._classTh = 'sortHeader'
        this._getHeaderForKey = this.getHeaderForKey.bind(this)
    }
    changeOrder(key){
        const currentSort = this.props.sort || {}
        const direction = this.props.sort[key]==-1?1:-1
        if(this.props.hasOwnProperty('onSortChange')){
            this.props.onSortChange(key,direction)
        }
    }
    getHeaderForKey(key,properties){
        const currentSort = this.props.sort || {}   
        const text = properties.text || key
        const sortable = properties.sortable || false
        let isUp = null;
        let upArrow = null
        let downArrow = null
        if(sortable){
            if(currentSort[key]==1){
                isUp = true
            }
            else if(currentSort[key]==-1){
                isUp = false
            }
            upArrow = this.getUpArrow(isUp===true)
            downArrow = this.getDownArrow(isUp===false)

        }
        const sortClassName = this.getSortClassName(isUp)
        return (
            <th key={text} className={this._classTh} onClick={()=>{this.changeOrder(key)}}>
                <div className={sortClassName}>
                    {text}
                    {upArrow}
                    {downArrow}
                </div>
            </th>
        )

    }
    getUpArrow(active){
        if(this.props.hasOwnProperty('upArrow')){
            return this.props.upArrow
        }
        return (
            <span className="sortArrow sortArrow--top"></span>
        )
    }

    getDownArrow(actie){
        if(this.props.hasOwnProperty('downArrow')){
            return this.props.downArrow
        }
        return (
            <span className="sortArrow sortArrow--bottom"></span>
        )
    }
    getSortClassName(isUp){
        let className = 'sortContainer '
        if(isUp===true){
            className+='sortContainer--top'
        }
        if(isUp===false){
            className+='sortContainer--bottom'
        }
        return className
    }
    render(){
        const headers = this.context.headers
        const keys = Object.keys(this.context.headers) || [];
        const currentSort = this.props.sort || {}
        return(
            <thead>
                <tr>
                    {
                        keys.map((key)=>{
                            return this._getHeaderForKey(key,headers[key])
                        })
                    }
                </tr>
            </thead>
        )
    }
}
TableHeader.contextTypes = {
    headers: React.PropTypes.object
}
TableHeader.propTypes = {
    onSortChange:React.PropTypes.func,
    sort:React.PropTypes.object,
    upArrow: React.PropTypes.element,
    downArrow: React.PropTypes.element
}
TableHeader.defaultProps = {
    sort:{}
}
export default TableHeader
export {TableHeader}