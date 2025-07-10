import pdfplumber

class PdfViewer:

    def __init__(self, path):
        self.path = path

    def extract_text(self) -> str:
        with pdfplumber.open(self.path) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text_simple()
        return text

def main():
    pdf_viewer = PdfViewer('test2.pdf')
    print(pdf_viewer.extract_text())

if __name__ == '__main__':
    main()
