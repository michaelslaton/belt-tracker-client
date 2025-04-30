import { NavigateFunction, useNavigate } from 'react-router-dom';
import './beltButton.css';

type BeltButtonProps = {
  title: string;
  path: string;
}

const BeltButton = ({ title, path }: BeltButtonProps) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div
      className='belt-button'
      onClick={()=> navigate(path)}
    >
      <div className='belt-button__title'>
        <h1>{ title }</h1>
      </div>
    </div>
  );
};

export default BeltButton;