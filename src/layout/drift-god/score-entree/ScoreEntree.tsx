import { EntreesType } from "../DriftGodDisplay";
import './scoreEntree.css';

type ScoreEntreeProps = {
  entree: EntreesType;
  handleScoreChange: Function;
}

const ScoreEntree = ({ entree, handleScoreChange }: ScoreEntreeProps) => {

  const handleClick = (pointId: number): void => {
    if(pointId <= entree.score) handleScoreChange(entree.id,'minus');
    if(pointId > entree.score) handleScoreChange(entree.id,'plus');
  };

  return (
    <div className='score-entree'>
      <h2>{entree.name}</h2>
      <div
        className={`score-entree__point ${entree.score >= 1 && 'lit'} ${entree.score === 5 && 'winner'}`}
        onClick={()=> handleClick(1)}
      />
      <div
        className={`score-entree__point ${entree.score >= 2 && 'lit'} ${entree.score === 5 && 'winner'}`}
        onClick={()=> handleClick(2)}
      />
      <div
        className={`score-entree__point ${entree.score >= 3 && 'lit'} ${entree.score === 5 && 'winner'}`}
        onClick={()=> handleClick(3)}
      />
      <div
        className={`score-entree__point ${entree.score >= 4 && 'lit'} ${entree.score === 5 && 'winner'}`}
        onClick={()=> handleClick(4)}
      />
      <div
        className={`score-entree__point ${entree.score >= 5 && 'lit'} ${entree.score === 5 && 'winner'}`}
        onClick={()=> handleClick(5)}
      />
    </div>
  );
};

export default ScoreEntree;