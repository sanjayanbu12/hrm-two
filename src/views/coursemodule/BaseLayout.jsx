import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import Notes from './layout/Notes';
import Progress from './layout/Progress';

const BaseLayout = ({ courseName, courseDescription }) => {
  return (
    <>
      <TabView>
        <TabPanel leftIcon="pi pi-search mr-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText placeholder="Search" />
          </span>
        </TabPanel>
        <TabPanel header="Overview" leftIcon="pi pi-wallet mr-2"  >
          <h2>{courseName}</h2>
          <p className="m-0">{courseDescription}</p>
        </TabPanel>
        <TabPanel header="Notes" leftIcon="pi pi-pencil mr-2">
          <Notes/>
        </TabPanel>
        <TabPanel header="Progress" leftIcon="pi pi-chart-line mr-2">
          <Progress/>
        </TabPanel>
        <TabPanel header="Certificate" leftIcon="pi pi-book mr-2">
          <p className="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur,
            adipisci velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel header="Announcement" leftIcon="pi pi-megaphone mr-2">
          <p className="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur,
            adipisci velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel header="Quiz" leftIcon="pi pi-exclamation-circle mr-2">
          <p className="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur,
            adipisci velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        
      </TabView>
    </>
  );
};

export default BaseLayout;
