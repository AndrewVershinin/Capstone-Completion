import React, { useEffect, useState } from 'react';
import { createExercise, getExercises, updateExercise, deleteExercise } from '../../services/api';
import ExerciseForm from './ExerciseForm';
import ExerciseList from './ExerciseList';


const ExerciseManager = () => {

    const [exercises, setExercises] = useState([]);
    const [editingExercise, setEditingExercise] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const data = await getExercises()
                setExercises(data)
            } catch (error) {
                console.error('Error fetching exercises:', error)
            }
        };
        fetchExercises();
    }, []);

    // Add a new execise
    const handleAddExercise = async (exerciseData, token) => {
        try {
            const newExercise = await createExercise(exerciseData, token);
            setExercises([...exercises, newExercise]);
        } catch (error) {
            console.error('Error adding exercise:', error);
        }
    };

    // Update an existing exercise
    const handleUpdateExercise = async (exerciseId, updatedExerciseData, token) => {
        try {
            await updateExercise(exerciseId, updatedExerciseData, token);
            setExercises(exercises.map(ex => ex._id === exerciseId ? updatedExerciseData : ex));
        } catch (error) {
            console.error('Error updating exercise:', error);
        }
    };

    // Delete an exercise
    const handleDeleteExercise = async (exerciseId, token) => {
        try {
            await deleteExercise(exerciseId, token);
            setExercises(exercises.filter(ex => ex._id !== exerciseId));
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    };

    return (
        <div>
            <h2>Exercise Manager</h2>
            <ExerciseForm
                onAddExercise={handleAddExercise}
                onUpdateExercise={handleUpdateExercise}
                editingExercise={editingExercise}
                setEditingExercise={setEditingExercise}
            />
            <ExerciseList
                exercises={exercises}
                onEdit={setEditingExercise}
                onDelete={handleDeleteExercise}
            />
        </div>
    );
};

export default ExerciseManager;