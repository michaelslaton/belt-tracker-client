import BeltButton from './components/belt-button/BeltButton';
import './layout.css';

const Layout = () => {

  return (
    <>
      <div className='belts-list'>
        <BeltButton
          title='100% Ultimate Drift God'
          path='/drift'
        />
        <BeltButton
          title='100% Duke of Dunko'
          path='/dunko'
        />
      </div>
    </>
  );
};

export default Layout;