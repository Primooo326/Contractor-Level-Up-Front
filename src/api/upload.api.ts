import { fetchApiBase } from "./instances"

export const uploadFile = (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    console.log(file);
    return fetchApiBase.post("/upload", formData)
}

