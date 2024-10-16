import React, { useState } from 'react';
import styles from './Workout.module.css';

const WorkoutList = ({ workouts, onDelete, onUpdate }) => {
    const [editingWorkoutId, setEditingWorkoutId] = useState(null);  // Track which workout is being edited
    const [editedWorkout, setEditedWorkout] = useState(null); // Store the edited workout details

    // Function to handle editing a workout
    const handleEdit = (workout) => {
        setEditingWorkoutId(workout._id);  // Set the current workout being edited
        setEditedWorkout({ ...workout });  // Copy workout data to the editing state
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
        <div className={styles.workoutList}>
            <h2>My Workouts</h2>
            {workouts.length === 0 ? (
                <p className={styles.noWorkoutsMessage}>The added workouts will be here.</p>
            ) : (
                <ul className={styles.workoutBox}>
                    {workouts.map((workout) => (
                        <li key={workout._id} className={styles.workoutCard}>
                            {editingWorkoutId === workout._id ? (
                                <div className={styles.editingWorkoutCard}>
                                    <input
                                        type="text"
                                        value={editedWorkout.workoutName}
                                        onChange={(e) => handleChange(e, 'workoutName')}
                                    />
                                    Exercises:
                                    <ul>
                                        {editedWorkout.exercises.map((exercise, index) => (
                                            <li key={exercise._id} className={styles.exerciseDetails}>
                                                <input
                                                    type="text"
                                                    value={exercise.exercise.name}
                                                    readOnly
                                                />
                                                Sets:
                                                <input
                                                    type="number"
                                                    value={exercise.sets}
                                                    onChange={(e) => handleChange(e, 'sets', index)}
                                                />
                                                Reps:
                                                <input
                                                    type="number"
                                                    value={exercise.reps}
                                                    onChange={(e) => handleChange(e, 'reps', index)}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                    <textarea
                                        value={editedWorkout.notes}
                                        onChange={(e) => handleChange(e, 'notes')}
                                    />
                                    <button className={styles.editWorkoutButtonSave} onClick={handleSave}>Save</button>
                                    <button className={styles.editWorkoutButtonCancel} onClick={handleCancel}>Cancel</button>
                                </div>
                            ) : (
                                <div className={styles.displayWorkout}>
                                    <h3>{workout.workoutName}</h3>
                                    <ul>
                                        {workout.exercises.map((exercise) => (
                                            <li key={exercise._id} className={styles.exerciseDetails}>
                                                {exercise.exercise.name} - {exercise.exercise.bodyPart} ({exercise.exercise.category})
                                                <br />
                                                Sets: {exercise.sets}, Reps: {exercise.reps}
                                            </li>
                                        ))}
                                    </ul>
                                    <p>{workout.notes}</p>
                                    <button className={styles.displayWorkoutEditBtn} onClick={() => handleEdit(workout)}>Edit</button>
                                    <button className={styles.displayWorkoutDeleteBtn} onClick={() => onDelete(workout._id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WorkoutList;