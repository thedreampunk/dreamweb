console.log("yo2");
var moduleName = 'express';
require([moduleName], function(fooModule){
    // do something with fooModule
})
require([moduleName]);
const app = express();
const port = 3000;

// Crée la route qui est censée envoyer le numéro :
app.post('/api/giveNumber', (req, res) => {
  // Simule un délai d'attente pour déclencher l'erreur 408 :
  setTimeout(() => {
	  // configure la réponse à renvoyer :
    res.status(408).json({
      error: "caught by 🐶",
      girlfriend: false,
    });
  }, 1000);
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
}); 