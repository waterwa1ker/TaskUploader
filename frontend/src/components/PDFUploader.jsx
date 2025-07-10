import { useState } from 'react';
import { uploadPDF, convertToApps } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import Alert from './Alert';

function PDFUploader() {
  const [file, setFile] = useState(null);
  const [options, setOptions] = useState({
    generateQuizzes: true,
    generateMatching: true,
    generateFillIn: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOptionChange = (e) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return setError('Please select a PDF file');
    }
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      // 1. Upload PDF
      const uploadResult = await uploadPDF(file);
      
      // 2. Convert to LearningApps
      const conversionResult = await convertToApps(
        uploadResult.fileId, 
        options
      );
      
      setSuccess(`Successfully created ${conversionResult.createdApps} apps on LearningApps.org!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-uploader">
      <h3>Upload PDF Textbook</h3>
      {error && <Alert message={error} type="error" />}
      {success && <Alert message={success} type="success" />}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select PDF File</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        
        <div className="form-group options">
          <h4>Generate Exercises:</h4>
          <label>
            <input
              type="checkbox"
              name="generateQuizzes"
              checked={options.generateQuizzes}
              onChange={handleOptionChange}
            />
            Quizzes
          </label>
          <label>
            <input
              type="checkbox"
              name="generateMatching"
              checked={options.generateMatching}
              onChange={handleOptionChange}
            />
            Matching Exercises
          </label>
          <label>
            <input
              type="checkbox"
              name="generateFillIn"
              checked={options.generateFillIn}
              onChange={handleOptionChange}
            />
            Fill-in-the-Blank
          </label>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner small /> : 'Convert to LearningApps'}
        </button>
      </form>
    </div>
  );
}

export default PDFUploader;
