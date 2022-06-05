import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

//import { generateRows } from '../../../demo-data/generator';

export default Sorting = () => {
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    // { name: 'city', title: 'City' },
    // { name: 'car', title: 'Car' },
  ]);
  const [rows] = useState([
{name: "Linda" , gender: "Female" },    
{name: "Mark"  , gender: "Male"   },  
{name: "Sandr",  gender: "Female" },    
{name: "Rober",  gender: "Male"   }, 
{name: "Lisa" , gender: "Female"  },   
{name: "Paul" , gender: "Male"    }, 
{name: "Mark" , gender: "Male"    }, 
{name: "Paul" , gender: "Male"    } 
]);


  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingState
          defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
        />
        <IntegratedSorting />
        <Table />
        <TableHeaderRow showSortingControls />
      </Grid>
    </Paper>
  );
};