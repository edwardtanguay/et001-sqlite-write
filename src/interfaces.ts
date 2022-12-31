export interface IFlashcard {
	id: number;
	category: string;
	categoryName: string;
	front: string;
	back: string;
}

export interface ICategoryItem {
	categoryIdCode: string;
	categoryName: string;
	total: number;
}