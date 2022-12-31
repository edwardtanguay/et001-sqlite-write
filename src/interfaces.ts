export interface INewFlashcard {
	category: string;
	front: string;
	back: string;
}

export interface IFlashcard extends INewFlashcard {
	id: number;
	categoryName: string;
}

export interface ICategoryItem {
	categoryIdCode: string;
	categoryName: string;
	total: number;
}