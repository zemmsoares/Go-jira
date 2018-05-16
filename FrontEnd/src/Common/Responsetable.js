import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
 
export default class ResponseTable extends React.Component {

    constructor(props) { // Use Props
        super(props); // Use Props
        this.columnsBuilder = this.columnsBuilder.bind(this);
    }
    columnsBuilder () { //Remove data
        if(this.props.data == 0){
           return
        }
        const props = Object.keys(this.props.data[0]); //Use Props
        const columns = props.map( (item, index) => ({
            Header : item,
            accessor : item,
            //Cell : propss => propss.original[item].length === 0 ? '[]' : propss.original[item].toString(),
        }));

        const built = [
            {
                Header : 'Response',
                columns,
            },
        ];        
        return built;
    }

    render() {
        return (
            <div>
                <ReactTable
                    data={this.props.data}
                    columns={this.columnsBuilder()} // Remove Props
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                <br />
            </div>
        );
    }
}
