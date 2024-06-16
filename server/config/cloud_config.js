import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: 'dkny7in6p',
    api_key: '482728214737428',
    api_secret: 'T1mQZ3NYG4CT26CKCNfo_4jRfvc',
});

const handleUpload = async (file) => {
    try {
        const res = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        });
        return res;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default handleUpload;


