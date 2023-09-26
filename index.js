const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const { appConfig } = require('./config')

const isProduction = appConfig.get('/env')==='production'?true:false
const srcDir = isProduction?'./build':'./src'

app.use(cors());
app.use(bodyParser.json())

app.use(/**
 	* Format response with same object
 	* @date 26/09/2023 - 12:42:32
 	*
 	* @param {*} req
 	* @param {*} res
 	* @param {*} next
 	*/
	function (req, res, next) {
		res.sendformat = (data, code = 200) => {
			return res.status(code).json({ code, ...data, status_code:code });
		};
		next();
	}
);

require(`${srcDir}/routes`)().then(route=>{
	app.use('/v1/',route)
});

const server = app.listen( Number(appConfig.get('/port')) || 4000, /**
 	* Listen to Port
 	* @date 26/09/2023 - 12:43:00
 	*/
	function(){
		console.log('🚀App listening on port ' + server.address().port);
	}
);
