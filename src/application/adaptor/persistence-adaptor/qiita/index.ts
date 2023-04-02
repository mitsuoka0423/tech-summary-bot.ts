import axios from "axios";

interface GetItemsProps {
	page?: number;
	per_page?: number;
	query?: string;
	sort?: 'like' | 'stock' | 'created' | 'rel';
}

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
			created_at: string;
		},
	];
}

interface QiitaItem {
	title: string;
	url: string;
	body: string;
	likes_count: number;
	stocks_count: number;
	created_at: Date;
}

export const getItems = async ({
	query = "javascript",
	page = 1,
	per_page = 20,
	sort = "created",
}: GetItemsProps): Promise<QiitaItem[]> => {
	const url = `https://qiita.com/api/v2/items?sort=${sort}&query=${query}&page=${page}&per_page=${per_page}`;

	const options = {
		method: "get",
		headers: {
			"Content-Type": "application/json",
		},
	};

	const items = await axios
		.get<QiitaItemResponse, QiitaItemResponse>(url, options)
		.then((response: QiitaItemResponse): QiitaItem[] => {
			return response.data.map((item) => {
				return {
					title: item.title,
					url: item.url,
					body: item.body,
					likes_count: item.likes_count,
					stocks_count: item.stocks_count,
					created_at: new Date(item.created_at),
				};
			});
		});

	return items;
};
