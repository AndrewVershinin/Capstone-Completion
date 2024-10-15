import React, { useEffect, useState } from 'react';

const ExerciseForm = ({ onAddExercise, onUpdateExercise, editingExercise, setEditingExercise }) => {
    const [name, setName] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    const [category, setCategory] = useState('');
    const [instruction, setInstruction] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const bodyPartOptions = ['Core', 'Arms', 'Back', 'Chest', 'Legs', 'Shoulders', 'Full Body', 'Cardio', 'Other'];
    const categoryOptions = ['Barbell', 'Dumbbell', 'Machine/Other', 'Weighted Bodyweight', 'Assisted Bodyweight', 'Reps Only', 'Cardio', 'Duration'];

    useEffect(() => {
        if (editingExercise) {
            setIsEditing(true);
            setName(editingExercise.name);
            setBodyPart(editingExercise.bodyPart);
            setCategory(editingExercise.category);
            setInstruction(editingExercise.instruction || '');
        } else {
            setIsEditing(false);
            setName('');
            setBodyPart('');
            setCategory('');
            setInstruction('');
        }
    }, [editingExercise]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to add or edit an exercise.');
            return;
        }

        const exerciseData = { name, bodyPart, category, instruction };
        if (isEditing) {
            await onUpdateExercise(editingExercise._id, exerciseData, token);
            setEditingExercise(null);  // Reset editing state
        } else {
            await onAddExercise(exerciseData, token);
        }

        // Reset form
        setName('');
        setBodyPart('');
        setCategory('');
        setInstruction('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Edit Exercise' : 'Add Exercise'}</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Exercise Name"
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
            <button type="submit">{isEditing ? 'Update Exercise' : 'Add Exercise'}</button>
        </form>
    );
};

export default ExerciseForm;