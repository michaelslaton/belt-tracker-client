import { NavigateFunction, useNavigate } from "react-router-dom";
import { default as contenders } from "../../data/contenders";
import Contender from "../../types/contender.type";
import { useState } from "react";
import './driftGod.css';
import ScoreEntree from "./score-entree/ScoreEntree";

export type EntreesType = Contender & { 
  score: number;
};

type DriftStateType = {
  entrees: EntreesType[];
  addSelected: Contender[];
  removeSelected: Contender[];
  edit: boolean;
};

const DriftGodDisplay = () => {
  const navigate: NavigateFunction = useNavigate();
  const [ driftState, setDriftState ] = useState<DriftStateType>({
    entrees: [],
    addSelected: [],
    removeSelected: [],
    edit: true,
  });
  
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
    if (index === -1) return;
  
    const updatedEntrees = [...driftState.entrees];
    const updatedEntry = { ...updatedEntrees[index] };
  
    if (type === 'plus') updatedEntry.score++;
    else updatedEntry.score--;
  
    updatedEntrees[index] = updatedEntry;
  
    setDriftState({ ...driftState, entrees: updatedEntrees });
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
    <>
      { driftState.edit ?
        <div className='drift__edit-display'>
          <div className='drift__people-list'>
            {populateContenders()}
          </div>
          
          <div className='drift__edit-controls'>
            <button onClick={()=> handleAdd()}>Add</button>
            <button onClick={()=> handleReset()}>Reset</button>
            <button onClick={()=> handleRemove()}>Remove</button>
            <button onClick={()=> handleSet()}>Set!</button>
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
        <div className='drift__score-display'>
          {driftState.entrees.map((entree)=>(
            <>
              <ScoreEntree entree={entree} handleScoreChange={handleScoreChange}/>
            </>
          ))}
        </div>
      }
      { !driftState.edit &&
        <button onClick={()=> setDriftState({...driftState, edit: true})}>Edit</button>
      }
      <button onClick={()=> navigate('/')}>Home</button>
    </>
  );
};

export default DriftGodDisplay;