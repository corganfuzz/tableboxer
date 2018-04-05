import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";

const CheckboxTable = checkboxHOC(ReactTable);

const AppBoxer = (props) => {
    return (
      <div>
          <CheckboxTable
            keyField="stackDefId"
            filterable
            noDataText="Value not found"
            ref={x => (this.checkboxTable = x)}
            data={props.Appdata}
            columns={props.Appcolumns}
            defaultPageSize={10}
            toggleSelection={props.toggleAppSelection}
            isSelected={props.isAppSelected}
            selectType={props.selectType}
            selectAll={props.selectAllApps}
            toggleAll={props.toggleAllapps}
          />
      </div>
    );
}

export default AppBoxer;
