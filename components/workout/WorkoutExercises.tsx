import WorkoutExercise from '@/components/workout/WorkoutExercise';
import { useWorkoutContext } from '@/components/workout/context/WorkoutContext';

export default function WorkoutExercises() {
    const { workout } = useWorkoutContext();

    const exercises = new Map();
    workout.exerciseSets?.forEach((exerciseSet) => {
        if (exercises.has(exerciseSet.exerciseId)) {
            exercises.set(exerciseSet.exerciseId, exercises.get(exerciseSet.exerciseId) + 1);
        } else {
            exercises.set(exerciseSet.exerciseId, 1);
        }
    });

    return (
        <>
            {Array.from(exercises.keys())?.map((exerciseKey) => {
                return (
                    <WorkoutExercise
                        key={workout.id + exerciseKey}
                        exerciseId={parseInt(exerciseKey)}
                        setsAmount={exercises.get(exerciseKey)}
                    />
                );
            })}
        </>
    );
}
