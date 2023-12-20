import {React , useEffect} from 'react'
import { SecondContainers } from '../Navbar/Styled';
import { Container, Grid, Typography } from '@mui/material';
import Firstlogo from "../style/svgs/logo-ProcterandGamble.svg";
import Secondlogo from "../style/svgs/logo-Amazon.svg";
import Thirdlogo from "../style/svgs/logo-Mckesson.svg";
import Fourthlogo from "../style/svgs/johnson-johnson.webp";
import Fifthlogo from "../style/svgs/logo-Accenture.svg";
import Sixthlogo from "../style/svgs/logo-ratio-Under Armor.svg";
import Seventhlogo from "../style/svgs/logo-Paypal.svg";

const ProductPageTwo = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <SecondContainers>
        <Container>
            <Grid container justifyContent={"center"}>
            <Grid item>
                    <Grid item >
                        <Typography marginBottom={"80px"} variant='h3'>80% of Fortune 100 companies use Gestion⁴</Typography>
                    </Grid>
            </Grid>
            <Grid container >           
                    <Grid container  gap={4} justifyContent={"space-evenly"}>
                        <Grid item>
                            <img src={Firstlogo} alt="" />
                        </Grid>
                        <Grid item>
                            <img src={Secondlogo} alt="" />
                        </Grid>
                        <Grid item>
                            <img src={Thirdlogo} alt="" />
                        </Grid>
                        <Grid item>
                            <img src={Fourthlogo} style={{width:"250px"}} alt="" />
                        </Grid>
                        <Grid item>
                            <img src={Fifthlogo} alt="" />
                        </Grid>
                        <Grid item>
                            <img src={Sixthlogo} alt="" />
                        </Grid>
                        <Grid item>
                            <img src={Seventhlogo} alt="" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </SecondContainers>
    </>
  );
};
export default ProductPageTwo;