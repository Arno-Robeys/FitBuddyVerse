import { createContext, useContext } from 'react';
import { TExercise } from '@/types/exercise.type';
import { TExerciseSet } from '@/types/set.type';

const ExerciseContext = createContext<{
    exercise: TExercise;
    addExerciseSetToUpdate: (exercise: TExerciseSet) => void;
    removeExerciseSetFromUpdate: (exercise: TExerciseSet) => void;
    rerenderExercises: () => void;
    openCreateExerciseModal: () => void;
} | null>(null);

export function useExerciseContext() {
    const context = useContext(ExerciseContext);
    if (context === null) {
        throw new Error('useExerciseContext must be used within a ExerciseProvider');
    }
    return context;
}
export default ExerciseContext;
