import React from 'react';
class TableFooter extends React.Component {
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
    }
}
export default TableFooter
export {TableFooter}