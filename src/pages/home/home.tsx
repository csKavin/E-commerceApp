import React from 'react'

import AppLayout from '../../components/BottomNavigation';
import { IonContent, IonPage } from '@ionic/react';
import SearchIcon from '@mui/icons-material/Search';






const Home = () => {

  return (
    <IonPage>
      <IonContent>
        <div>
          <AppLayout />
          <div className='Page-Container content-wrapper'>
            {/* header part */}
            <main className='App-sticky d-flex justify-content-between align-items-center'>
              <div>
              <img src='https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png' className='rounded-5 header-image-round' />
              </div>
              <div className="bold">Name</div>
              <div ><SearchIcon/></div>
              <div>
              </div>
            </main>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Home;
