import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Checkbox,
  TableSortLabel,
  Button
} from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box } from '@mui/system';
import MainCard from 'ui-component/cards/MainCard';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router';
const BasicApptable = () => {
  const [Data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const downloadStyles = {
    cursor: 'pointer',
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://pulsehr-express-server.onrender.com/ats/');
      const newData = response.data.getData;
      console.log(newData);
      setData(newData);
      setLoader(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleView = (id) => {
    console.log(id + 'job id');
    const selectedId = Data.find((item) => item.id === id);

    navigate(`/view/${id}`, { state: { data: selectedId } });
  };

  const handleResume = async (id, name) => {
    try {
      const response = await axios.get(`https://pulsehr-express-server.onrender.com/ats/resume/${id}`, {
        responseType: 'arraybuffer'
      });
      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      saveAs(blob, `${name} resume.pdf`);
    } catch (error) {
      console.log('Error downloading resume:', error);
    }
  };

  const handlePhotoDown = async (id, name) => {
    try {
      const response = await axios.get(`https://pulsehr-express-server.onrender.com/ats/photo/${id}`, {
        responseType: 'arraybuffer'
      });
      const contentType = response.headers['Content-Type'];
      const extension = contentType === 'image/jpeg' ? 'jpeg' : 'png';
      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: contentType });
      saveAs(blob, `${name}.${extension}`);
    } catch (error) {
      console.log('Error downloading photo:', error);
    }
  };

  const handleSelect = (id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelected = newSelected.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedItems.slice(0, selectedIndex), selectedItems.slice(selectedIndex + 1));
    }

    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === Data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(Data.map((item) => item._id));
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const sortedData = stableSort(Data, getComparator(order, orderBy));

  return (
    <MainCard title="Application Tracker">
      <CSVLink data={Data}>
        <Button
          sx={{
            position: 'absolute',
            top: '128px',
            right: '50px',
            color: '#5e35b1',
            '&:hover': {
              backgroundColor: '#ede7f6'
            }
          }}
        >
          Export Excel
        </Button>
      </CSVLink>

      <TableContainer component={Paper}>
        {loader ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedItems.length > 0 && selectedItems.length < Data.length}
                    checked={selectedItems.length === Data.length}
                    onChange={() => handleSelectAll()}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'position'}
                    direction={orderBy === 'position' ? order : 'asc'}
                    onClick={() => handleSort('position')}
                  >
                    Job Role
                  </TableSortLabel>
                </TableCell>
                <TableCell>Photo</TableCell>
                <TableCell>Resume</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((x) => (
                <TableRow key={x._id}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedItems.indexOf(x._id) !== -1} onChange={() => handleSelect(x._id)} />
                  </TableCell>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{x.position}</TableCell>
                  <TableCell>
                    {x.photo && (
                      <Tooltip title="Download Photo">
                        <InsertPhotoIcon style={downloadStyles} onClick={() => handlePhotoDown(x._id, x.name)} />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    {x.resume && (
                      <Tooltip title="Download Resume">
                        <TextSnippetIcon style={downloadStyles} onClick={() => handleResume(x._id, x.name)} />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>{x.phone}</TableCell>
                  <TableCell>{x.email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Click to View">
                      <VisibilityIcon
                        fontSize="small"
                        onClick={() => {
                          handleView(x._id);
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </MainCard>
  );
};

export default BasicApptable;
