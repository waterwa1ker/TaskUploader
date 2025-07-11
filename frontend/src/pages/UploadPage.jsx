import PDFUploader from '../components/PDFUploader';

function UploadPage() {
  return (
    <div className="upload-page">
      <h1>Convert PDF to LearningApps</h1>
      <p style={{fontSize: '1.08rem', color: 'var(--muted)', marginBottom: 18, textAlign: 'center', maxWidth: 340}}>
        Upload your textbook PDF to automatically generate interactive exercises for your students.
      </p>
      <PDFUploader />
    </div>
  );
}

export default UploadPage;
