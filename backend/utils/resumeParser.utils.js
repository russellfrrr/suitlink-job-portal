import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export const parseResume = async (file) => {
  if (file.mimetype === 'application/pdf') {
    const data = await pdf(file.buffer);
    return data.text;
  }

  if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({
      buffer: file.buffer
    });

    return result.value;
  }

  throw new Error('Unsupported resume format. PDF or DOCX only.');
}