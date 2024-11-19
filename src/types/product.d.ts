interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    sale: number;
    rating:number;
    slug:string;
    list_image:string[];
    category?:string;
    detail_selected:Array<{
        color: string;
        size: string;
        price: number;
    }>;
}

export default IProduct