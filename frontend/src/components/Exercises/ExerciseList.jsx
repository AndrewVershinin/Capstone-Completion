import React from 'react';

const ExerciseList = ({ exercises, onEdit, onDelete }) => {
    const token = localStorage.getItem('token');

    return (
        <div>
            <h2>Exercises</h2>
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise._id}>
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