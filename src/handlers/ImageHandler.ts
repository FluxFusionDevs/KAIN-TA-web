export const convertToBlob = (file: File): Blob => {
    // Convert the file to a Blob
    return new Blob([file], { type: file.type });
};
  
export const readImageAsDataURL = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        resolve(reader.result); // Returns the data URL (base64 encoded)
      };
  
      reader.onerror = reject;
  
      reader.readAsDataURL(file); // Convert the file to a data URL
    });
};