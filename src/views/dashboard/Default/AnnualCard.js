import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Button, Grid, Typography, Card } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#12486B',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: 15,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  }
}));
const AddDialog = styled(Dialog)`
  && {
    height: 300px;
    width: 300px;
    justify-content: center !important;
    display: flex;
  }
`;
const SumbitButton = styled(Button)`
  && {
    width: 100%;
    background-color: #2196f3;
    margin-top: 40px;
    color: #ffff;
  }
`;
const AnnualCard = ({ isLoading }) => {
  const theme = useTheme();
  const [open, setopen] = useState(false);
  const [annualleave, setAnnualLeave] = useState('');

  const [employeeId, setEmployeeId] = useState('');
  const [selectemployee, setSelectemployee] = useState([]);

  const EmployeeId = selectemployee._id;

  const [allemployees, setAllemployees] = useState([]);
  console.log(allemployees);
  const [employeeleave, setEmployeeLeave] = useState('');
  const employee = useSelector((state) => state.customization.authId);

  const handleSubmit = async () => {
    try {
      const apiUrl = `https://pulsehr-express-server.onrender.com/api/updateemployee/${EmployeeId}`;
      const response = await axios.put(apiUrl, { annualLeave: annualleave });
      console.log(response.data);
      setAnnualLeave('');
      setSelectemployee([]);
      setopen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEmployeesData = async () => {
    try {
      const getall = await axios.get(`https://pulsehr-express-server.onrender.com/api/allemployee`);
      const employees = getall.data;
      console.log(employees);
      setAllemployees(employees);
      const empId = employee;
      const filteredEmployees = employees.filter((employee) => employee.employeeid === empId);
      setEmployeeId(filteredEmployees.map((emp) => emp._id));
      setEmployeeLeave(filteredEmployees.map((emp) => emp.annualLeave));
      console.log(employeeId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEmployeesData();
  }, []);
  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <Card elevation={3}>
          <CardWrapper border={false} content={false}>
            <Box sx={{ p: 2.25 }}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container justifyContent="space-between">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>ANNUAL LEAVE</Typography>
                      <Button onClick={() => setopen(true)} sx={{ padding: '0px' }}>
                        Add
                      </Button>
                    </div>
                  </Grid>
                </Grid>
                <Grid item sx={{ mb: 0.75 }}>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Grid container alignItems="center">
                        <Grid item>
                          {
                            <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0 }}>
                              {employeeleave ? employeeleave : ''}
                            </Typography>
                          }
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              fontSize: '1rem',
                              fontWeight: 500,
                              color: theme.palette.primary[100]
                            }}
                          ></Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </CardWrapper>
        </Card>
      )}
      <AddDialog header="Apply leave" visible={open} onHide={() => setopen(false)}>
        <div>
          <Dropdown
            value={selectemployee}
            onChange={(e) => setSelectemployee(e.value)}
            options={allemployees}
            optionLabel="name"
            placeholder="Select Employee"
            style={{ width: '100%', marginBottom: '20px' }}
          />
        </div>
        <InputNumber
          value={annualleave}
          onValueChange={(e) => setAnnualLeave(e.target.value)}
          mode="decimal"
          showButtons
          min={0}
          max={100}
          style={{ width: '100%' }}
        />
        <SumbitButton onClick={handleSubmit}>Add</SumbitButton>
      </AddDialog>
    </>
  );
};

AnnualCard.propTypes = {
  isLoading: PropTypes.bool
};

export default AnnualCard;
