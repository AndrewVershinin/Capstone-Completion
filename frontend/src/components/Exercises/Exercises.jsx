import React, { useEffect, useState } from 'react';
import { getExercises } from '../../services/api';

const Exercises = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getExercises();
                setExercises(data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Exercises</h2>
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise._id}>
                        {exercise.name} - {exercise.bodyPart}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Exercises;