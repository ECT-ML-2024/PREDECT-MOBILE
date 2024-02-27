import { useState } from 'react';
import pickersData from '../config/pickersData';

export const useInitialStates = () => {
    const [selectedTypeOfSimulation,onSelectedTypeOfSimulation]=useState(pickersData.TYPE_OF_STIMULATION[0]);
    const [selectedOutcome,onSelectedOutcome]=useState(pickersData.OUTCOME[0]);
    const [selectedAnaesthesia,onSelectedAnaesthesia]=useState(pickersData.ANAESTHESIA[0]);
    const [selectedPolarity,onSelectedPolarity]=useState(pickersData.POLARITY[0]);
    const [selectedPositionRight,onSelectedPositionRight]=useState(pickersData.POSITION[0]);
    const [selectedPositionLeft,onSelectedPositionLeft]=useState(pickersData.POSITION[0]);
    const [selectedHandedness,onSelectedHandedness]=useState(pickersData.HANDEDNESS[0]);
    const [selectedVisualImpairment,onSelectedVisualImpairment]=useState(pickersData.TRUEOFFALSE[0]);
    const [selectedOsteoporosis,onSelectedOsteoporosis]=useState(pickersData.TRUEOFFALSE[0]);
    const [selectedDislocation,onSelectedDislocation]=useState(pickersData.TRUEOFFALSE[0]);
    const [selectedMentalRetardation,onSelectedMentalRetardation]=useState(pickersData.TRUEOFFALSE[0]);
    const [selectedPedalOedema,onSelectedPedalOedema]=useState(pickersData.TRUEOFFALSE[0]);
    const [selectedRespiratoryInfections,onSelectedRespiratoryInfections]=useState(pickersData.TRUEOFFALSE[0]);
    const [selectedStroke,onSelectedStroke]=useState(pickersData.TRUEOFFALSE[0]);
    const [selectedCognitiveImpairment,onSelectedCognitiveImpairment]=useState(pickersData.TRUEOFFALSE[0]);
    const [selectedDrugTreatment,onSelectedDrugTreatment]=useState(pickersData.CURRENT_DRUG_TREATMENT[0]);
    const [selectedObservations,onSelectedObservations]=useState(pickersData.OBSERVATIONS[0]);
    const [selectedMemory,onSelectedMemory]=useState(pickersData.MEMORY[0]);
    const [selectedSchizophrenia,onSelectedSchizophrenia]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedDepression,onSelectedDepression]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedBipolar,onSelectedBipolar]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedNeurocognitiveDisorderDementia,onSelectedNeurocognitiveDisorderDementia]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedAnxiety,onSelectedAnxiety]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedSuicide,onSelectedSuicide]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedSchizoaffective,onSelectedSchizoaffective]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedAcuteAndTransientPsychotic,onSelectedAcuteAndTransientPsychotic]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedMania,onSelectedMania]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedDelusional,onSelectedDelusional]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedSeizures,onSelectedSeizures]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedPsychosisNOS,onSelectedPsychosisNOS]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedDepressionNOS,onSelectedDepressionNOS]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedPostpartumDepression,onSelectedPostpartumDepression]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [selectedNeurocognitive,onSelectedNeurocognitive]=useState(pickersData.CURRENT_DIAGNOSES[0]);
    const [GENDER,setGENDER]=useState('MALE');



    return {
        GENDER,
        setGENDER,
        selectedTypeOfSimulation,
        onSelectedTypeOfSimulation,
        selectedOutcome,
        onSelectedOutcome,
        selectedAnaesthesia,
        onSelectedAnaesthesia,
        selectedPolarity,
        onSelectedPolarity,
        selectedPositionRight,
        onSelectedPositionRight,
        selectedPositionLeft,
        onSelectedPositionLeft,
        selectedHandedness,
        onSelectedHandedness,
        selectedVisualImpairment,
        onSelectedVisualImpairment,
        selectedOsteoporosis,
        onSelectedOsteoporosis,
        selectedDislocation,
        onSelectedDislocation,
        selectedMentalRetardation,
        onSelectedMentalRetardation,
        selectedPedalOedema,
        onSelectedPedalOedema,
        selectedRespiratoryInfections,
        onSelectedRespiratoryInfections,
        selectedStroke,
        onSelectedStroke,
        selectedCognitiveImpairment,
        onSelectedCognitiveImpairment,
        selectedDrugTreatment,
        onSelectedDrugTreatment,
        selectedObservations,
        onSelectedObservations,
        selectedMemory,
        onSelectedMemory,
        selectedSchizophrenia,
        onSelectedSchizophrenia,
        selectedDepression,
        onSelectedDepression,
        selectedBipolar,
        onSelectedBipolar,
        selectedNeurocognitiveDisorderDementia,
        onSelectedNeurocognitiveDisorderDementia,
        selectedAnxiety,
        onSelectedAnxiety,
        selectedSuicide,
        onSelectedSuicide,
        selectedSchizoaffective,
        onSelectedSchizoaffective,
        selectedAcuteAndTransientPsychotic,
        onSelectedAcuteAndTransientPsychotic,
        selectedMania,
        onSelectedMania,
        selectedDelusional,
        onSelectedDelusional,
        selectedSeizures,
        onSelectedSeizures,
        selectedPsychosisNOS,
        onSelectedPsychosisNOS,
        selectedDepressionNOS,
        onSelectedDepressionNOS,
        selectedPostpartumDepression,
        onSelectedPostpartumDepression,
        selectedNeurocognitive,
        onSelectedNeurocognitive
    };
    
};
