import Table from '../../../src/Table.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

const headers = {
    first:{'text':'1st column'},
    second:{'text':'2nd Sortable',sortable:true},
    third:{'text':'3rd also sortable',sortable:true},
    fourth:{'text':'4th'}
}
const tableData = [
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'},
    {first:'foo',second:'bar',third:'baz',fourth:'xpto'}
];
const FullExample = React.createClass({
        data:tableData,
        sortChange(field,direction){
            this.state.sort= {}
            this.state.sort[field] = direction
            this.setState(this.state)
        },
        render(){
            return(
                <Table headers={headers}>
                    <Table.header
                        onSortChange={this.sortChange}
                        sort={this.state.sort}
                    />
                    <Table.body 
                        data ={tableData}
                    />
                    <Table.footer
                    >
                        I Am A footer
                    </Table.footer>
                </Table>
            )
        },
        getInitialState() {
            return {
                sort:{third:1}  
            };
        },
});
const Bootstrap =  React.createClass({
        data:tableData,
        sortChange(field,direction){
            this.state.sort= {}
            this.state.sort[field] = direction
            this.setState(this.state)
        },
        render(){
            const up = (
                <span className="sortArrow sortArrow--top glyphicon glyphicon-triangle-top"></span>
            )
            const down = (
                <span className="sortArrow sortArrow--bottom glyphicon glyphicon-triangle-bottom"></span>
            )
            return(
                <Table 
                    tableClass='table table-striped'
                    headers={headers}>
                    <Table.header
                        onSortChange={this.sortChange}
                        sort={this.state.sort}
                        upArrow={up}
                        downArrow={down}
                    />
                    <Table.body 
                        data ={tableData}
                    />
                    <Table.footer
                    >
                        I Am A footer
                    </Table.footer>
                </Table>
            )
        },
        getInitialState() {
            return {
                sort:{third:1}  
            };
        },
});


ReactDOM.render(<FullExample/>, document.getElementById('sortTable'));
ReactDOM.render(<Bootstrap/>, document.getElementById('bootstrap'));

