import PDFUploader from '../components/PDFUploader';

function UploadPage() {
  return (
    <div className="upload-page">
      <h1>Convert PDF to LearningApps</h1>
      <p>Upload your textbook PDF to automatically generate interactive exercises</p>
      <PDFUploader />
    </div>
  );
}

export default UploadPage;
