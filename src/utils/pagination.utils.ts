export default function paginationAPI(page: number, limit: number, data: any) {
    const startInex = (page - 1) * limit;
    const endInex = page * limit;
    const items = data.slice(startInex, endInex);
    return {
        page: page,
        per_page: limit,
        total: items.length,
        total_page: Math.ceil(data.length / limit),
        data: items,
    }
}