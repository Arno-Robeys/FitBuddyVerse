import { TProfile } from '@/types/profile.type';
import { TWorkout } from '@/types/workout.type';
import { createContext, useContext } from 'react';

const WorkoutContext = createContext<{
    workout: TWorkout;
    profile?: TProfile;
} | null>(null);

export function useWorkoutContext() {
    const context = useContext(WorkoutContext);
    if (context === null) {
        throw new Error('useWorkoutContext must be used within a WorkoutProvider');
    }
    return context;
}
export default WorkoutContext;
