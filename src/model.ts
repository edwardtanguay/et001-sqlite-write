import Database from 'better-sqlite3';
import { IFlashcard, INewFlashcard } from './interfaces.js';
import * as tools from './tools.js';
import * as model from './model.js';

const dbAbsolutePathAndFileName = tools.absolutifyPathAndFileName('src/data/db.sqlite');
const db = new Database(dbAbsolutePathAndFileName);
db.pragma(`journal_mode = WAL`);

export const getFlashcards = (): IFlashcard[] => {
	const stmt = db.prepare(`
SELECT f.id, f.category, c.name as categoryName, f.front, f.back FROM flashcards AS f
JOIN categories AS c ON f.category = c.idCode
`);
	const flashcards: IFlashcard[] = [];
	for (let row of stmt.iterate()) {
		flashcards.push(row);
	}
	return flashcards;
}

export const getFlashcard = (id: number): IFlashcard => {
	const row = db.prepare('SELECT * FROM flashcards WHERE id = ?').get(id);
	if (row === undefined) {
		return row;
	} else {
		const flashcard: IFlashcard = {
			...row
		};
		return flashcard;
	}
}

export const getFlashcardsWithCategory = (category: string): IFlashcard[] => {
	const rows = db.prepare('SELECT * FROM flashcards WHERE category = ?').all(category);
	const flashcards: IFlashcard[] = [];
	for (let row of rows) {
		flashcards.push(row);
	}
	return flashcards;
}

export const getCategories = () => {
	const stmt = db.prepare(`
SELECT f.category as categoryIdCode, c.name as categoryName, f.total FROM (SELECT category, COUNT(*) AS total FROM flashcards GROUP BY category) as f
INNER JOIN categories AS c ON f.category = c.idCode
ORDER BY c.name	
	`);
	const categories: any[] = [];
	for (let row of stmt.iterate()) {
		categories.push(row);
	}
	return categories;
}

export const addFlashcard = (flashcard: INewFlashcard) => {
	try {
		const stmt = db.prepare(`INSERT INTO flashcards (category, front, back) VALUES (?, ?, ?)`);
		const result = stmt.run(flashcard.category, flashcard.front, flashcard.back);
		return {
			status: "success",
			idOfNewRecord: result.lastInsertRowid
		}
	}
	catch (e) {
		return {
			status: "error",
			message: e.message
		}
	}
}

export const editFlashcard = (id: number, newFlashcard: INewFlashcard) => {
	try {
		const stmt = db.prepare(`UPDATE flashcards SET category = ?, front = ?, back = ? WHERE id = ?`);
		const result = stmt.run(newFlashcard.category, newFlashcard.front, newFlashcard.back, id);
		if (result.changes === 1) {
			return {
				status: "success",
				editedFlashcard: model.getFlashcard(id)
			}
		} else {
			return {
				status: "error",
				message: `database changes = ${result.changes}`
			}
		}
	}
	catch (e) {
		return {
			status: "error",
			message: e.message
		}
	}
}

export const getApiInstructions = () => {
	return `
<style>
	body {
		background-color: #444;
		padding: 1rem;
		color: #fff;
		font-family: courier;
	}
	a {
		background-color: #333;
		color: yellow;
	}
</style>
<h1>Flashcard Site API</h1>
<ul>
	<li><a href="flashcards">/flashcards</a> - all flashcards</li>
	<li><a href="flashcards/2798">/flashcards/2798</a> - flashcard with id 2798</li>
	<li><a href="flashcards/category/git">/flashcards/category/git</a> - all flashcards in category git</li>
	<li><a href="categories">/categories</a> - all categories with totals</li>
</ul>
	`;
}
