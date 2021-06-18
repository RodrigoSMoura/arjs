const config = { 
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY, 
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
  };

async function ImageUpload(image, callbackFunction, errorFunction){

    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "zakjcnhz")
    data.append("cloud_name",config.cloud_name)
    await fetch(`https://api.cloudinary.com/v1_1/${config.cloud_name}/image/upload`,{
        method:"post",
        body: data
        })
    .then(resp => resp.json())
    .then(callbackFunction)
    .catch(errorFunction);
}

export default ImageUpload;