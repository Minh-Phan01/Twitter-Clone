import './UploadImage.css'
import { useState } from 'react';

const UploadImage = ({setImageUrl}) => {
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (image) => {

        const formData = new FormData();

        setImageLoading(true);
        
        formData.append("image", image);
        const res = await fetch('/api/images/', {
            method: 'POST',
            body: formData,
        });
        if (res.ok) {
            const imageUrl = await res.json();
            setImageLoading(false);
            setImageUrl(imageUrl.url)
        } else if (res.status < 500) {
            setImageLoading(false)
            const error = [];
            error.push("Could not upload file correctly.");
            window.alert(error[0]);
        }
    }

    const updateImage = e => {
        const file = e.target.files[0];
        setImage(file);
        handleSubmit(file);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                type='file'
                accept='image/*'
                onChange={updateImage}/>
            </form>
        </>
    )
}

export default UploadImage;