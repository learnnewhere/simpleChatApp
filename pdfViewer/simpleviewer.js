if (!pdfjsLib.getDocument || !pdfjsViewer.PDFViewer) {
  alert("Library not imported");
}

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';


var DEFAULT_URL = '/pdf/pass.pdf';

var container = document.getElementById('viewerContainer');

// (Optionally) enable hyperlinks within PDF files.
var pdfLinkService = new pdfjsViewer.PDFLinkService();


var pdfViewer = new pdfjsViewer.PDFViewer({
  container: container,
  linkService: pdfLinkService,
});
pdfLinkService.setViewer(pdfViewer);

document.addEventListener('pagesinit', function () {
  // We can use pdfViewer now, e.g. let's change default scale.
  pdfViewer.currentScaleValue = 'auto';
});

// Loading document.
var loadingTask = pdfjsLib.getDocument({
  url: DEFAULT_URL,
});
loadingTask.promise.then(function(pdfDocument) {
  // Document loaded, specifying document for the viewer and
  // the (optional) linkService.
  pdfViewer.setDocument(pdfDocument);

  pdfLinkService.setDocument(pdfDocument, null);
});

loadingTask.onPassword = function (updatePassword, reason) { 
      if (reason === 1) { // need a password
    		var new_password= prompt('Please enter a password:');
    		updatePassword(new_password);
  		} else { // Invalid password
    		var new_password= prompt('Invalid! Please enter a password:');
    		updatePassword(new_password);
  		}
   }; 
