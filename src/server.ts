import * as model from './model.js';
import express from 'express';
import cors from 'cors';
import logger from './logger.js';
import * as config from './config.js';
import { INewFlashcard } from './interfaces.js';

const app = express();
app.use(cors());
app.use(logger);
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructions());
});

app.get('/flashcards', (req: express.Request, res: express.Response) => {
	res.json(model.getFlashcards());
});

app.get('/flashcards/:id', (req: express.Request, res: express.Response) => {
	const id = Number(req.params.id);
	if (isNaN(id)) {
		res.status(400).send({
			error: true,
			message: "sent string, should be number"
		});
	} else {
		const flashcard = model.getFlashcard(id);
		if (flashcard === undefined) {
			res.status(404).send({
				error: true,
				message: "id did not correspond to an existing item"
			});
		} else {
			res.json(flashcard);
		}
	}
});

app.get('/flashcards/category/:category', (req: express.Request, res: express.Response) => {
	const category = req.params.category;
	res.json(model.getFlashcardsWithCategory(category));
});

app.get('/categories', (req: express.Request, res: express.Response) => {
	res.json(model.getCategories());
});

app.post('/flashcards', (req: express.Request, res: express.Response) => {
	const flashcard = req.body.flashcard;
	const result = model.addFlashcard(flashcard)
	res.json(result);
});

app.put('/flashcards/:id', (req: express.Request, res: express.Response) => {
	const id = Number(req.params.id);
	const newFlashcard: INewFlashcard = req.body.flashcard;
	if (isNaN(id)) {
		res.status(400).send({
			error: true,
			message: "sent string, should be number"
		});
	} else {
		const result = model.editFlashcard(id, newFlashcard);
		res.json(result);
	}
});

app.listen(config.port, () => {
	console.log(`listening on port http://localhost:${config.port}`);
});