import { NavigateFunction, useNavigate } from "react-router-dom";

const DriftGodDisplay = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      <button onClick={()=> navigate('/')}>Home</button>
    </>
  );
};

export default DriftGodDisplay;