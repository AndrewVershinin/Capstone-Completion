import React, { useEffect, useState } from 'react';
import { createExercise, getExercises } from '../../services/api';

const AddExercise = () => {
    const [exercises, setExercises] = useState([]);
    const [name, setName] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    const [category, setCategory] = useState('');
    const [instruction, setInstruction] = useState('');

    const bodyPartOptions = ['Core', 'Arms', 'Back', 'Chest', 'Legs', 'Shoulders', 'Full Body', 'Cardio', 'Other'];
    const categoryOptions = ['Barbell', 'Dumbbell', 'Machine/Other', 'Weighted Bodyweight', 'Assisted Bodyweight', 'Reps Only', 'Cardio', 'Duration'];

    // Fetch exercises when the component mounts
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const data = await getExercises();
                setExercises(data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        fetchExercises();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to add an exercise.');
            return;
        }
        console.log("Token from localStorage:", token);
        const exerciseData = { name, bodyPart, category, instruction }

        try {
            const newExercise = await createExercise(exerciseData, token);
            alert('Exercise added successfully!');
            setExercises([...exercises, newExercise]);
            setName(''); setBodyPart(''); setCategory(''); setInstruction('');
        } catch (error) {
            console.error('Error adding exercise:', error);
        }
    }

    return (
        <div>
            <h2>Add Exercise</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Add Exercise Name'
                    required
                />
                <select value={bodyPart} onChange={(e) => setBodyPart(e.target.value)} required>
                    <option value="">Select Body Part</option>
                    {bodyPartOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categoryOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
                <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    placeholder="Instructions"
                />
                <button type="submit">Add Exercise</button>
            </form>


            <h2>Exercises</h2>
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise._id}>
                        {exercise.name} 
                        {exercise.bodyPart} ({exercise.category})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddExercise;