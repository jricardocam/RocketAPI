const express =require ('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.use(require('./routes/usuarios'));

app.listen(app.get('port'), () => {
    console.log('Server is running on port 3000', app.get('port'));
});