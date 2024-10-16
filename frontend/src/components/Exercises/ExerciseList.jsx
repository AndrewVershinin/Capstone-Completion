import React from 'react';
import styles from './Exercise.module.css'

const ExerciseList = ({ exercises, onEdit, onDelete }) => {
    const token = localStorage.getItem('token');

    return (
        <div className={styles.exercisesList}>
        <h2>Your Exercises</h2>
        <ul className={styles.exerciseBox}>
            {exercises.map((exercise) => (
                <li key={exercise._id} className={styles.exercise}>
                    <h3 className={styles.exerciseName}>{exercise.name}</h3>
                    <p className={styles.exerciseDetail}>
                        <strong>Body Part:</strong> {exercise.bodyPart}
                    </p>
                    <p className={styles.exerciseDetail}>
                        <strong>Category:</strong> {exercise.category}
                    </p>
                    <p className={styles.exerciseInstruction}>
                        <strong>Instructions:</strong> {exercise.instruction || "No specific instructions."}
                    </p>
                    <div className={styles.buttons}>
                        <button className={styles.editButton} onClick={() => onEdit(exercise)}>Edit</button>
                        <button className={styles.deleteButton} onClick={() => onDelete(exercise._id, token)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
    );
};

export default ExerciseList;