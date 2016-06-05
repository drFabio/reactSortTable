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
const App = React.createClass({
        data:tableData,
        sortChange(){
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
                </Table>
            )
        },
        getInitialState() {
            return {
                sort:{third:1}  
            };
        },
});

ReactDOM.render(<App/>, document.getElementById('sortTable'));
