import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const ApproovalCard = () => {

    const header = (
        <img style={{width:'100%',maxHeight:'70px'}} alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
  
    const footer = (
        <> <div style={{display:'flex',justifyContent:'space-between'}}>
              <Button style={{marginRight:'10px'}} label="Accept" severity="primary" icon="pi pi-check"  />
            <Button style={{marginRight:'10px'}} label="Reject" severity="secondary" icon="pi pi-times"  />
            </div>
        </>
    );
  return (
    <div>
    <Card style={{maxWidth:'300px',maxHeight:'350px'}} footer={footer} header={header}>
        <div>
            <div>
                <div>
<h3 ><b>Product Name : </b></h3>
</div>
<p> <b>Approval To : </b></p>

            </div>
            <div></div>
        </div>
        <p>
            <b>Raised From :</b>
        </p>
        <p>
            <b>Date :</b>
        </p>
         
    </Card>
</div>
  )
}

export default ApproovalCard