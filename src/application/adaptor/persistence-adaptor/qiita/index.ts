import axios from "axios";

interface QiitaItemResponse {
	data: [
		{
			title: string;
			url: string;
			body: string;
			comments_count: number;
			group: string;
			likes_count: number;
			stocks_count: number;
			tags: [{ [key: string]: string }];
			user: string;
			page_views_count?: number;
		},
	];
}

interface QiitaItem {
	title: string;
	url: string;
	body: string;
}

export const getItems = async ({
	query = "javascript",
	page = 1,
	per_page = 20,
}): Promise<QiitaItem[]> => {
	const url = `https://qiita.com/api/v2/items?query=${query}&page=${page}&per_page=${per_page}`;

	const options = {
		method: "get",
		headers: {
			"Content-Type": "application/json",
		},
	};

	const items = await axios
		.get<QiitaItemResponse, QiitaItemResponse>(url, options)
		.then((response: QiitaItemResponse): QiitaItem[] => response.data);

	return items;
};
