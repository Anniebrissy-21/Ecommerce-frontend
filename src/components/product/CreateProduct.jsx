import React, { useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';

const categories = [
    { value: '', label: 'Select Category' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Gloceries', label: 'Gloceries' },
    { value: 'Clothing', label: 'Clothing' },
];

const CreateProductForm = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!values.name) newErrors.name = 'Product name is required';
        if (!values.description) newErrors.description = 'Description is required';
        if (!values.price) newErrors.price = 'Price is required';
        if (!values.category) newErrors.category = 'Category is required';
        if (!values.image) newErrors.image = 'Image is required';
        return newErrors;
    };

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files;
        setValues((prev) => ({ ...prev, image: file }));
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('category', values.category);
            formData.append('image', values.image);
            
            api.post('/products/', formData)
            .then(res => {
                
            }).catch(err => {
                toast.error(err.message)
            })
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit} style={formStyle}>
            <h2 style={{ marginBottom: '20px' }}>Create Product</h2>
            <div style={fieldStyle}>
                <label>Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    style={inputStyle}
                />
                {errors.name && <span style={errorStyle}>{errors.name}</span>}
            </div>
            <div style={fieldStyle}>
                <label>Description</label>
                <textarea
                    name="description"
                    value={values.description}
                    onChange={handleInputChange}
                    className={errors.description ? 'error' : ''}
                    style={textareaStyle}
                />
                {errors.description && <span style={errorStyle}>{errors.description}</span>}
            </div>
            <div style={fieldStyle}>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleInputChange}
                    className={errors.price ? 'error' : ''}
                    style={inputStyle}
                />
                {errors.price && <span style={errorStyle}>{errors.price}</span>}
            </div>
            <div style={fieldStyle}>
                <label>Category</label>
                <select
                    name="category"
                    value={values.category}
                    onChange={handleInputChange}
                    className={errors.category ? 'error' : ''}
                    style={inputStyle}
                >
                    {categories.map((c) => (
                        <option key={c.value} value={c.value}>
                            {c.label}
                        </option>
                    ))}
                </select>
                {errors.category && <span style={errorStyle}>{errors.category}</span>}
            </div>
            <div style={fieldStyle}>
                <label>Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className={errors.image ? 'error' : ''}
                    style={inputStyle}
                />
                {preview && <img src={preview} alt="preview" style={imgStyle} />}
                {errors.image && <span style={errorStyle}>{errors.image}</span>}
            </div>
            <button type="submit" style={buttonStyle}>
                Add Product
            </button>
        </form>
    );
};

// Non-intrusive inline CSS for demo
const formStyle = {
    maxWidth: '480px',
    margin: '20px auto',
    padding: '24px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
};
const fieldStyle = { marginBottom: '16px' };
const inputStyle = {
    width: '100%',
    padding: '8px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
};
const textareaStyle = { ...inputStyle, height: '60px', resize: 'vertical' };
const buttonStyle = {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    background: '#28a745',
    color: '#fff',
    fontWeight: 600,
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
};
const errorStyle = { color: 'red', fontSize: '12px', marginTop: '4px', display: 'block' };
const imgStyle = {
    display: 'block',
    maxWidth: '80px',
    maxHeight: '80px',
    marginTop: '10px',
};

export default CreateProductForm;
