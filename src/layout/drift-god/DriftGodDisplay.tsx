import { NavigateFunction, useNavigate } from "react-router-dom";
import { default as contenders } from "../../data/contenders";
import Contender from "../../types/contender.type";
import { useState } from "react";
import ScoreEntree from "./score-entree/ScoreEntree";
import './driftGod.css';

export type EntreesType = Contender & { 
  score: number;
};

type DriftStateType = {
  entrees: EntreesType[];
  addSelected: Contender[];
  removeSelected: Contender[];
  edit: boolean;
  newGod: string | null;
};

const DriftGodDisplay = () => {
  const navigate: NavigateFunction = useNavigate();
  const [ driftState, setDriftState ] = useState<DriftStateType>({
    entrees: [],
    addSelected: [],
    removeSelected: [],
    edit: true,
    newGod: null,
  });

  const isThereAWinner = () => {
    const winner = driftState.entrees.some((entree)=> (entree.score === 5));
    console.log(winner)
    if(!winner) return false;
    return true;
  };
  
  const isSelected = (id: number, type: 'add' | 'remove'): boolean => {
    const selectedList = type === 'add' ? driftState.addSelected : driftState.removeSelected;
    return selectedList.some(entree => entree.id === id);
  };
  
  const handleAddSelect = (id: number, contender: Contender): void => {
    const selected = isSelected(id, 'add');
    const newSet = selected
      ? driftState.addSelected.filter(entree => entree.id !== id)
      : [...driftState.addSelected, contender];
  
    setDriftState({ ...driftState, addSelected: newSet });
  };

  const handleRemoveSelect = (id: number, entree: EntreesType): void => {
    const selected = isSelected(id, 'remove');
    const newSet = selected
      ? driftState.removeSelected.filter(e => e.id !== id)
      : [...driftState.removeSelected, entree];
  
    setDriftState({ ...driftState, removeSelected: newSet });
  };
  
  const handleAdd = () => {
    if (!driftState.addSelected.length) return;
    const selectedWithScore: EntreesType[] = driftState.addSelected.map((contender) => ({
      ...contender,
      score: 0,
    }));
    const newEntrees: EntreesType[] = [...driftState.entrees, ...selectedWithScore];
    setDriftState({ ...driftState, addSelected: [], entrees: newEntrees });
    console.log(driftState)
  };

  const handleRemove = (): void => {
    if (!driftState.removeSelected.length) return;
  
    const removeIds = driftState.removeSelected.map(c => c.id);
    const updatedEntrees = driftState.entrees.filter(entree =>
      !removeIds.includes(entree.id)
    );
  
    setDriftState({ ...driftState, entrees: updatedEntrees, removeSelected: [], });
  };

  const handleReset = (): void => {
    setDriftState({...driftState, addSelected: [], removeSelected: [], entrees: []})
  }

  const handleSet = () => {
    if(!driftState.entrees.length) return;

    setDriftState({...driftState, edit: false})
  }

  const handleScoreChange = (entreeId: number, type: string) => {
    const index = driftState.entrees.findIndex((entree) => entree.id === entreeId);
    let newGod: boolean = false;
    if (index === -1) return;
  
    const updatedEntrees = [...driftState.entrees];
    const updatedEntry = { ...updatedEntrees[index] };
  
    if (type === 'plus') updatedEntry.score++;
    else updatedEntry.score--;
  
    if(updatedEntry.score === 5) newGod = true;

    updatedEntrees[index] = updatedEntry;
  
    if(!newGod) setDriftState({ ...driftState, entrees: updatedEntrees });
    else setDriftState({ ...driftState, entrees: updatedEntrees, newGod: updatedEntry.name })
  };

  const handleFinish = () => {
    setDriftState({
      ...driftState,
      edit: true,
      newGod: null,
      entrees: [],
      addSelected: [],
      removeSelected: [],
    });
  };
  
  const populateContenders = () => {
    const results = contenders
      .filter((contender) => 
        !driftState.entrees.some((entree) => entree.id === contender.id)
      )
      .map((contender) => (
        <div
          key={contender.id}
          className={`drift__person ${isSelected(contender.id, 'add') ? 'selected' : ''}`}
          onClick={() => handleAddSelect(contender.id, contender)}
        >
          {contender.name}
        </div>
      ));
  
    return results;
  };

  return (
    <div className={`drift__wrapper ${isThereAWinner() && 'winner'}`}>
      { driftState.edit ?
        <div className='drift__edit-display'>
          <div className='drift__people-list'>
            {populateContenders()}
          </div>
          
          <div className='drift__edit-controls'>
            <button className='business-button' onClick={()=> handleAdd()}>Add</button>
            <button className='business-button' onClick={()=> handleReset()}>Reset</button>
            <button className='business-button' onClick={()=> handleRemove()}>Remove</button>
            <button className='business-button' onClick={()=> handleSet()}>Set!</button>
          </div>

          <div className='drift__people-list'>
            { driftState.entrees.map((entree)=>(
                <div
                  key={entree.id}
                  className={`drift__person ${isSelected(entree.id, 'remove') ? 'selected' : ''}`}
                  onClick={()=> handleRemoveSelect(entree.id, entree)}
                >
                  { entree.name }
                </div>
              ))
            }
          </div>
        </div>
        :
        <>
          <div className='drift__new-god--wrapper'>
            { driftState.newGod &&
              <>
                <h1 className='drift__new-god'>Presenting</h1>
                <h1 className='drift__new-god'>100% Ultimate Drift God {driftState.newGod}</h1>
              </>
            }
          </div>
          <div className='drift__score-display'>
            {driftState.entrees.sort((a, b) => b.score - a.score).map((entree)=>(
              <>
                <ScoreEntree entree={entree} handleScoreChange={handleScoreChange}/>
              </>
            ))}
          </div>
        </>
      }
      <div className='drift__control-buttons-wrapper'>
        { !driftState.edit &&
          <button className='business-button' onClick={()=> setDriftState({...driftState, edit: true})}>Edit</button>
        }
          <button className='business-button' onClick={()=> navigate('/')}>Home</button>
        { driftState.newGod &&
          <button className='business-button' onClick={()=> handleFinish()}>Finish</button>
        }
      </div>
    </div>
  );
};

export default DriftGodDisplay;