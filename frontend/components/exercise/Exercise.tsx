import { TExercise } from '@/types/exercise.type';
import { TExerciseSet } from '@/types/set.type';
import { TWorkoutExercise } from '@/types/workout.type';
import { Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

interface Props {
	workout: TWorkoutExercise;
	setWorkout: any;
}

const Exercise: FC<Props> = ({ workout, setWorkout }: Props) => {

    function ChangeInputHandler(setNr: number, exerciseId: number, target: string, type: string): void {
        var number = Number(target);
        if (isNaN(number)) {
            return;
        }
        const newTableData = {...workout};
        const exercise = newTableData.exercise?.find((exercise) => exercise.id === exerciseId);
        if (exercise) {
            const set = exercise.exerciseSets?.find((set) => set.setNr === setNr);
            if (set) {
                if (type === 'weightKG') {
                    set.weightKG = number;
                } else if (type === 'repetitions') {
                    set.repetitions = number;
                }
            }
        }
        setWorkout(newTableData);
    }

    function addSetHandler(exerciseId: number) {
        const newTableData = {...workout};
        const exercise = newTableData.exercise?.find((exercise) => exercise.id === exerciseId);
        if (exercise) {
            var newSetNr = exercise.exerciseSets?.length ? exercise.exerciseSets.length + 1 : 1
            const newSet = {
                exerciseId: exerciseId,
                setNr: newSetNr,
                repetitions: 0,
                weightKG: 0
            };
            exercise.exerciseSets?.push(newSet);
        }
        setWorkout(newTableData);   
      }

      function deleteSetHandler(setNr: number, exerciseId: number): void {
        const newTableData = {...workout};
        const exercise = newTableData.exercise?.find((exercise) => exercise.id === exerciseId);
        if (exercise) {
            const newExerciseSets = exercise.exerciseSets?.filter((set) => set.setNr !== setNr);
            exercise.exerciseSets = newExerciseSets;
            if(!newExerciseSets?.length) {
                const newExercises = newTableData.exercise?.filter((exercise) => exercise.id !== exerciseId);
                newTableData.exercise = newExercises;
            }
            //Reassign set numbers
            if(newExerciseSets?.length) {
                newExerciseSets.forEach((set, index) => {
                    set.setNr = index + 1;
                });
            }
        }
        setWorkout(newTableData);
    }

  return (
    <View className='mt-2'>
      {workout.exercise ? (
        workout.exercise.map((row: TExercise) => (
          <View key={row.name}>
            <Text className='font-bold text-xl'>{row.name}</Text>
            <TextInput placeholder='Add Exercise Note...'></TextInput>
            <View className='flex-row justify-between'>
              <Text className='font-bold text-base'>{row.type}</Text>
              <Text className='font-bold text-base'>{row.equipment}</Text>
            </View>

            {/*Table*/}
            <View>
              <View className='flex-row bg-gray-200 py-2 justify-around'>
                <Text>Set</Text>
                <Text>KG</Text>
                <Text>Reps</Text>
                <Text>Check</Text>
                <Text>Delete</Text>
              </View>
              {row.exerciseSets ? (
                row.exerciseSets.map((r: TExerciseSet) => (
                  <View key={r.setNr} className='flex-row justify-around border-b border-gray-300'>
                    <Text>{r.setNr}</Text>
                    <TextInput value={r.weightKG.toString()} onChangeText={text => ChangeInputHandler(r.setNr, row.id, text, 'weightKG')} keyboardType="numeric"/>
                    <TextInput value={r.repetitions.toString()} onChangeText={text => ChangeInputHandler(r.setNr, row.id, text, 'repetitions')} keyboardType="numeric"/>
                    <TouchableOpacity >
                      <View>
                        <Text>{r.isCompleted ? '✓' : 'X'}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteSetHandler(r.setNr, row.id)}>
                      <View>
                        <Ionicons name="trash-outline" size={24} color="black" />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              ) : null}
            </View>
            <TouchableOpacity onPress={() => addSetHandler(row.id)} className='bg-gray-700 rounded mt-4 py-2'>
              <Text className='text-white text-center'>+ Add Set</Text>
            </TouchableOpacity>
            <View className='my-2 border'/>
          </View>
        ))
      ) : null}
    </View>
  );
};

export default Exercise;