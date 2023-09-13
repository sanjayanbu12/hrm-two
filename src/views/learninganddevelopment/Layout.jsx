import React from 'react'; 
import { PanelMenu } from 'primereact/panelmenu';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

const Layout=()=> {
    const items = [
        {
          label: 'Course name',
          icon: 'pi pi-fw pi-server',
          items: [
            {
              label: 'Module 1',
              icon: 'pi pi-fw pi-folder-open',
              items: [
                {
                  label: 'Video 1',
                  icon: 'pi pi-fw pi-youtube'
                },
                {
                  label: 'Video 2',
                  icon: 'pi pi-fw pi-youtube'
                },
                {
                  label: 'Video 3',
                  icon: 'pi pi-fw pi-youtube'
                }
              ]
            },
            {
              label: 'Module 2',
              icon: 'pi pi-fw pi-folder-open',
              items: [
                {
                  label: 'Video 4',
                  icon: 'pi pi-fw pi-youtube'
                },
                {
                  label: 'Video 5',
                  icon: 'pi pi-fw pi-youtube'
                }
              ]
            },
            {
              label: 'Module 3',
              icon: 'pi pi-fw pi-folder-open',
              items: [
                {
                  label: 'Video 1',
                  icon: 'pi pi-fw pi-youtube'
                },
                {
                  label: 'Video 2',
                  icon: 'pi pi-fw pi-youtube'
                },
                {
                  label: 'Video 3',
                  icon: 'pi pi-fw pi-youtube'
                }
              ]
            },
          ]
        }
      ];
    return (
        <div className="card flex justify-content-center"style={{width:"100%"}} >
            <PanelMenu model={items} className="w-full md:w-25rem"  />
        </div>
    )
}
export default Layout;