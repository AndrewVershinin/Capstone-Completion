import React, { useState } from 'react';

const WorkoutList = ({ workouts, onDelete, onUpdate }) => {
    const [editingWorkoutId, setEditingWorkoutId] = useState(null);  // Track which workout is being edited
    const [editedWorkout, setEditedWorkout] = useState(null); // Store the edited workout details

    // Function to handle editing a workout
    const handleEdit = (workout) => {
        setEditingWorkoutId(workout._id);  // Set the current workout being edited
        setEditedWorkout({...workout});  // Copy workout data to the editing state
    };

    // Function to handle saving the edited workout
    const handleSave = async () => {
        await onUpdate(editedWorkout._id, editedWorkout);  // Call parent function to update the workout
        setEditingWorkoutId(null);  // Exit edit mode
    };

    // Function to cancel editing
    const handleCancel = () => {
        setEditingWorkoutId(null);  // Exit edit mode without saving
        setEditedWorkout(null);  // Reset the edited workout state
    };

    // Function to handle changes in the edited workout data
    const handleChange = (e, field, index = null) => {
        if (index !== null) {
            // For exercise changes
            const updatedExercises = [...editedWorkout.exercises];
            updatedExercises[index][field] = e.target.value;
            setEditedWorkout({ ...editedWorkout, exercises: updatedExercises });
        } else {
            // For workout name and notes changes
            setEditedWorkout({ ...editedWorkout, [field]: e.target.value });
        }
    };

    return (
        <div>
            <h2>My Workouts</h2>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout._id}>
                        {editingWorkoutId === workout._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedWorkout.workoutName}
                                    onChange={(e) => handleChange(e, 'workoutName')}
                                />
                                <br />
                                <textarea
                                    value={editedWorkout.notes}
                                    onChange={(e) => handleChange(e, 'notes')}
                                    placeholder="Workout Notes"
                                />
                                <br />
                                Exercises:
                                <ul>
                                    {editedWorkout.exercises.map((exercise, index) => (
                                        <li key={exercise._id}>
                                            <input
                                                type="text"
                                                value={exercise.exercise.name}
                                                readOnly  
                                            />
                                            <br />
                                            <input
                                                type="text"
                                                value={exercise.exercise.bodyPart}
                                                readOnly  
                                            />
                                            <br />
                                            Sets: 
                                            <input
                                                type="number"
                                                value={exercise.sets}
                                                onChange={(e) => handleChange(e, 'sets', index)}
                                            />
                                            <br />
                                            Reps: 
                                            <input
                                                type="number"
                                                value={exercise.reps}
                                                onChange={(e) => handleChange(e, 'reps', index)}
                                            />
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={handleSave}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <strong>{workout.workoutName}</strong> <br />
                                Notes: {workout.notes}
                                <br />
                                Exercises:
                                <ul>
                                    {workout.exercises.map((exercise) => (
                                        <li key={exercise._id}>
                                            {exercise.exercise.name} 
                                            <br />
                                            {exercise.exercise.bodyPart} ({exercise.exercise.category})
                                            <br /> 
                                            Sets: {exercise.sets}, Reps: {exercise.reps}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => handleEdit(workout)}>Edit</button>
                                <button onClick={() => onDelete(workout._id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkoutList;