import React from 'react';
import styles from './Exercise.module.css'

const ExerciseList = ({ exercises, onEdit, onDelete }) => {
    const token = localStorage.getItem('token');

    return (
        <div className={styles.exercisesList}>
            <h2>Your Exercises</h2>
            <ul className={styles.exerciseBox}>
                {exercises.map(exercise => (
                    <li key={exercise._id} className={styles.exercise}>
                        {exercise.name} 
                        {exercise.bodyPart} 
                        ({exercise.category})
                        {exercise.instruction}
                        <button onClick={() => onEdit(exercise)}>Edit</button>
                        <button onClick={() => onDelete(exercise._id, token)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExerciseList;