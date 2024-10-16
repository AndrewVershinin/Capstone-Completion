import React, { useEffect, useState } from 'react';
import { getExercises, createWorkout, deleteWorkout, getWorkouts, updateWorkout } from '../../services/api';
import WorkoutList from './WorkoutList';
import styles from './Workout.module.css';

const WorkoutManager = () => {
    const [userExercises, setUserExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [workoutName, setWorkoutName] = useState('');
    const [notes, setNotes] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const token = localStorage.getItem('token');
                const fetchedWorkouts = await getWorkouts(token);
                setWorkouts(fetchedWorkouts);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        }
        fetchWorkouts();
    }, []);

    const fetchUserExercises = async () => {
        try {
            const token = localStorage.getItem('token');
            const exercises = await getExercises(token);
            setUserExercises(exercises);
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    };

    const handleAddExerciseToWorkout = (exercise) => {
        setSelectedExercises([...selectedExercises, { exercise, sets: '', reps: '' }]);
    };

    const handleCreateWorkout = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const workoutData = { workoutName, exercises: selectedExercises, notes };

        try {
            await createWorkout(workoutData, token);
            alert('Workout created successfully!');
            setShowModal(false);
        } catch (error) {
            console.error('Error creating workout:', error);
        }
    };

    // Delete a workout
    const handleDeleteWorkout = async (workoutId) => {
        try {
            const token = localStorage.getItem('token');
            await deleteWorkout(workoutId, token);
            setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    const handleUpdateWorkout = async (workoutId, updatedWorkoutData) => {
        const token = localStorage.getItem('token');
        try {
            await updateWorkout(workoutId, updatedWorkoutData, token);
            setWorkouts(workouts.map(w => w._id === workoutId ? updatedWorkoutData : w));
        } catch (error) {
            console.error('Error updating workout:', error);
        }
    };

    const openModal = () => {
        fetchUserExercises(); 
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedExercises([]);
        setWorkoutName('');
        setNotes('');
    };

    return (
        <div className={styles.workoutFormContainer}>
            <h2>Create Workout</h2>
            <button onClick={openModal} className={styles.addTemplateBtn}>
                Click to Add New Template
            </button>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Create Workout</h2>
                        <h4>Your exercises</h4>
                        <button className={styles.closeBtn} onClick={closeModal}>
                            &times;
                        </button>
                        <ul className={styles.ulFeched}>
                            {userExercises.map(exercise => (
                                <li key={exercise._id} className={styles.fetchedExercises}>
                                    <p><strong>{exercise.name}</strong></p>
                                    <p>{exercise.bodyPart} ({exercise.category})</p>
                                    <button onClick={() => handleAddExerciseToWorkout(exercise)}>Add</button>
                                </li>
                            ))}
                        </ul>
                        <form onSubmit={handleCreateWorkout} className={styles.createWorkoutForm}>
                            <input
                                type="text"
                                value={workoutName}
                                onChange={(e) => setWorkoutName(e.target.value)}
                                placeholder="Workout Name"
                                required
                            />
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Workout Notes"
                            />
                            <ul className={styles.selectedExercisesList}>
                                {selectedExercises.map((exercise, index) => (
                                    <li key={index} className={styles.addedExercise}>
                                        <p><strong>{exercise.exercise.name}</strong></p>
                                        <p>{exercise.exercise.bodyPart}</p>
                                        <input
                                            type="number"
                                            value={exercise.sets}
                                            onChange={(e) => {
                                                const updatedExercises = [...selectedExercises];
                                                updatedExercises[index].sets = e.target.value;
                                                setSelectedExercises(updatedExercises);
                                            }}
                                            placeholder="Sets"
                                        />
                                        <input
                                            type="number"
                                            value={exercise.reps}
                                            onChange={(e) => {
                                                const updatedExercises = [...selectedExercises];
                                                updatedExercises[index].reps = e.target.value;
                                                setSelectedExercises(updatedExercises);
                                            }}
                                            placeholder="Reps"
                                        />
                                    </li>
                                ))}
                            </ul>
                            <button type="submit">Create Workout</button>
                        </form>
                    </div>
                </div>
            )}

            <WorkoutList
                workouts={workouts}
                onDelete={handleDeleteWorkout}
                onUpdate={handleUpdateWorkout}
            />
        </div>
    );
};

export default WorkoutManager;